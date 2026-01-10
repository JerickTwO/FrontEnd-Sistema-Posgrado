import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import projectApprovalService from '../../../../api/projectApprovalService';

const ApprovalView = ({ approvalId }) => {
    const [pdfAvailable, setPdfAvailable] = useState(null);
    const [docAvailable, setDocAvailable] = useState(null);

    useEffect(() => {
        if (!approvalId) {
            setPdfAvailable(false);
            setDocAvailable(false);
            return;
        }
        projectApprovalService
            .viewPdfBase64(approvalId)
            .then((response) => {
                setPdfAvailable(!!(response && response.fileData));
            })
            .catch(() => {
                setPdfAvailable(false);
            });

        projectApprovalService
            .viewDocBase64(approvalId)
            .then((response) => {
                setDocAvailable(!!(response && response.fileData));
            })
            .catch(() => {
                setDocAvailable(false);
            });
    }, [approvalId]);

    const viewPDF = () => {
        projectApprovalService
            .viewPdfBase64(approvalId)
            .then((response) => {
                const { fileData, fileType } = response;
                
                if (fileType && (fileType.includes('word') || fileType.includes('doc'))) {
                    // Para archivos DOC/DOCX, ofrecer descarga
                    const mimeType = fileType.includes('openxmlformats') 
                        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
                        : 'application/msword';
                    
                    const base64Doc = `data:${mimeType};base64,${fileData}`;
                    const link = document.createElement('a');
                    link.href = base64Doc;
                    link.download = `documento.${fileType.includes('openxmlformats') ? 'docx' : 'doc'}`;
                    
                    Swal.fire({
                        icon: 'info',
                        title: 'Archivo DOC',
                        text: 'Los archivos DOC no se pueden previsualizar en el navegador. Se descargará el archivo.',
                        confirmButtonText: 'Descargar',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            link.click();
                        }
                    });
                } else {
                    // Para PDF, mostrar en iframe
                    const base64PDF = `data:application/pdf;base64,${fileData}`;
                    Swal.fire({
                        title: 'Vista Previa del PDF',
                        html: `<iframe src="${base64PDF}" width="100%" height="500px" style="border:none;"></iframe>`,
                        width: '600px',
                        confirmButtonText: 'Cerrar',
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo para la vista previa.',
                });
            });
    };

    const viewDOC = () => {
        projectApprovalService
            .viewDocBase64(approvalId)
            .then((response) => {
                const { fileData, fileType } = response;
                const mimeType = fileType && fileType.includes('openxmlformats')
                    ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    : 'application/msword';

                const base64Doc = `data:${mimeType};base64,${fileData}`;
                const link = document.createElement('a');
                link.href = base64Doc;
                link.download = `documento.${fileType && fileType.includes('openxmlformats') ? 'docx' : 'doc'}`;

                Swal.fire({
                    icon: 'info',
                    title: 'Archivo DOC',
                    text: 'Se descargará el archivo.',
                    confirmButtonText: 'Descargar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        link.click();
                    }
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
                className="btn btn-sm btn-outline-secondary m-0 w-[6rem]"
                disabled={!pdfAvailable}
            >
                {pdfAvailable === null
                    ? 'Cargando...'
                    : pdfAvailable
                        ? 'Ver PDF'
                        : 'No PDF'}
            </button>
            <button
                onClick={viewDOC}
                className="btn btn-sm btn-outline-secondary m-0 w-[6rem]"
                disabled={!docAvailable}
            >
                {docAvailable === null
                    ? 'Cargando...'
                    : docAvailable
                        ? 'Ver DOC'
                        : 'No DOC'}
            </button>
        </div>
    );
};

export default ApprovalView;
