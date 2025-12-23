import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';
import projectApprovalService from '../../../../api/projectApprovalService';
import { useUserContext } from "../../../../store/userContext";

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [project, setProject] = useState([]);
    const user = useUserContext();

    const fetchProjects = useCallback(async () => {
        if (!user.username) {
            console.error('No se encontró un user.username válido');
            return;
        }
        try {
            const projectResponse = await projectApprovalService.getProjectByStudentCode(user.username);
            setProject(projectResponse);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
        }
    }, [user.username]);

    useEffect(() => {
        dispatch(setPageTitle('Filtro de Similitud'));
        if (user.username) {
            fetchProjects();
        }
    }, [dispatch, user.username, fetchProjects]);

    return (
        <>
            <h1 className="text-2xl font-bold mb-5">Paso 2 - Filtro de Similitud</h1>
            <ApprovalTable project={project} />
        </>
    );
};

export default ProjectApproval;
