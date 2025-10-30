import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const THESISAPPROVAL_API_URL = `${AppEnvironments.baseUrl}api/v1/aprobacion_tesis/`;

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

const getAllThesisApprovals = async () => {
    try {
        const response = await axios.get(THESISAPPROVAL_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getThesisApprovalById = async (id) => {
    try {
        const response = await axios.get(`${THESISAPPROVAL_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const saveThesisApproval = async (thesisApproval) => {
    try {
        const response = await axios.post(THESISAPPROVAL_API_URL, thesisApproval, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
const getThesisByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${THESISAPPROVAL_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};
const updateThesisApproval = async (id, thesisApproval) => {
    try {
        const response = await axios.put(`${THESISAPPROVAL_API_URL}${id}`, thesisApproval, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const deleteThesisApproval = async (id) => {
    try {
        const response = await axios.delete(`${THESISAPPROVAL_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default {
    getAllThesisApprovals,
    getThesisApprovalById,
    saveThesisApproval,
    updateThesisApproval,
    getThesisByStudentCode,
    deleteThesisApproval,
};
