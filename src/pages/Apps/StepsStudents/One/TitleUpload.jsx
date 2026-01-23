import React from 'react';
import Swal from 'sweetalert2';
import { showObservations } from '../utils/ShowObservations';

const TitleUpload = ({ message, observations }) => {

    const viewMessage = () => {
        Swal.fire({
            title: 'Mensaje del Administrador',
            html: `<div style="text-align: left; white-space: pre-wrap;">${message || 'No hay mensaje disponible'}</div>`,
            icon: message ? 'info' : 'warning',
            confirmButtonText: 'Cerrar',
            width: '600px',
        });
    };

    return (
        <div className="flex gap-3 justify-center">
            <button 
                onClick={viewMessage} 
                className="btn btn-sm btn-outline-primary m-0"
            >
                Ver Mensaje
            </button>
            <button 
                className="btn btn-sm btn-outline-success" 
                onClick={() => showObservations(observations)}
            >
                Observaciones
            </button>
        </div>
    );
};

export default TitleUpload;
