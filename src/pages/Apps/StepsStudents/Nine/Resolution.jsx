import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ResolutionTable from './ResolutionTable';
import resolutionService from '../../../../api/resolutionService';
import { useUserContext } from "../../../../store/userContext";

const Resolution = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [resolution, setResolution] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchResolution = useCallback(async () => {
        try {
            setLoading(true);
            const resolutionResponse = await resolutionService.getResolutionByStudentCode(user.username);
            setResolution(resolutionResponse);
        } catch (error) {
            console.error('Error al obtener laFiltro de similitud III:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);
    
    useEffect(() => {
        dispatch(setPageTitle('Filtro de similitud III'));
        if (user.username) {
            fetchResolution();
        }
    }, [dispatch, user.username, fetchResolution]);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 9 -Filtro de similitud III</h1>
            <ResolutionTable resolution={resolution} />
        </>
    );
};

export default Resolution;
