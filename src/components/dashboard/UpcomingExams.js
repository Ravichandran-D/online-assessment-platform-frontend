import React from 'react';
import { formatDateToInput } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

const UpcomingExams = ({ exams }) => {
    const navigate = useNavigate();

    // Handle view exam
    const handleView = async (id) => {
        await navigate(`/admin/dashboard/exams/${id}`);
    };

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    // Filter exams to show only today's and future exams
    const upcomingExams = exams.filter(exam => {
        const examDate = new Date(exam.date);
        return examDate >= today; // Include exams today or in the future
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-64 scrollbar-hide">
            <h2 className="text-lg font-semibold mb-4">Upcoming Exams</h2>
            <div className="space-y-4">
                {upcomingExams.length > 0 ? (
                    upcomingExams.map((exam) => {

                        return (
                            <div key={exam._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium">{exam.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {formatDateToInput(exam.date)} (end by same day.)  
                                    </p>
                                </div>
                                <button
                                    className={`w-32 px-4 py-2 text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700`}
                                    onClick={() => handleView(exam._id)}
                                >
                                    View Details
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No upcoming exams found.</p>
                )}
            </div>
        </div>
    );
};

export default UpcomingExams;
