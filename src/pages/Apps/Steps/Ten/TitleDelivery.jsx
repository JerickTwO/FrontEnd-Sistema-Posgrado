import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TitleDeliveryTable from './TitleDeliveryTable';
import TitleDeliveryModal from './TitleDeliveryModal';
import TitleDeliverySearch from './TitleDeliverySearch';
import titleDeliveryService from '../../../../api/titleDeliveryService';
import InfoService from '../../../../api/institucionalInfoService';
import Swal from 'sweetalert2';

const TitleDelivery = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTitleDelivery, setSelectedTitleDelivery] = useState(null);
    const [search, setSearch] = useState('');
    const [titleDeliveries, setTitleDeliveries] = useState([]);
    const [info, setInfo] = useState(null);
    
    useEffect(() => {
        dispatch(setPageTitle('Constancia de Empastados'));
        fetchTitleDeliveries();
        fetchInfo();
    }, [dispatch]);

    const fetchInfo = useCallback(async () => {
        try {
            const response = await InfoService.getInfo();
            setInfo(response)
        } catch (error) {
            console.error('Error al cargar la información institucional:', error);
        }
    }, []);
    
    const fetchTitleDeliveries = useCallback(async () => {
        try {
            const titleDeliveryResponse = await titleDeliveryService.getAllTitleDeliveries();
            setTitleDeliveries(titleDeliveryResponse);
        } catch (error) {
            console.error('Error al obtener las entregas de título:', error);
        }
    }, []);

    const handleEdit = async (titleDelivery) => {
        setSelectedTitleDelivery(titleDelivery);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedTitleDeliveryData, titleDeliveryId) => {
        try {
            await titleDeliveryService.updateTitleDelivery(titleDeliveryId, updatedTitleDeliveryData);
            Swal.fire('Éxito', 'Constancia de Empastados actualizada correctamente.', 'success');
            await fetchTitleDeliveries();
            closeModal();
        } catch (error) {
            console.error('Error al guardar la Constancia de Empastados:', error.response?.data || error.message);
            Swal.fire('Error', 'Hubo un problema al guardar la Constancia de Empastados.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTitleDelivery(null);
    };

    return (
        <>
            <TitleDeliverySearch
                search={search}
                setSearch={setSearch}
            />
            <TitleDeliveryTable titleDeliveries={titleDeliveries} onEdit={handleEdit} info={info} />
            <TitleDeliveryModal
                isOpen={isModalOpen}
                titleDelivery={selectedTitleDelivery}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default TitleDelivery;
