import React from 'react';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaSpinner } from 'react-icons/fa';

// Register the components needed for both Doughnut and Bar charts
ChartJS.register(
    ArcElement,    // For Doughnut chart
    BarElement,    // For Bar chart
    CategoryScale, // For Bar chart (x-axis)
    LinearScale,   // For Bar chart (y-axis)
    Tooltip,       // For displaying tooltips
    Legend         // For displaying legends
);

const ExamResultsPage = ({ recentSubmissions, isLoading }) => {

    // Loading spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin h-12 w-12 text-gray-500" />
            </div>
        );
    }

    // No submissions found
    if (!recentSubmissions.length) {
        return <div>No submissions found.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {recentSubmissions.map((submission, index) => {
                const questions = submission.questions || [];
                const totalMarks = submission.correctAnswers || 0;
                const totalQuestions = submission.totalQuestions;

                // Count correct and incorrect answers
                const correctAnswersCount = questions.filter(q => q.isCorrect).length;
                const incorrectAnswersCount = totalQuestions - correctAnswersCount;

                const scorePercentage = totalQuestions > 0 ? ((totalMarks / totalQuestions) * 100).toFixed(2) : 0;

                // Data for Doughnut Chart
                const doughnutData = {
                    labels: ['Correct', 'Incorrect'],
                    datasets: [{
                        data: [correctAnswersCount, incorrectAnswersCount],
                        backgroundColor: ['#4CAF50', '#d8234aff'],
                        hoverBackgroundColor: ['#45A049', '#d8234aff'],
                    }]
                };

                const doughnutOptions = {
                    maintainAspectRatio: false, // Makes the chart resize properly
                };

                // Data for Bar Chart (Detailed Results)
                const barData = {
                    labels: questions.map((q, i) => `Q${i + 1}`),
                    datasets: [{
                        label: 'Your Answers',
                        data: questions.map(q => (q.isCorrect ? 1 : 0)),
                        backgroundColor: '#4CAF50',
                    }, {
                        label: 'Correct Answers',
                        data: questions.map(q => (q.isCorrect ? 0 : 1)),
                        backgroundColor: '#d8234aff',
                    }]
                };

                const barOptions = {
                    scales: {
                        x: { beginAtZero: true },
                        y: { beginAtZero: true }
                    }
                };

                return (
                    <div key={submission._id} className="mb-10">
                        {/* Header Section */}
                        <header className="bg-gray-800 text-white p-4">
                            <h1 className="text-2xl">Exam Results: {submission.examId?.name}</h1>
                            <p className="text-sm">Submitted on: {new Date(submission.submittedAt).toLocaleString()}</p>
                        </header>

                        {/* Overall Score Section */}
                        <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg mt-4">
                            <div>
                                <h2 className="text-lg font-medium">Overall Score</h2>
                                <p className="text-3xl font-bold">{scorePercentage}%</p>
                                <p className="text-sm">
                                    Grade: {scorePercentage >= 90 ? 'A' : scorePercentage >= 75 ? 'B' : scorePercentage >= 50 ? 'C' : scorePercentage >= 36 ? 'D' : 'Fail'}
                                </p>
                            </div>
                            <div className="w-48 h-48 flex items-center justify-center">
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>

                        {/* Detailed Results Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-medium">Detailed Results</h3>
                            <div className="w-full h-80 flex justify-center "> {/* Adjusted size */}
                                <Bar data={barData} options={barOptions} width={200} height={100} />
                            </div>
                            {/* <Bar data={barData} options={barOptions} width={5} height={5} /> */}
                            <table className="mt-4 w-full border shadow-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Sl No</th>
                                        <th className="p-2 border">Question</th>
                                        <th className="p-2 border">Your Answer</th>
                                        <th className="p-2 border">Correct Answer</th>
                                        <th className="p-2 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map((question, idx) => (
                                        <tr key={idx}>
                                            <td className="p-2 border">{idx + 1}</td>
                                            <td className="p-2 border">{question.question}</td>
                                            <td className="p-2 border">{question.userAnswer}</td>
                                            <td className="p-2 border">{question.correctAnswer}</td>
                                            <td className={`p-2 border ${question.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                                {question.isCorrect ? 'Correct' : 'Incorrect'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary and Recommendations Section */}
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium">Summary</h3>
                            <p>Your performance indicates a strong understanding of the material. However, consider reviewing topics that you found challenging.</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExamResultsPage;
