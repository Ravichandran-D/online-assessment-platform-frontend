import React from "react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="exams"
          className="bg-blue-500 text-white rounded-lg p-2 text-center hover:bg-blue-600"
        >
          Create New Exam
        </Link>
        <Link
          to="questions"
          className="bg-green-500 text-white rounded-lg p-2 text-center hover:bg-green-600"
        >
          Manage Question Banks
        </Link>
        <Link
          to="students"
          className="bg-purple-500 text-white rounded-lg p-2 text-center hover:bg-purple-600"
        >
          View Results
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
