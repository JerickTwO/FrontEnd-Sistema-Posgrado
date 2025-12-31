import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import NotificationTable from './NotificationTable';
import NotificationModal from './NotificationModal';
import NotificationSearch from './NotificationSearch';
import juryNotificationService from '../../../../api/juryNotificationService';
import InfoService from '../../../../api/InfoService';
import { getNotificationsDetails } from '../utils/NotificationUtils';
import Swal from 'sweetalert2';

const JuryNotifications = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [search, setSearch] = useState('');
    const [info, setInfo] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Revisión de Informe'));
        fetchNotifications();
        fetchInstitutionalInfo();
    }, [dispatch]);

    const fetchNotifications = useCallback(async () => {
        try {
            const notificationResponse = await juryNotificationService.getAllJuryNotifications();
            setNotifications(notificationResponse);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }, []);
    const fetchInstitutionalInfo = useCallback(async () => {
        try {
            const info = await InfoService.getInstitutionalInfo();
            setInfo(info);
        } catch (error) {
            console.error('Error al obtener la información institucional:', error);
        }
    }, []);
    const handleEdit = async (notification) => {
        const juryDetails = getNotificationsDetails(notification);
        setSelectedNotification(juryDetails);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedNotificationData, notificationId) => {
        try {
            await juryNotificationService.editJuryNotification(notificationId, updatedNotificationData);
            Swal.fire('Éxito', 'Notificación actualizada correctamente.', 'success');
            await fetchNotifications();
            closeModal();
        } catch (error) {
            Swal.fire('Error', 'Hubo un problema al guardar la notificación.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
    };

    return (
        <>
            <NotificationSearch
                search={search}
                setSearch={setSearch}
            />
            <NotificationTable notification={notifications} onEdit={handleEdit} info={info} />
            <NotificationModal
                isOpen={isModalOpen}
                notification={selectedNotification}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default JuryNotifications;
