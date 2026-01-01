import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const TITLE_DELIVERY_API_URL = `${AppEnvironments.baseUrl}api/v1/entrega_titulo/`;

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

const getAllTitleDeliveries = async () => {
    try {
        const response = await axios.get(TITLE_DELIVERY_API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getTitleDeliveryByStudentCode = async (studentCode) => {
    try {
        const response = await axios.get(`${TITLE_DELIVERY_API_URL}student/${studentCode}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener entrega de título por código de estudiante:', error);
        throw error;
    }
};

const getTitleDeliveryById = async (id) => {
    try {
        const response = await axios.get(`${TITLE_DELIVERY_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const createTitleDelivery = async (titleDeliveryData) => {
    try {
        const response = await axios.post(TITLE_DELIVERY_API_URL, titleDeliveryData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const updateTitleDelivery = async (id, titleDeliveryData) => {
    try {
        const response = await axios.put(`${TITLE_DELIVERY_API_URL}${id}`, titleDeliveryData, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const deleteTitleDelivery = async (id) => {
    try {
        const response = await axios.delete(`${TITLE_DELIVERY_API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const titleDeliveryService = {
    getAllTitleDeliveries,
    getTitleDeliveryByStudentCode,
    getTitleDeliveryById,
    createTitleDelivery,
    updateTitleDelivery,
    deleteTitleDelivery,
};

export default titleDeliveryService;
