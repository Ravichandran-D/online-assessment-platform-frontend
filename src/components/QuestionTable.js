import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const QuestionTable = ({ questions, isLoading, onEdit, onDelete }) => {    
    return (
        <div className="container mx-auto p-2">
            {isLoading ? (
                <div className="text-center">
                    <FaSpinner className="animate-spin text-gray-500" size={24} /> {/* Spinner icon */}
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : (
                <>
                    {/* Make the table scrollable on small screens */}
                    <div className="overflow-x-auto mb-16 shadow-lg">
                        <table className="min-w-full table-auto border-collapse bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-blue-500 text-white text-sm">
                                    <th className="px-4 py-2 truncate border">Sl No</th>
                                    <th className="px-4 py-2 truncate border">Question</th>
                                    <th className="px-4 py-2 border">Answer</th>
                                    <th className="px-4 py-2 truncate border">Type</th>
                                    <th className="px-4 py-2 truncate border">Difficulty</th>
                                    <th className="px-4 py-2 truncate border">Exam</th>
                                    <th className="px-4 py-2 truncate border">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="relative ">
                                {questions && questions.length > 0 ? (
                                    questions.map((question, index) => (
                                        <tr key={question._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border truncate text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border truncate text-left">{question.question}</td>
                                            <td className="px-4 py-2 border text-left truncate">{question.correctAnswer || "--"}</td>
                                            <td className="px-4 py-2 border text-center">{question.questionType}</td>
                                            <td className="px-4 py-2 border text-center">{question.difficulty}</td>
                                            <td className="px-4 py-2 border text-center">{question.exam}</td>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    onClick={() => onEdit(question)}
                                                    className="text-blue-500 hover:text-blue-700 mr-3"
                                                    aria-label="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(question._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    aria-label="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
                                            No questions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuestionTable;
