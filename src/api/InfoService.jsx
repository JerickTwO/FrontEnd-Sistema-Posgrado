import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const REG_API_URL = `${AppEnvironments.baseUrl}api/v1/informacion_institucional`;

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
    };
};

export default {
    getInstitutionalInfo: async () => {
        try {
            const response = await axios.get(REG_API_URL, getConfig());
            return response.data;
        } catch (error) {
            console.error("Error al obtener la información institucional", error);
            throw error;
        }
    },

    createInstitutionalInfo: async (info) => {
        try {
            const response = await axios.post(REG_API_URL, info, getConfig());
            return response.data;
        } catch (error) {
            console.error("Error al crear la información institucional", error);
            throw error;
        }
    },

    updateInstitutionalInfo: async (info) => {
        try {
            const response = await axios.put(REG_API_URL, info, getConfig());
            return response.data;
        } catch (error) {
            console.error("Error al actualizar la información institucional", error);
            throw error;
        }
    },

    incrementFields: async (fields) => {
        try {
            const response = await axios.put(`${REG_API_URL}/increment`, fields, getConfig());
            return response.data;
        } catch (error) {
            console.error("Error al incrementar los campos", error);
            throw error;
        }
    },

    resetFields: async (fields) => {
        try {
            const response = await axios.put(`${REG_API_URL}/reset`, fields, getConfig());
            return response.data;
        } catch (error) {
            console.error("Error al resetear los campos", error);
            throw error;
        }
    },

    resetAllFields: async () => {
        try {
            const response = await axios.put(`${REG_API_URL}/reset-all`, {}, getConfig());
            return response.data;
        } catch (error) {
            console.error("Error al resetear todos los campos", error);
            throw error;
        }
    },
};
