import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import projectApprovalService from '../../../../api/projectApprovalService';

const ApprovalView = ({ approvalId }) => {
    const [pdfAvailable, setPdfAvailable] = useState(null);

    useEffect(() => {
        if (!approvalId) {
            setPdfAvailable(false);
            return;
        }
        projectApprovalService
            .viewPdfBase64(approvalId)
            .then((pdfData) => {
                if (pdfData) {
                    setPdfAvailable(true);
                } else {
                    setPdfAvailable(false);
                }
            })
            .catch(() => {
                setPdfAvailable(false);
            });
    }, [approvalId]);

    const viewPDF = () => {
        projectApprovalService
            .viewPdfBase64(approvalId)
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

export default ApprovalView;
