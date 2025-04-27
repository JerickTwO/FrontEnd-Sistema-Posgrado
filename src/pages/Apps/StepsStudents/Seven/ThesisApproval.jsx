import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TApprovalTable from './TApprovalTable';
import thesisApprovalService from '../../../../api/ThesisApprovalService';
import { useUserContext } from "../../../../store/userContext";

const ThesisApproval = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [thesis, setThesis] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchThesis = useCallback(async () => {
        try {
            setLoading(true);
            const thesisResponse = await thesisApprovalService.getThesisByStudentCode(user.username);
            setThesis(thesisResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Tesis'));
        if (user.username) {
            fetchThesis();
        }
    }, [dispatch, user.username, fetchThesis]);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 7 - Aprobacion de Tesis</h1>
            <TApprovalTable thesis={thesis} />
        </>
    );
};

export default ThesisApproval;
