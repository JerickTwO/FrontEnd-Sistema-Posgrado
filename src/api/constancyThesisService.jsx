import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const CONSTANCYTHESIS_API_URL = `${AppEnvironments.baseUrl}api/v1/constancia_tesis`;
const getAuthToken = () => {
    return localStorage.getItem('token');
};
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

// Métodos para la gestión de constancias de tesis
const getAllConstancyThesis = async () => {
    try {
        const response = await axios.get(CONSTANCYTHESIS_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching constancy thesis', error);
        throw error;
    }
};
const getConstancyByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${CONSTANCYTHESIS_API_URL}/student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener revisión por código de estudiante:', error);
        throw error;
    }
};
const editConstancyThesis = async (id, constancyThesis) => {
    try {
        const response = await axios.put(`${CONSTANCYTHESIS_API_URL}/${id}`, constancyThesis, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error in edit constancy thesis', error);
        throw error;
    }
};


export default {
    getAllConstancyThesis,
    editConstancyThesis,
    getConstancyByStudentCode,
};
