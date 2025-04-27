import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import PastingTable from './PastingTable';
import pastingApprovalService from '../../../../api/pastingApprovalService';
import { useUserContext } from "../../../../store/userContext";

const PastingApproval = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [pasting, setPasting] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPasting = useCallback(async () => {
        try {
            setLoading(true);
            const pastingResponse = await pastingApprovalService.getPastingByStudentCode(user.username);
            setPasting(pastingResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Proyecto'));
        if (user.username) {
            fetchPasting();
        }
    }, [dispatch, user.username, fetchPasting]);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        < >
            <h1 className="text-2xl font-bold mb-5">Paso 8 - Aprobacion de Empastados</h1>
            <PastingTable pasting={pasting} />
        </>
    );
};

export default PastingApproval;
