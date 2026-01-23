import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const PDF_STEP4_API_URL = `${AppEnvironments.baseUrl}api/v1/pdfDocument/StepFour`;

const getAuthToken = () => localStorage.getItem('token');
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

export const viewPdfDocumentStep4 = async (id) => {
    try {
        const response = await axios.get(`${PDF_STEP4_API_URL}/${id}/view`, getAuthHeaders());
        return {
            fileData: response.data.fileData || response.data.pdfData,
            fileType: response.data.fileType || 'application/pdf'
        };
    } catch (error) {
        console.error('Error obteniendo PDF Paso 4', error);
        throw error;
    }
};

export const uploadPdfDocumentStep4 = async (id, pdfData) => {
    try {
        const response = await axios.post(`${PDF_STEP4_API_URL}/${id}/upload`, { pdfData }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error subiendo PDF Paso 4', error);
        throw error;
    }
};

export const deletePdfDocumentStep4 = async (id) => {
    try {
        const response = await axios.delete(`${PDF_STEP4_API_URL}/${id}/delete`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error eliminando PDF Paso 4', error);
        throw error;
    }
};

// DOC (Base64) para Paso 4
export const uploadDocDocumentStep4 = async (id, docData) => {
    try {
        const response = await axios.post(`${PDF_STEP4_API_URL}/${id}/uploadDoc`, { docData }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error subiendo DOC Paso 4', error);
        throw error;
    }
};

export const viewDocDocumentStep4 = async (id) => {
    try {
        const response = await axios.get(`${PDF_STEP4_API_URL}/${id}/viewDoc`, getAuthHeaders());
        return {
            fileData: response.data.fileData || response.data.docData,
            fileType: response.data.fileType || 'application/msword'
        };
    } catch (error) {
        console.error('Error obteniendo DOC Paso 4', error);
        throw error;
    }
};

export const deleteDocDocumentStep4 = async (id) => {
    try {
        const response = await axios.delete(`${PDF_STEP4_API_URL}/${id}/deleteDoc`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error eliminando DOC Paso 4', error);
        throw error;
    }
};

export default {
    viewPdfDocumentStep4,
    uploadPdfDocumentStep4,
    deletePdfDocumentStep4,
    uploadDocDocumentStep4,
    viewDocDocumentStep4,
    deleteDocDocumentStep4,
};
