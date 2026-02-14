import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ResolutionTable from './ResolutionTable';
import resolutionService from '../../../../api/resolutionService';
import { useUserContext } from "../../../../store/userContext";

const Resolution = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [resolution, setResolution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResolution = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const resolutionResponse = await resolutionService.getResolutionByStudentCode(user.username);
            console.log('Resolution response:', resolutionResponse);
            setResolution(resolutionResponse);
        } catch (error) {
            console.error('Error al obtener Filtro de similitud III:', error);
            setError('No se pudo cargar la información del paso 9');
            setResolution(null);
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

    if (error) {
        return (
            <div className="alert alert-danger">
                <p>{error}</p>
                <button onClick={fetchResolution} className="btn btn-primary mt-2">
                    Intentar nuevamente
                </button>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 9 - Filtro de similitud III</h1>
            <ResolutionTable resolution={resolution} />
        </>
    );
};

export default Resolution;
