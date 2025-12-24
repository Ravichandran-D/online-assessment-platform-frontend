import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubmited } from "../../redux/actions/submitExam";

const StudentDashboardPage = () => {
    const { submitedData } = useSelector((state) => state.examSubmit);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const hasFetchedExams = useRef(false);

    const fetchExams = useCallback(async () => {
        try {
            setIsLoading(true);
            dispatch(getSubmited())
        } catch (error) {
            console.error("Error fetching submitted exams:", error);
        } finally {
            setIsLoading(false)
        };
    }, [dispatch]);


    useEffect(() => {
        const loadExams = () => {
            const cachedData = localStorage.getItem('submitedData');
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                dispatch({
                    type: 'GET_SUBMIT_SUCCESS',
                    payload: parsedData,
                });
                setIsLoading(false);
            } else {
                fetchExams();
            }
        };

        if (!hasFetchedExams.current) {
            loadExams();
            hasFetchedExams.current = true;
        }
    }, [dispatch, fetchExams]); // Removed loadExams from dependencies

    useEffect(() => {
        if (submitedData?.length) {
            localStorage.setItem('submitedData', JSON.stringify(submitedData));
        }
    }, [submitedData]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin h-12 w-12 text-gray-500" />
            </div>
        );
    }
    const sortedSubmissions = submitedData?.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    const recentSubmission = sortedSubmissions?.[0];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-blue-500">Student Dashboard</h1>
                </div>
            </header>
            <main className="pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="exams" className="bg-blue-500 text-white rounded-lg p-2 text-center hover:bg-blue-600">View all Exams</Link>
                        <Link to="profile" className="bg-green-500 text-white rounded-lg p-2 text-center hover:bg-green-600">Profile</Link>
                        <Link to="results" className="bg-purple-500 text-white rounded-lg p-2 text-center hover:bg-purple-600">View Results</Link>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Performance</h2>
                    <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Latest Exam Results</h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Exam</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {recentSubmission?.examId?.name || "No submission found"}
                                    </dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Score</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {recentSubmission ? (
                                            <>
                                                {((recentSubmission.totalMarks / recentSubmission.totalQuestions) * 100).toFixed(2)}%
                                                <span className="ml-2 text-gray-500">({recentSubmission.totalMarks} out of {recentSubmission.totalQuestions})</span>
                                            </>
                                        ) : (
                                            <span className="text-gray-500">No submission found</span>
                                        )}
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                        {recentSubmission ? (
                                            (() => {
                                                const percentage = (recentSubmission.totalMarks / recentSubmission.totalQuestions) * 100;
                                                const statusText = percentage >= 50 ? 'Passed' : 'Failed';
                                                const statusBgClass = percentage >= 50 ? 'bg-green-500 text-black' : 'bg-red-500 text-white';

                                                return (
                                                    <span className={`inline-block px-2 py-1 rounded ${statusBgClass}`}>
                                                        {statusText}
                                                    </span>
                                                );
                                            })()
                                        ) : (
                                            <span className="text-gray-500">No submission found</span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboardPage;
