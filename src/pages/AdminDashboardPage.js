import React, { useCallback, useEffect, useRef } from 'react';
// Import icons 
import { FaUsers as Users, FaBookOpen as BookOpen, FaChartBar as BarChart, FaCalendar as Calendar } from 'react-icons/fa';
// Import components
import StatsCard from '../components/dashboard/StatsCard';
import UpcomingExams from '../components/dashboard/UpcomingExams';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useDispatch, useSelector } from 'react-redux';
import { getExams } from '../redux/actions/examActions';
import { getAllStudents, getStudentsActivity } from '../redux/actions/studentActions';
import QuickActions from '../components/dashboard/QuickActions';

const AdminDashboardPage = () => {
  const { exams } = useSelector(state => state.exams);
  const { students, activity } = useSelector(state => state.studentState);

  const dispatch = useDispatch();
  const hasFetchedExams = useRef(false);

  const fetchExams = useCallback(async () => {
    try {
      await dispatch(getExams());
      await dispatch(getAllStudents());
      await dispatch(getStudentsActivity());
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetchedExams.current) {
      fetchExams(); // Fetch exams only on initial mount
      hasFetchedExams.current = true; // Mark as fetched
    }
  }, [dispatch, fetchExams]); // Dependency array includes dispatch


  // Filter active exams (exams with a date today)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  // Filter upcoming exams (exams with a date in the future)
  const upcomingExams = exams ? exams.filter(exam => new Date(exam.date) >= today) : [];

  const activeExams = exams ? exams.filter(exam => {
    const examDate = new Date(exam.date);
    examDate.setHours(0, 0, 0, 0); // Set exam date to midnight
    return examDate.getTime() === today.getTime(); // Compare only date parts
  }) : [];

  // Calculate Completion Rate
  const completedExams = exams ? exams.filter(exam => new Date(exam.date) < new Date()).length : 0;
  const totalExams = exams ? exams.length : 0;
  const completionRate = totalExams > 0 ? ((completedExams / totalExams) * 100).toFixed(0) + '%' : '0%';

  const stats = [
    { title: 'Total Students', value: students ? students.length : 0, icon: Users, bgColor: "bg-blue-500/[0.6]" },
    { title: 'Active Exams', value: activeExams.length, icon: BookOpen, bgColor: "bg-red-500/[0.6]" },
    { title: 'Completion Rate', value: completionRate, icon: BarChart, bgColor: "bg-lime-500/[0.6]" },
    { title: 'Upcoming Exams', value: upcomingExams.length, icon: Calendar, bgColor: "bg-cyan-500/[0.6]" }
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 pb-16">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div>
        <QuickActions />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Exams */}
        <UpcomingExams exams={upcomingExams} />

        {/* Recent Activity */}
        <RecentActivity activities={activity?.activities} />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
