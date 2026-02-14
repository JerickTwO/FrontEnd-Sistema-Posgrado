import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import ApprovalTable from './ApprovalTable';
import ApprovalModal from './ApprovalModal';
import ApprovalSearch from './ApprovalSearch';
import projectApprovalService from '../../../../api/projectApprovalService';
import institucionalInfoService from '../../../../api/institucionalInfoService';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [currentProjects, setCurrentProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [institutionalInfo, setInstitutionalInfo] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Comprobación de Proyecto'));
        fetchProjects();
        fetchInfo();
    }, [dispatch]);

    const fetchInfo = async () => {
        try {
            const response = await institucionalInfoService.getInfo();
            setInstitutionalInfo(response);
        } catch (error) {
            console.error('Error al obtener la información institucional:', error);
            setInstitutionalInfo(null);
        }
    };

    const fetchProjects = useCallback(async () => {
        try {
            const projects = await projectApprovalService.getProjectApproval();
            setCurrentProjects(projects);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, []);

    const handleEdit = async (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);

    };

    const handleSave = async (updatedProjectData, projectId) => {
        try {
            await projectApprovalService.editProjectApproval(projectId, updatedProjectData);
            Swal.fire('Éxito', 'Proyecto actualizado correctamente.', 'success');

            await fetchProjects();
            closeModal();
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el proyecto.', 'error');
        }
    };

    const normalizeText = (text) => {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    };

    const filteredProjects = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return currentProjects.filter((project) => {
            const fullName = `${project.titleReservationStepOne.student.firstNames} ${project.titleReservationStepOne.student.lastName}`;
            const normalizedFullName = normalizeText(fullName);
            const studentCodeMatch = normalizeText(project.titleReservationStepOne.student.studentCode).includes(normalizedSearch);
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch;
            const matchesCareer = selectedCareer ? project.titleReservationStepOne.student.career.id === selectedCareer.value : true;

            return matchesSearch && matchesCareer;
        });
    }, [currentProjects, search, selectedCareer]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };
    return (
        <>
            <ApprovalSearch search={search} setSearch={setSearch} selectedCareer={selectedCareer} setSelectedCareer={setSelectedCareer} />
            <ApprovalTable projects={filteredProjects} onEdit={handleEdit} info={institutionalInfo} />
            <ApprovalModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} onSave={handleSave} />
        </>
    );
};

export default ProjectApproval;
