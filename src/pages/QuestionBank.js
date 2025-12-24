import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../redux/actions/questionActions';
import { getExams } from '../redux/actions/examActions';
import QuestionTable from '../components/QuestionTable';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionBank = () => {
    const dispatch = useDispatch();
    const hasFetchedExams = useRef(false);

    const { questions } = useSelector(state => state.question);
    const { exams } = useSelector(state => state.exams);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],  // For multiple choice
        correctAnswer: '',  // For True/False
        difficulty: '',
        exam: '',
        questionType: '',
        examId: ""  // To determine the type of question
    });
    const [editing, setEditing] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [filteredQuestions, setFilteredQuestions] = useState(questions);

    //fetch exams and questions
    const fetchExams = useCallback(async () => {
        try {
            setIsLoading(true);
            dispatch(getExams());
            dispatch(getQuestions()).finally(() => setIsLoading(false));
        } catch (error) {
            console.error('Failed to fetch exams:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (!hasFetchedExams.current) {
            fetchExams();
            dispatch(getQuestions());  // Fetch questions only on initial mount
            hasFetchedExams.current = true; // Mark as fetched
        }
    }, [dispatch, fetchExams]);

    //initail questions
    useEffect(() => {
        setFilteredQuestions(questions); // Update filteredQuestions when questions change
    }, [questions]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        // Get the selected option and its ID, but only if the event is from the exam dropdown
        let id;
        if (e.target.tagName === 'SELECT') {
            const selectedOption = await e.target.options[e.target.selectedIndex];
            id = selectedOption?.id;  // Get the id of the selected option
        }

        // Handle fields that are part of the 'options' array
        if (name.startsWith('option')) {
            const index = Number(name.split('_')[1]);  // Extract the index from the name
            setFormData(prev => {
                const newOptions = [...prev.options];  // Copy the previous options array
                newOptions[index] = value;  // Update the specific option at the given index
                return { ...prev, options: newOptions };  // Return the updated form data
            });
        } else {
            // Update the `examId` only if an exam was selected; otherwise, don't modify it
            setFormData(prev => ({
                ...prev,
                [name]: value,
                ...(id && { examId: id })  // Conditionally include `examId` if an ID is available
            }));
        }
    };

    //handle question type
    const handleQuestionTypeChange = (e) => {
        setFormData(prev => ({
            ...prev,
            questionType: e.target.value,
            // Reset relevant fields based on question type
            options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : ['', ''],  // Reset options for multiple choice
            correctAnswer: ''  // Reset correct answer for True/False
        }));
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (editing) {
            dispatch(updateQuestion(editing, formData));
            dispatch(getQuestions());
            setEditing(null);
        } else {
            await dispatch(createQuestion(formData)).then(async () => {
                await dispatch(getQuestions());
            });
        }
        setFormData({ question: '', options: ['', '', '', ''], correctAnswer: '', difficulty: '', exam: '', questionType: '', examId: "" });
        setIsLoading(false);
    };

    //handle search
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        filterQuestions(e.target.value, questionType, difficultyLevel, examType);
    };
    //handle type change
    const handleTypeChange = (e) => {
        setQuestionType(e.target.value);
        filterQuestions(searchQuery, e.target.value, difficultyLevel, examType);
    };
    //hanlde difficulty 
    const handleDifficultyChange = (e) => {
        setDifficultyLevel(e.target.value);
        filterQuestions(searchQuery, questionType, e.target.value, examType);
    };
    //handle exam
    const handleExamChange = (e) => {
        setExamType(e.target.value);
        filterQuestions(searchQuery, questionType, difficultyLevel, e.target.value);
    };

    // Handle for edit the question
    const handleEdit = (question) => {
        setEditing(question._id);
        setFormData(question);
    };

    // Handle for delete
    const handleDelete = (id) => {
        setIsLoading(true);
        dispatch(deleteQuestion(id));
        dispatch(getQuestions());
        setIsLoading(false);
    };

    // Filter exams based on the search query
    const filterQuestions = (search, type, difficulty, exam) => {
        const filtered = questions.filter((question) => {
            const matchesSearch = question.question.toLowerCase().includes(search.toLowerCase());
            const matchesType = type ? question.questionType === type : true;
            const matchesDifficulty = difficulty ? question.difficulty === difficulty : true;
            const matchesExam = exam ? question.exam === exam : true;

            return matchesSearch && matchesType && matchesDifficulty && matchesExam;
        });
        setFilteredQuestions(filtered);
    };

    return (
        <div className="p-6 ">
            <ToastContainer />
            <h1 className="mb-4 text-center text-xl text-blue-500 font-bold">Question Bank</h1>
            <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col items-center" // Flex container with center alignment
            >
                <input
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Question"
                    required
                    className="border p-2 mb-4 w-3/4 md:w-1/2 lg:w-1/2 border-blue-500 rounded"
                />

                <div className="mb-4 w-3/4 sm: w-3/4 md:w-1/2"> {/* Set the width to match the input */}
                    <label htmlFor="difficulty-select" className="block text-gray-700">
                        Type:
                    </label>
                    <select
                        id="questionType"
                        name="questionType"
                        onChange={handleQuestionTypeChange}
                        value={formData.questionType}
                        className="mt-1 block w-full p-1 bg-white border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Question Type</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                    </select>
                </div>

                {formData.questionType === 'multiple-choice' && (
                    <>
                        <div className="flex flex-wrap mb-4 w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2">
                            {formData.options.map((option, index) => (
                                <input
                                    key={index}
                                    name={`option_${index}`}
                                    value={option}
                                    onChange={handleChange}
                                    placeholder={`Option ${index + 1}`}
                                    required
                                    className="border p-2 mb-2 w-full border-blue-500 rounded"
                                />
                            ))}
                        </div>

                        <input
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleChange}
                            placeholder="Correct Option (index or value)"
                            required
                            className="border p-2 mb-4 w-1/2 border-blue-500 rounded"
                        />
                    </>
                )}

                {formData.questionType === 'true-false' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Correct Answer:</label>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value="true"
                                checked={formData.correctAnswer === 'true'}
                                onChange={handleChange}
                            />
                            True
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="correctAnswer"
                                value="false"
                                checked={formData.correctAnswer === 'false'}
                                onChange={handleChange}
                            />
                            False
                        </label>
                    </div>
                )}

                <div className="mb-4 w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2"> {/* Set the width to match the input */}
                    <label htmlFor="difficulty-select" className="block text-gray-700">
                        Level:
                    </label>
                    <select
                        id="difficulty-select"
                        name="difficulty"
                        onChange={handleChange}
                        value={formData.difficulty}
                        className="mt-1 block w-full p-2 bg-white border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Difficulty Level</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="mb-4 w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2"> {/* Set the width to match the input */}
                    <label htmlFor="exam-select" className="block text-gray-700">
                        Exam:
                    </label>
                    <select
                        id="exam-select"
                        name="exam"
                        onChange={handleChange}
                        value={formData.exam}
                        className="mt-1 block w-full p-2 bg-white border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select an Exam</option>
                        {exams && exams.map((exam) => (
                            <option key={exam._id} value={exam.name} id={exam._id}>
                                {exam.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 rounded text-white p-2 w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/2">
                    {editing ? 'Update' : 'Add'} Question
                </button>
            </form>
            <hr />
            <div className="flex flex-col md:flex-row items-center justify-between w-full p-2">
                {/* Questions heading */}
                <div className="ml-4 flex-grow">
                    <h2 className="text-xl font-bold mb-4 md:mb-0">Questions :</h2>
                </div>

                {/* filters */}
                <div className="flex flex-col md:flex-row items-center justify-end w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
                    {/* Question Type Dropdown */}
                    <select
                        value={questionType}
                        onChange={handleTypeChange}
                        className="border p-1 rounded border-blue-500 w-3/4"
                    >
                        <option value="">All Types</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                    </select>

                    {/* Difficulty Level Dropdown */}
                    <select
                        value={difficultyLevel}
                        onChange={handleDifficultyChange}
                        className="border p-1 rounded border-blue-500 w-3/4"
                    >
                        <option value="">All Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    {/* Exam Type Dropdown */}
                    <select
                        value={examType}
                        onChange={handleExamChange}
                        className="border p-1 rounded border-blue-500 w-3/4"
                    >
                        <option value="">All Exams</option>
                        {exams && exams.map((exam) => (
                            <option key={exam._id} value={exam.name} id={exam._id}>
                                {exam.name}
                            </option>
                        ))}
                    </select>

                    {/* Search Section */}
                    <div className="flex flex-col justify-center w-3/4 md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search questions by name..."
                            value={searchQuery}
                            onChange={handleSearchChange} // Use the appropriate search handler function
                            className="border p-1 rounded border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* question */}
            <QuestionTable
                questions={filteredQuestions}
                isLoading={isLoading}
                onEdit={(e) => handleEdit(e)}
                onDelete={(e) => handleDelete(e)}
            />
        </div>
    );
};

export default QuestionBank;
