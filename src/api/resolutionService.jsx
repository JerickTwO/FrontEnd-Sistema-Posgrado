import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

// URL base de la API
const RESOLUTION_API_URL = `${AppEnvironments.baseUrl}api/v1/resolucion/`;

// Obtener token de autenticación almacenado en localStorage
const getAuthToken = () => localStorage.getItem('token');

// Generar cabeceras de autorización
const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
        console.warn('No authentication token found');
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Función para manejar errores
const handleError = (error) => {
    console.error(
        'API Error:',
        error.response ? error.response.data : error.message
    );
    throw new Error(
        'Error inesperado: ' + (error.response ? error.response.data.message : error.message)
    );
};

// Servicio para obtener todos los registros
const getAllResolutions = async () => {
    try {
        const response = await axios.get(RESOLUTION_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getResolutionByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${RESOLUTION_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener resolución por código de estudiante:', error);
        throw error;
    }
};

// Servicio para obtener un registro por ID
const getResolutionById = async (id) => {
    try {
        const response = await axios.get(`${RESOLUTION_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Servicio para crear un nuevo registro
const createResolution = async (resolutionData) => {
    try {
        const response = await axios.post(RESOLUTION_API_URL, resolutionData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Servicio para actualizar un registro existente
const updateResolution = async (id, resolutionData) => {
    try {
        const response = await axios.put(`${RESOLUTION_API_URL}${id}`, resolutionData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Servicio para eliminar un registro por ID
const deleteResolution = async (id) => {
    try {
        const response = await axios.delete(`${RESOLUTION_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Exportar todos los servicios
const resolutionService = {
    getAllResolutions,
    getResolutionByStudentCode,
    getResolutionById,
    createResolution,
    updateResolution,
    deleteResolution,
};

export default resolutionService;
