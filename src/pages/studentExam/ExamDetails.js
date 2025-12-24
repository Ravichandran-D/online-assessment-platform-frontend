import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProctoringInfo from './ProctoringInfo'; // Import the ProctoringInfo component
import GoBackButton from '../../components/GoBackButton';
import { FaSpinner } from 'react-icons/fa';
import { getExamById } from '../../redux/actions/examActions';
import { createStudentsActivity } from '../../redux/actions/studentActions';

//exam deatils
const ExamDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { examDetails } = useSelector(state => state.exams);
    const { user } = useSelector((state) => state.auth);

    const { id } = useParams();  // Get the exam ID from the URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the exam by ID when the component mounts
        const fetchExam = async () => {
            try {
                setLoading(true);  // Set loading true when fetching starts
                await dispatch(getExamById(id));
            } catch (err) {
                setError('Failed to load exam details.'); // Set error message
            } finally {
                setLoading(false);  // Set loading to false once fetch is complete
            }
        };

        fetchExam();
    }, [dispatch, id]);

    // Handle view exam
    const handleView = async (id) => {
        let activityData = {
            acivityType: "started exam",
            examId: id,
            exam: examDetails?.examData.name,
            name: user.name,
            email: user.email,
            userId: user.id
        }
        await dispatch(createStudentsActivity(activityData));
        navigate(`/student/dashboard/start-assessment/${id}`);
    };

    // Show loading spinner if still fetching the data
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FaSpinner className="animate-spin text-gray-500" size={24} />
                <p className="text-gray-500 ml-2">Loading...</p>
            </div>
        );
    }

    // Show error message if there was a problem fetching the data
    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">{error}</p>
                <GoBackButton />
            </div>
        );
    }

    // If no examDetails are found after fetching
    if (!examDetails) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">Exam Not Found</h1>
                <p>The requested exam does not exist or has been removed.</p>
                <GoBackButton />
            </div>
        );
    }

    return (
        <div className="p-6 pb-16 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">{examDetails?.examData?.name} Assessment</h1>
            <p className="text-lg text-gray-700 mb-6">{examDetails?.examData?.description}</p>
            <hr />
            <h2 className="text-xl mt-2 font-semibold text-gray-900 mb-4">Assessment Details</h2>
            <ul className="mb-6 text-gray-700">
                <li>
                    <strong>Marks:</strong> {examDetails?.examData?.totalMarks + " marks."}
                </li>
                <li>
                    <strong>Questions:</strong> {examDetails?.examData?.totalQuestions + " Nos."}
                </li>
                <li>
                    <strong>Duration:</strong> {examDetails?.examData?.duration} minutes.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
            <p className="text-gray-600 mb-6">
                Before you start the assessment, please read and agree to the following terms and conditions:
                <ul className="list-disc list-inside mt-4">
                    <li>No unauthorized assistance or materials are allowed.</li>
                    <li>All answers must be your own work.</li>
                    <li>Once started, the assessment must be completed within the allotted time.</li>
                </ul>
            </p>

            {/* Integrate Proctoring Info */}
            <ProctoringInfo />

            <div className="flex flex-wrap justify-around mt-6 text-center sm:gap-5">
                <GoBackButton />
                <button
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
                    onClick={() => handleView(id)}
                >
                    Agree and Start Assessment
                </button>
            </div>

        </div>
    );
};

export default ExamDetails;
