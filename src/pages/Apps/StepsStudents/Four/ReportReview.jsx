import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ReportTable from './ReportTable';
import reportReviewService from '../../../../api/reportReviewService';
import { useUserContext } from "../../../../store/userContext";

const ReportReview = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = useCallback(async () => {
        try {
            setLoading(true);
            const project = await reportReviewService.getReportByStudentCode(user.username);
            setReport(project);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);

    useEffect(() => {
        dispatch(setPageTitle('Filtro de similitud II'));

        if (user.username) {
            fetchReports();
        }
    }, [dispatch, user.username, fetchReports]);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 4 - Filtro de similitud II</h1>
            <ReportTable approval={report} />
        </>
    );
};

export default ReportReview;
