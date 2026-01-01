import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import FinalStepTable from './FinalStepTable';
import finalStepService from '../../../../api/finalStepService';
import { useUserContext } from "../../../../store/userContext";

const FinalStep = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [finalStep, setFinalStep] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFinalStep = useCallback(async () => {
        try {
            setLoading(true);
            const finalStepResponse = await finalStepService.getFinalStepByStudentCode(user.username);
            setFinalStep(finalStepResponse);
        } catch (error) {
            console.error('Error al obtener el Emisión de Tesis:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);
    
    useEffect(() => {
        dispatch(setPageTitle('Emisión de Tesis'));
        if (user.username) {
            fetchFinalStep();
        }
    }, [dispatch, user.username, fetchFinalStep]);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 11 - Emisión de Tesis</h1>
            <FinalStepTable finalStep={finalStep} />
        </>
    );
};

export default FinalStep;
