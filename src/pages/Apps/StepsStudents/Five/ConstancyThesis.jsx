import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ThesisTable from './ThesisTable';
import constancyThesisService from '../../../../api/constancyThesisService';
import { useUserContext } from '../../../../store/userContext';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [currentThesis, setCurrentThesis] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useUserContext();

    const fetchThesis = useCallback(async () => {
        try {
            setLoading(true);
            const thesis = await constancyThesisService.getConstancyByStudentCode(user.username);
            setCurrentThesis(thesis);
        } catch (error) {
            console.error('Error al obtener los thesies:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);

    useEffect(() => {
        dispatch(setPageTitle('Presentación de Informe'));
        if (user.username) {
            fetchThesis();
        }
    }, [dispatch, user.username, fetchThesis]);


    if (loading) {
        return <div>Cargando datos...</div>;
    }
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 5 - Presentación de Informe</h1>
            <ThesisTable thesis={currentThesis} />
        </>
    );
};

export default ConstancyThesis;
