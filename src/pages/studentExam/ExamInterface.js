import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../redux/actions/examActions';
import GoBackButton from '../../components/GoBackButton';
import { submitExam } from '../../redux/actions/submitExam';
import { createProctor, createStudentsActivity } from '../../redux/actions/studentActions';

const ExamInterface = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasFetchedExams = useRef(false);

    const { id } = useParams(); 
    const { examDetails } = useSelector(state => state.exams);
    const { examData, questions } = examDetails || {};
    const { user } = useSelector((state) => state.auth);

    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const webcamRef = useRef(null);
    const [warningCount, setWarningCount] = useState(0);
    const [examStatus, setExamStatus] = useState('started'); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Move safeExitFullscreen to the top ---
    const safeExitFullscreen = useCallback(async () => {
        try {
            const isFullscreen = !!(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            );
            if (!isFullscreen) return;

            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
            console.log("Exited fullscreen mode successfully.");
        } catch (err) {
            console.error('Error exiting fullscreen mode:', err);
        }
    }, []);

    const initializeExam = useCallback(async () => {
        try {
            if (!examData) return;
            let duration = examData.duration;
            setTimeLeft(duration * 60);

            await Promise.all([
                navigator.mediaDevices.getUserMedia({ video: true }),
                document.documentElement.requestFullscreen()
            ]);

        } catch (error) {
            console.error('Failed to initialize exam:', error);
        }
    }, [examData]);

    const fetchExams = useCallback(async () => {
        try {
            setLoading(true);
            await dispatch(getExamById(id));
            await initializeExam();
        } catch (error) {
            setError(error);
            console.error('Failed to fetch exams:', error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, id, initializeExam]);

    useEffect(() => {
        const fetchData = async () => {
            if (!hasFetchedExams.current) {
                await fetchExams();
                hasFetchedExams.current = true;
            }
        };
        fetchData();
    }, [fetchExams]);

    const submitExams = useCallback(async () => {
        try {
            const submitData = { examId: id, answers, warningCount };
            await dispatch(submitExam(submitData));

            const activityData = {
                acivityType: "submitted exam",
                examId: id,
                exam: examData?.name,
                name: user?.name,
                email: user?.email,
                userId: user?.id
            };
            await dispatch(createStudentsActivity(activityData));
            setExamStatus('submitted');

            await safeExitFullscreen();
        } catch (error) {
            console.error('Failed to submit exam:', error);
        }
    }, [warningCount, id, examData, user, answers, dispatch, safeExitFullscreen]);

    const existFullscreen = useCallback(() => {
        (async () => {
            await safeExitFullscreen();
            navigate(-1);
        })();
    }, [navigate, safeExitFullscreen]);

    // Timer countdown
    useEffect(() => {
        if (examStatus === 'started' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            submitExams();
        }
    }, [timeLeft, examStatus, submitExams]);

    const handleSuspiciousActivity = useCallback(async (type) => {
        try {
            const proctorData = {
                type,
                timestamp: new Date(),
                examId: id,
                exam: examData?.name,
                name: user?.name,
                email: user?.email,
                userId: user?.id
            };
            await dispatch(createProctor(proctorData));
            toast.success(type);

            setWarningCount(prevWarningCount => {
                const newWarningCount = prevWarningCount + 1;
                if (newWarningCount >= 3) submitExams();
                return newWarningCount;
            });
        } catch (error) {
            console.error('Failed to report suspicious activity:', error);
        }
    }, [id, examData, user, dispatch, submitExams]);

    // Monitor fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && examStatus === 'started') {
                handleSuspiciousActivity("Left fullscreen mode");
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [examStatus, handleSuspiciousActivity]);

    const sendActivityData = useCallback(async (screenshot) => {
        try {
            const proctorData = {
                type: 'suspicious',
                screenshot,
                timestamp: new Date(),
                tabFocused: document.hasFocus(),
                examId: id,
                exam: examData?.name,
                name: user?.name,
                email: user?.email,
                userId: user?.id
            };
            await dispatch(createProctor(proctorData));
        } catch (error) {
            console.error('Failed to send activity data:', error);
        }
    }, [id, dispatch, examData, user]);

    useEffect(() => {
        if (examStatus === 'started') {
            const monitoring = setInterval(async () => {
                const fullWindowScreenshot = await html2canvas(document.body)
                    .then(canvas => canvas.toDataURL("image/png"))
                    .catch(err => console.error("Error capturing screenshot:", err));

                if (fullWindowScreenshot) sendActivityData(fullWindowScreenshot);
            }, 30000);
            return () => clearInterval(monitoring);
        }
    }, [examStatus, sendActivityData]);

    const handleAnswerChange = (questionId, answer, questionType) => {
        setAnswers(prev => {
            const updatedAnswers = { ...prev, [questionId]: answer };
            for (let key in prev) {
                if (key !== questionId && (questionType === 'multiple-choice' || questionType === 'true-false')) {
                    const otherQuestion = questions.find(q => q._id === key);
                    if (otherQuestion?.questionType && otherQuestion.questionType !== questionType) {
                        updatedAnswers[key] = '';
                    }
                }
            }
            return updatedAnswers;
        });
    };

    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">{error}</p>
                <GoBackButton onClick={existFullscreen} />
            </div>
        );
    }

    if (loading || !examData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading exam...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {examStatus === 'started' && (
                <div className="flex flex-col items-center">
                    <div className="fixed top-4 right-4 bg-white p-4 rounded shadow">
                        <div className="text-xl font-bold">
                            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="text-sm text-red-600">Warnings: {warningCount}/3</div>
                    </div>

                    <div className="fixed top-4 left-4 w-48 opacity-0 pointer-events-none">
                        <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" className="w-full rounded" />
                    </div>

                    <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded shadow">
                        <h1 className="text-2xl font-bold mb-6">{examData.name}</h1>
                        {questions.map((question, index) => (
                            <div key={question.id} className="mb-8">
                                <p className="font-semibold mb-4">{index + 1}. {question.question}</p>
                                {question.questionType === "multiple-choice" ? (
                                    <div className="space-y-2">
                                        {question.options.map((option, optIndex) => (
                                            <label key={optIndex} className="flex items-center space-x-2">
                                                <input type="radio" name={`question-${question.id}`} value={option} onChange={(e) => handleAnswerChange(question.id, e.target.value, "multiple-choice")} checked={answers[question.id] === option} className="form-radio" />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                        <hr />
                                    </div>
                                ) : question.questionType === "true-false" ? (
                                    <div className="space-y-2">
                                        {['True', 'False'].map((option) => (
                                            <label key={option} className="flex items-center space-x-2">
                                                <input type="radio" name={`question-${question.id}`} value={option} onChange={(e) => handleAnswerChange(question.id, e.target.value, "true-false")} checked={answers[question.id] === option} className="form-radio" />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                        <hr />
                                    </div>
                                ) : (
                                    <textarea className="w-full p-2 border rounded" rows={4} value={answers[question.id] || ''} onChange={(e) => handleAnswerChange(question.id, e.target.value)} placeholder="Enter your answer here..." />
                                )}
                            </div>
                        ))}
                        <button onClick={submitExams} className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 mb-8">Submit Exam</button>
                    </div>
                </div>
            )}

            {examStatus === 'submitted' && (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-4">Exam Submitted Successfully</h2>
                        <p>Thank you for completing the exam.</p>
                    </div>
                    <GoBackButton path={"/student/dashboard/exams"} />
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ExamInterface;
