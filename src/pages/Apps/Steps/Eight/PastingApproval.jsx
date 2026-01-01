import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import TapprovalTable from './PastingTable';
import TapprovalModal from './PastingModal';
import TapprovalSearch from './PastingSearch';
import pastingApprovalService from '../../../../api/pastingApprovalService';
import InfoService from '../../../../api/institucionalInfoService';
import Swal from 'sweetalert2';

const PastingApproval = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPasting, setSelectedPasting] = useState(null);
    const [search, setSearch] = useState('');
    const [pastings, setPastings] = useState([]);
    const [info, setInfo] = useState(null);
    
    useEffect(() => {
        dispatch(setPageTitle('Aprobación de Tesis'));
        fetchPastings();
        fetchInfo();
    }, [dispatch]);

    const fetchInfo = useCallback(async () => {
        try {
            const response = await InfoService.getInfo();
            setInfo(response)
        } catch (error) {
            setApiError('Error al cargar la información institucional.');
        }
    }, []);
    
    
    const fetchPastings = useCallback(async () => {
        try {
            const pastingResponse = await pastingApprovalService.getAllPastingApprovals();
            setPastings(pastingResponse);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }, []);

    const handleEdit = async (pasting) => {
        setSelectedPasting(pasting);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedTapprovalData, taprovalId) => {
        try {
            await pastingApprovalService.updatePastingApproval(taprovalId, updatedTapprovalData);
            Swal.fire('Éxito', 'Notificación actualizada correctamente.', 'success');
            await fetchPastings();
            closeModal();
        } catch (error) {
            console.error('Error al guardar la notificación:', error.response?.data || error.message);
            Swal.fire('Error', 'Hubo un problema al guardar la notificación.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPasting(null);
    };

    return (
        <>
            <TapprovalSearch
                search={search}
                setSearch={setSearch}
            />
            <TapprovalTable pastings={pastings} onEdit={handleEdit} info={info} />
            <TapprovalModal
                isOpen={isModalOpen}
                pasting={selectedPasting}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default PastingApproval;
