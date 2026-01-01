import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ResolutionTable from './ResolutionTable';
import ResolutionModal from './ResolutionModal';
import ResolutionSearch from './ResolutionSearch';
import resolutionService from '../../../../api/resolutionService';
import InfoService from '../../../../api/institucionalInfoService';
import Swal from 'sweetalert2';

const Resolution = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResolution, setSelectedResolution] = useState(null);
    const [search, setSearch] = useState('');
    const [resolutions, setResolutions] = useState([]);
    const [info, setInfo] = useState(null);
    
    useEffect(() => {
        dispatch(setPageTitle('Resolución'));
        fetchResolutions();
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
    
    
    const fetchResolutions = useCallback(async () => {
        try {
            const resolutionResponse = await resolutionService.getAllResolutions();
            setResolutions(resolutionResponse);
        } catch (error) {
            console.error('Error al obtener las resoluciones:', error);
        }
    }, []);

    const handleEdit = async (resolution) => {
        setSelectedResolution(resolution);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedResolutionData, resolutionId) => {
        try {
            await resolutionService.updateResolution(resolutionId, updatedResolutionData);
            Swal.fire('Éxito', 'Resolución actualizada correctamente.', 'success');
            await fetchResolutions();
            closeModal();
        } catch (error) {
            console.error('Error al guardar laFiltro de similitud III:', error.response?.data || error.message);
            Swal.fire('Error', 'Hubo un problema al guardar laFiltro de similitud III.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedResolution(null);
    };

    return (
        <>
            <ResolutionSearch
                search={search}
                setSearch={setSearch}
            />
            <ResolutionTable resolutions={resolutions} onEdit={handleEdit} info={info} />
            <ResolutionModal
                isOpen={isModalOpen}
                resolution={selectedResolution}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default Resolution;
