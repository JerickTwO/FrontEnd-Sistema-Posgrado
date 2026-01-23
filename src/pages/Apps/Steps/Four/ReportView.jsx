import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import reportReviewPdfService from '../../../../api/reportReviewPdfService';

const ReportView = ({ reportId }) => {
    const [pdfAvailable, setPdfAvailable] = useState(null);
    const [docAvailable, setDocAvailable] = useState(null);

    useEffect(() => {
        if (!reportId) {
            setPdfAvailable(false);
            setDocAvailable(false);
            return;
        }
        
        reportReviewPdfService.viewPdfDocumentStep4(reportId)
            .then((response) => {
                setPdfAvailable(!!(response && response.fileData));
            })
            .catch(() => {
                setPdfAvailable(false);
            });

        reportReviewPdfService.viewDocDocumentStep4(reportId)
            .then((response) => {
                setDocAvailable(!!(response && response.fileData));
            })
            .catch(() => {
                setDocAvailable(false);
            });
    }, [reportId]);

    const viewPDF = () => {
        reportReviewPdfService.viewPdfDocumentStep4(reportId)
            .then((response) => {
                const { fileData, fileType } = response;
                
                if (fileType && (fileType.includes('word') || fileType.includes('doc'))) {
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
        reportReviewPdfService.viewDocDocumentStep4(reportId)
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
        <div className="flex flex-col gap-2 items-center justify-center">
            <button
                onClick={viewPDF}
                className={`btn btn-sm m-0 w-[7rem] ${pdfAvailable ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
                disabled={!pdfAvailable}
            >
                {pdfAvailable === null
                    ? 'Cargando...'
                    : pdfAvailable
                        ? '📄 Ver PDF'
                        : 'Sin PDF'}
            </button>
            <button
                onClick={viewDOC}
                className={`btn btn-sm m-0 w-[7rem] ${docAvailable ? 'btn-outline-info' : 'btn-outline-secondary'}`}
                disabled={!docAvailable}
            >
                {docAvailable === null
                    ? 'Cargando...'
                    : docAvailable
                        ? '📥 Ver DOC'
                        : 'Sin DOC'}
            </button>
        </div>
    );
};

export default ReportView;
