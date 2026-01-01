import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import FinalStepTable from './FinalStepTable';
import FinalStepModal from './FinalStepModal';
import FinalStepSearch from './FinalStepSearch';
import finalStepService from '../../../../api/finalStepService';
import InfoService from '../../../../api/institucionalInfoService';
import Swal from 'sweetalert2';

const FinalStep = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFinalStep, setSelectedFinalStep] = useState(null);
    const [search, setSearch] = useState('');
    const [finalSteps, setFinalSteps] = useState([]);
    const [info, setInfo] = useState(null);
    
    useEffect(() => {
        dispatch(setPageTitle('Emisión de Tesis'));
        fetchFinalSteps();
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
    
    const fetchFinalSteps = useCallback(async () => {
        try {
            const finalStepResponse = await finalStepService.getAllFinalSteps();
            setFinalSteps(finalStepResponse);
        } catch (error) {
            console.error('Error al obtener los pasos finales:', error);
        }
    }, []);

    const handleEdit = async (finalStep) => {
        setSelectedFinalStep(finalStep);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedFinalStepData, finalStepId) => {
        try {
            await finalStepService.updateFinalStep(finalStepId, updatedFinalStepData);
            Swal.fire('Éxito', 'Emisión de Tesis actualizado correctamente.', 'success');
            await fetchFinalSteps();
            closeModal();
        } catch (error) {
            console.error('Error al guardar el Emisión de Tesis:', error.response?.data || error.message);
            Swal.fire('Error', 'Hubo un problema al guardar el Emisión de Tesis.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFinalStep(null);
    };

    return (
        <>
            <FinalStepSearch search={search} setSearch={setSearch} />
            <FinalStepTable finalSteps={finalSteps} onEdit={handleEdit} info={info} />
            <FinalStepModal
                isOpen={isModalOpen}
                finalStep={selectedFinalStep}
                onClose={closeModal}
                onSave={handleSave}
            />
        </>
    );
};

export default FinalStep;
