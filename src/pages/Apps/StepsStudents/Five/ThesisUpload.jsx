import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ThesisService from '../../../../api/constancyThesisService';
import { showObservations } from '../utils/ShowObservations';

const ThesisUpload = ({ thesisId, observations }) => {
    const [pdfDocumentId, setPdfDocumentId] = useState(null);

    useEffect(() => {
        if (!thesisId) {
            console.error('El ID de la tesis es undefined.');
            return;
        }
        ThesisService.viewPdfDocument(thesisId)
            .then((pdfData) => {
                if (pdfData) {
                    setPdfDocumentId(true);
                } else {
                    setPdfDocumentId(null);
                }
            })
            .catch((error) => {
                console.error('Error al cargar el documento de la tesis:', error);
            });
    }, [thesisId]);

    const viewPDF = () => {
        ThesisService.viewPdfDocument(thesisId)
            .then((pdfData) => {
                const base64PDF = `data:application/pdf;base64,${pdfData}`;

                Swal.fire({
                    title: 'Vista Previa del PDF',
                    html: `<iframe src="${base64PDF}" width="100%" height="500px" style="border:none;"></iframe>`,
                    width: '600px',
                    confirmButtonText: 'Cerrar',
                });
            })
            .catch((error) => {
                console.error('Error al obtener el PDF:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo para la vista previa.',
                });
            });
    };

    return (
        <div className="flex gap-3 justify-center">
            {pdfDocumentId && (
                <button onClick={viewPDF} className="btn btn-sm btn-outline-primary m-0">
                    Ver
                </button>
            )}
            <button className="btn btn-sm btn-outline-success m-0" onClick={() => showObservations(observations)}>Observaciones</button>
        </div>
    );
};

export default ThesisUpload;
