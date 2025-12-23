import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import titleReservationsService from '../../../../api/titleReservationsService';
import ReservationTable from './ReservationTable';
import { useUserContext } from "../../../../store/userContext";

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [reservation, setReservation] = useState([]);
    const [apiError, setApiError] = useState(null);
    const user = useUserContext();

    const fetchTitleReservationStepOne = useCallback(async () => {
        if (!user.username) {
            console.error('No se encontró un user.username válido');
            return;
        }
        try {
            const reservationResponse = await titleReservationsService.getReservationByStudentCode(user.username);
            setReservation(reservationResponse);
            setApiError(null);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
            setApiError('Error al cargar las reservaciones de títulos.');
        }
    }, [user.username]);


    useEffect(() => {
        dispatch(setPageTitle('Subir PDF'));

        if (user.username) {
            fetchTitleReservationStepOne();
        }
    }, [dispatch, user.username, fetchTitleReservationStepOne]);
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 1 - Reserva de Título</h1>
            <ReservationTable reservation={reservation} user={user.username} apiError={apiError} />
        </>
    );
};

export default TitleReservation;
