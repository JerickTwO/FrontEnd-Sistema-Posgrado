import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const FINAL_STEP_API_URL = `${AppEnvironments.baseUrl}api/v1/paso_final/`;

const getAuthToken = () => localStorage.getItem('token');

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

const handleError = (error) => {
    console.error(
        'API Error:',
        error.response ? error.response.data : error.message
    );
    throw new Error(
        'Error inesperado: ' + (error.response ? error.response.data.message : error.message)
    );
};

const getAllFinalSteps = async () => {
    try {
        const response = await axios.get(FINAL_STEP_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getFinalStepByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${FINAL_STEP_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener paso final por código de estudiante:', error);
        throw error;
    }
};

const getFinalStepById = async (id) => {
    try {
        const response = await axios.get(`${FINAL_STEP_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const createFinalStep = async (finalStepData) => {
    try {
        const response = await axios.post(FINAL_STEP_API_URL, finalStepData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const updateFinalStep = async (id, finalStepData) => {
    try {
        const response = await axios.put(`${FINAL_STEP_API_URL}${id}`, finalStepData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const deleteFinalStep = async (id) => {
    try {
        const response = await axios.delete(`${FINAL_STEP_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const finalStepService = {
    getAllFinalSteps,
    getFinalStepByStudentCode,
    getFinalStepById,
    createFinalStep,
    updateFinalStep,
    deleteFinalStep,
};

export default finalStepService;
