import React, { useEffect, useRef, useState } from 'react'
import ExamResultsPage from '../../components/ExamResultsPage'
import { useDispatch, useSelector } from 'react-redux';
import { getSubmited } from '../../redux/actions/submitExam';

const Results = () => {
    const { submitedData } = useSelector((state) => state.examSubmit);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const hasFetchedExams = useRef(false);

    useEffect(() => {
        const fetchExams = async () => {
            setIsLoading(true);
            try {
                await dispatch(getSubmited());
            } catch (error) {
                console.error("Error fetching submitted exams:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!hasFetchedExams.current) {
            fetchExams();
            hasFetchedExams.current = true;
        }
    }, [dispatch]);

    return (
        <div>
            <ExamResultsPage
                isLoading={isLoading}
                recentSubmissions={submitedData}
            />

        </div>
    )
}

export default Results