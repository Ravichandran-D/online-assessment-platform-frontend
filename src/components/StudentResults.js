import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStudentResult } from '../redux/actions/resultActions';
import { FaSpinner } from "react-icons/fa";
import GoBackButton from './GoBackButton';

const StudentResult = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const { results, error } = useSelector(state => state.studentResult);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudentResults = async () => {
      setLoading(true); // Set loading state before fetching
      await dispatch(getStudentResult(id)).finally(() => setLoading(false)); // Fetch the student result
    };

    fetchStudentResults();
  }, [dispatch, id]);

  // Show loading spinner if still fetching the data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-gray-500" size={24} />
        <p className="text-gray-500 ml-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex justify-center items-center py-12">
          {/* Check if the error has an 'error' field and display it */}
          <p className="text-red-600">{error.error || "No results found for this user."}</p>
        </div>
        <div> <GoBackButton /></div>
      </>
    );
  }

  if (!results) {
    return <p>No student results found.</p>;
  }

  return (
    <div className="container mx-auto p-6 mb-16">
      <h1 className="text-3xl font-bold mb-4 text-center">Results for {results?.user?.name}</h1>

      <div className="mb-6 p-4 border rounded-lg bg-gray-100 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Student Profile</h2>
        <p className="text-sm"><strong>Email:</strong> {results?.user?.email}</p>
        <p className="text-sm"><strong>Name:</strong> {results?.user?.name}</p>
        <p className="text-sm"><strong>Gender:</strong> {results?.user?.profile?.gender ? results?.user?.profile?.gender : "-"}</p>
        <p className="text-sm"><strong>Date of Birth:</strong> {results?.user?.profile?.dob ? new Date(results?.user?.profile?.dob).toLocaleDateString() : "-"}</p>
        <p className="text-sm"><strong>Address:</strong> {results?.user?.profile?.address ? results?.user?.profile?.address : "-"}</p>
      </div>

      <hr className="my-4" />

      {results?.results?.length === 0 ? (
        <p className="text-center text-lg text-red-600">No exam results found.</p>
      ) : (
        results?.results?.map((result) => (
          <div key={result._id} className="mb-6 border p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-medium mb-2">Exam: {result.exam?.name || 'Unknown Exam'}</h2>

            {/* Responsive grid for mobile, tablet, and desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><strong>Exam ID:</strong> {result.examId}</p>
              <p><strong>Submitted At:</strong> {new Date(result.submittedAt).toLocaleString()}</p>
              <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
              <p><strong>Correct Answers:</strong> {result.correctAnswers}</p>
              <p><strong>Percentage:</strong> {result.totalQuestions ? (((result.correctAnswers / result.totalQuestions) * 100).toFixed(2) + '%') : 'N/A'}</p>
              <p><strong>Grade:</strong> {result.grade}</p>
              <p><strong>Warning Count:</strong> {result.warningCount}</p>
              <p
                className={`p-2 text-white rounded-lg w-36 ${((result.correctAnswers / result.totalQuestions) * 100) >= 35 ? 'bg-green-500' : 'bg-red-500'}`}
              >
                <strong>Status:</strong> {((result.correctAnswers / result.totalQuestions) * 100) >= 35 ? 'Passed' : 'Failed'}
              </p>
            </div>
          </div>

        ))
      )}
      <GoBackButton />
    </div>

  );
};

export default StudentResult;
