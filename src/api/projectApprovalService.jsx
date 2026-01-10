import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const PROJECTAPPROVAL_API_URL = `${AppEnvironments.baseUrl}api/v1/aprobacion_proyecto`;

// Obtener el token almacenado en localStorage/student/
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Obtener todas las reservas de título
const getProjectApproval = async () => {
    try {
        const response = await axios.get(PROJECTAPPROVAL_API_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projectApproval', error);
        throw error;
    }
};

// Obtener una reserva de título específica por ID

const addProjectApproval = async (projectApproval) => {
    try {
        const response = await axios.post(PROJECTAPPROVAL_API_URL, projectApproval, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        if (response.data) {
            return response.data;
        } else {
            throw new Error('El servidor no devolvió datos en la respuesta.');
        }
    } catch (error) {
        console.error('Error en addProjectApproval:', error.response ? error.response.data : error.message);

        throw new Error('Error inesperado: ' + error.message);
    }
};
const getProjectByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${PROJECTAPPROVAL_API_URL}/student/${studentCode}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

const getProjectApprovalById = async (id) => {
    try {
        const response = await axios.get(`${PROJECTAPPROVAL_API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        // Ignorar el error 409 y continuar
        if (error.response && error.response.status === 409) {
            console.warn('Conflicto detectado en la edición, pero continuando...');
            return;
        }

        console.error('Error en get:', error);
        throw error;
    }
};

const editProjectApproval = async (id, projectApproval) => {
    try {
        const response = await axios.put(`${PROJECTAPPROVAL_API_URL}/${id}`, projectApproval, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        // Ignorar el error 409 y continuar
        if (error.response && error.response.status === 409) {
            console.warn('Conflicto detectado en la edición, pero continuando...');
            return;
        }

        console.error('Error en editProjectApproval:', error);
        throw error;
    }
};

// Eliminar una reserva de título
const deleteProjectApproval = async (id) => {
    try {
        const response = await axios.delete(`${PROJECTAPPROVAL_API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting projectApproval', error);
        throw error;
    }
};

// PDF (Base64) para Paso 2
const uploadPdfBase64 = async (id, pdfData) => {
    try {
        const response = await axios.post(`${PROJECTAPPROVAL_API_URL}/${id}/uploadPdf`, { pdfData }, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al subir el PDF (base64):', error);
        throw error;
    }
};

const viewPdfBase64 = async (id) => {
    try {
        const response = await axios.get(`${PROJECTAPPROVAL_API_URL}/${id}/viewPdf`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        // Devolver tanto el archivo como el tipo
        return {
            fileData: response.data.pdfData || response.data.fileData,
            fileType: response.data.fileType || response.data.contentType || 'application/pdf'
        };
    } catch (error) {
        console.error('Error al obtener el archivo (base64):', error);
        throw error;
    }
};

const deletePdfBase64 = async (id) => {
    try {
        const response = await axios.delete(`${PROJECTAPPROVAL_API_URL}/${id}/deletePdf`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el PDF (base64):', error);
        throw error;
    }
};

// DOC (Base64) para Paso 2
const uploadDocBase64 = async (id, docData) => {
    try {
        const response = await axios.post(`${PROJECTAPPROVAL_API_URL}/${id}/uploadDoc`, { docData }, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al subir el DOC (base64):', error);
        throw error;
    }
};

const viewDocBase64 = async (id) => {
    try {
        const response = await axios.get(`${PROJECTAPPROVAL_API_URL}/${id}/viewDoc`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return {
            fileData: response.data.docData || response.data.fileData,
            fileType: response.data.fileType || response.data.contentType || 'application/msword'
        };
    } catch (error) {
        console.error('Error al obtener el DOC (base64):', error);
        throw error;
    }
};

const deleteDocBase64 = async (id) => {
    try {
        const response = await axios.delete(`${PROJECTAPPROVAL_API_URL}/${id}/deleteDoc`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el DOC (base64):', error);
        throw error;
    }
};

export default {
    getProjectApproval,
    addProjectApproval,
    editProjectApproval,
    getProjectByStudentCode,
    getProjectApprovalById,
    deleteProjectApproval,
    uploadPdfBase64,
    viewPdfBase64,
    deletePdfBase64,
    uploadDocBase64,
    viewDocBase64,
    deleteDocBase64,
};
