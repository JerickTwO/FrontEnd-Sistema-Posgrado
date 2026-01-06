import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ThesisTable from './ThesisTable';
import ThesisModal from './ThesisModal';
import ThesisSearch from './ThesisSearch';
import careerService from '../../../../api/careerService';
import constancyThesisService from '../../../../api/constancyThesisService';
import InfoService from '../../../../api/institucionalInfoService';

const ConstancyThesis = () => {
    const dispatch = useDispatch();
    const [thesis, setThesis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedThesis, setSelectedThesis] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [search, setSearch] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchCareers();
        fetchThesis();
        fetchInfo();
    }, [dispatch]);

    const fetchInfo = useCallback(async () => {
        try {
            const response = await InfoService.getInfo();
            setInfo(response);
        } catch (error) {
            console.log('Información institucional:', error);
            setApiError('Error al cargar la información institucional.');
        }
    }, []);

    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({
                value: career.id,
                label: career.name,
                data: career,
            }));
            setCareerOptions(options);
        } catch (error) {
            console.error('Error fetching careers:', error);
            setApiError('Error al cargar las carreras.');
        }
    }, []);

    const fetchThesis = useCallback(async () => {
        try {
            const thesis = await constancyThesisService.getAllConstancyThesis();
            setThesis(thesis);
        } catch (error) {
            setApiError('Error al cargar las constancias de tesis.');
        }
    }, []);

    const handleEdit = async (thesis) => {
        setSelectedThesis(thesis);
        setIsModalOpen(true);
    };

    const handleSave = async (thesisId, updatedThesisData) => {
        try {
            await constancyThesisService.editConstancyThesis(thesisId, updatedThesisData);
            Swal.fire('Éxito', 'Proyecto actualizado correctamente.', 'success');
            await fetchThesis();
            closeModal();
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el proyecto.', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedThesis(null);
    };

    return (
        <>
            <ThesisSearch search={search} setSearch={setSearch} careerOptions={careerOptions} selectedCareer={selectedCareer} setSelectedCareer={setSelectedCareer} />

            {apiError && <div className="text-danger">{apiError}</div>}

            <ThesisTable thesis={thesis} info={info} onEdit={handleEdit} />

            <ThesisModal isOpen={isModalOpen} thesis={selectedThesis} onClose={closeModal} onSave={handleSave} />
        </>
    );
};

export default ConstancyThesis;
