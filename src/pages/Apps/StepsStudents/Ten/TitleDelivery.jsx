import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TitleDeliveryTable from './TitleDeliveryTable';
import titleDeliveryService from '../../../../api/titleDeliveryService';
import { useUserContext } from "../../../../store/userContext";

const TitleDelivery = () => {
    const user = useUserContext();
    const dispatch = useDispatch();
    const [titleDelivery, setTitleDelivery] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTitleDelivery = useCallback(async () => {
        try {
            setLoading(true);
            const titleDeliveryResponse = await titleDeliveryService.getTitleDeliveryByStudentCode(user.username);
            setTitleDelivery(titleDeliveryResponse);
        } catch (error) {
            console.error('Error al obtener la Constancia de Empastados:', error);
        } finally {
            setLoading(false);
        }
    }, [user.username]);
    
    useEffect(() => {
        dispatch(setPageTitle('Constancia de Empastados'));
        if (user.username) {
            fetchTitleDelivery();
        }
    }, [dispatch, user.username, fetchTitleDelivery]);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 10 - Constancia de Empastados</h1>
            <TitleDeliveryTable titleDelivery={titleDelivery} />
        </>
    );
};

export default TitleDelivery;
