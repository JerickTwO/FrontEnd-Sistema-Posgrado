import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import constancyThesisService from '../../../../api/constancyThesisService';

const ConstancyView = ({ constancyId }) => {
    const [pdfAvailable, setPdfAvailable] = useState(null);

    useEffect(() => {
        if (!constancyId) {
            setPdfAvailable(false);
            return;
        }
        constancyThesisService
            .viewPdfDocument(constancyId)
            .then((pdfData) => {
                setPdfAvailable(!!pdfData);
            })
            .catch(() => {
                setPdfAvailable(false);
            });
    }, [constancyId]);

    const viewPDF = () => {
        constancyThesisService
            .viewPdfDocument(constancyId)
            .then((pdfData) => {
                const base64PDF = `data:application/pdf;base64,${pdfData}`;
                Swal.fire({
                    title: 'Vista Previa del PDF',
                    html: `<iframe src="${base64PDF}" width="100%" height="500px" style="border:none;"></iframe>`,
                    width: '600px',
                    confirmButtonText: 'Cerrar',
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo para la vista previa.',
                });
            });
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={viewPDF}
                className="btn btn-sm btn-outline-secondary m-0 w-[5rem]"
                disabled={!pdfAvailable}
            >
                {pdfAvailable === null
                    ? 'Cargando...'
                    : pdfAvailable
                        ? 'Ver PDF'
                        : 'No disponible'}
            </button>
        </div>
    );
};

export default ConstancyView;
