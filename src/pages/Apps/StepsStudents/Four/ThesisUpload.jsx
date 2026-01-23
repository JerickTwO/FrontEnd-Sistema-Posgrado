import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReportReviewPdfService from '../../../../api/reportReviewPdfService';

const ThesisUpload = ({ reviewId, meetsRequirements }) => {
    const [hasPdf, setHasPdf] = useState(false);
    const [hasDoc, setHasDoc] = useState(false);

    useEffect(() => {
        if (!reviewId) {
            console.error('El ID de la revisión es undefined.');
            return;
        }
        
        // Verificar si hay PDF
        ReportReviewPdfService.viewPdfDocumentStep4(reviewId)
            .then((response) => {
                setHasPdf(!!(response && response.fileData));
            })
            .catch(() => {
                setHasPdf(false);
            });

        // Verificar si hay DOC
        ReportReviewPdfService.viewDocDocumentStep4(reviewId)
            .then((response) => {
                setHasDoc(!!(response && response.fileData));
            })
            .catch(() => {
                setHasDoc(false);
            });
    }, [reviewId]);

    const uploadFile = () => {
        Swal.fire({
            title: 'Seleccionar un archivo PDF',
            html: `
                <div class="custom-file-wrapper">
                    <button type="button" class="bg-green-700 custom-file-button">Seleccionar archivo</button>
                    <input id="fileInput" type="file" class="custom-file-input" accept="application/pdf" />
                    <span id="fileName" class="custom-file-text">Ningún archivo seleccionado</span>
                </div>
            `,
            confirmButtonText: 'Cargar',
            showCancelButton: true,
            didOpen: () => {
                const fileInput = document.getElementById('fileInput');
                const fileName = document.getElementById('fileName');
                const customFileButton = document.querySelector('.custom-file-button');

                customFileButton.addEventListener('click', () => {
                    fileInput.click();
                });

                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    fileName.textContent = file ? file.name : 'Ningún archivo seleccionado';
                });
            },
            preConfirm: () => {
                const fileInput = document.getElementById('fileInput');
                const file = fileInput.files[0];
                if (!file) {
                    Swal.showValidationMessage('Debes seleccionar un archivo');
                } else if (file.type !== 'application/pdf') {
                    Swal.showValidationMessage('El archivo debe ser un PDF');
                } else if (file.size > 1048576) {
                    Swal.showValidationMessage('El archivo no debe superar los 1 MB');
                } else {
                    return file;
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedFile = result.value;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64PDF = e.target.result.split(',')[1];
                    ReportReviewPdfService.uploadPdfDocumentStep4(reviewId, base64PDF)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Archivo cargado con éxito',
                                text: 'El archivo ha sido guardado correctamente.',
                            });
                            setHasPdf(true);
                        })
                        .catch((error) => {
                            console.error('Error al subir el archivo:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `No se pudo cargar el archivo: ${error.message}`,
                            });
                        });
                };
                reader.onerror = () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al leer el archivo PDF.',
                    });
                };
                reader.readAsDataURL(selectedFile);
            }
        });
    };

    const uploadDocFile = () => {
        Swal.fire({
            title: 'Seleccionar un archivo DOCX',
            html: `
                <div class="custom-file-wrapper">
                    <button type="button" class="bg-blue-700 custom-file-button">Seleccionar archivo</button>
                    <input id="fileInput" type="file" class="custom-file-input" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                    <span id="fileName" class="custom-file-text">Ningún archivo seleccionado</span>
                </div>
            `,
            confirmButtonText: 'Cargar',
            showCancelButton: true,
            didOpen: () => {
                const fileInput = document.getElementById('fileInput');
                const fileName = document.getElementById('fileName');
                const customFileButton = document.querySelector('.custom-file-button');

                customFileButton.addEventListener('click', () => {
                    fileInput.click();
                });

                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    fileName.textContent = file ? file.name : 'Ningún archivo seleccionado';
                });
            },
            preConfirm: () => {
                const fileInput = document.getElementById('fileInput');
                const file = fileInput.files[0];
                if (!file) {
                    Swal.showValidationMessage('Debes seleccionar un archivo');
                } else if (!file.name.match(/\.(doc|docx)$/i)) {
                    Swal.showValidationMessage('El archivo debe ser DOC o DOCX');
                } else if (file.size > 2097152) {
                    Swal.showValidationMessage('El archivo no debe superar los 2 MB');
                } else {
                    return file;
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedFile = result.value;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Doc = e.target.result.split(',')[1];
                    ReportReviewPdfService.uploadDocDocumentStep4(reviewId, base64Doc)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Archivo cargado con éxito',
                                text: 'El documento ha sido guardado correctamente.',
                            });
                            setHasDoc(true);
                        })
                        .catch((error) => {
                            console.error('Error al subir el archivo:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `No se pudo cargar el archivo: ${error.message}`,
                            });
                        });
                };
                reader.onerror = () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al leer el archivo.',
                    });
                };
                reader.readAsDataURL(selectedFile);
            }
        });
    };

    const viewPDF = () => {
        ReportReviewPdfService.viewPdfDocumentStep4(reviewId)
            .then((response) => {
                const { fileData } = response;
                const base64PDF = `data:application/pdf;base64,${fileData}`;
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

    const viewDOC = () => {
        ReportReviewPdfService.viewDocDocumentStep4(reviewId)
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
                    title: 'Archivo DOC/DOCX',
                    text: 'Los archivos DOC no se pueden previsualizar en el navegador. Se descargará el archivo.',
                    confirmButtonText: 'Descargar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        link.click();
                    }
                });
            })
            .catch((error) => {
                console.error('Error al obtener el DOC:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el archivo.',
                });
            });
    };

    const deletePDF = () => {
        Swal.fire({
            title: '¿Eliminar PDF?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                ReportReviewPdfService.deletePdfDocumentStep4(reviewId)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'PDF eliminado',
                            text: 'El archivo PDF ha sido eliminado con éxito.',
                        });
                        setHasPdf(false);
                    })
                    .catch((error) => {
                        console.error('Error al eliminar el PDF:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `No se pudo eliminar el archivo: ${error.message}`,
                        });
                    });
            }
        });
    };

    const deleteDOC = () => {
        Swal.fire({
            title: '¿Eliminar DOC?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                ReportReviewPdfService.deleteDocDocumentStep4(reviewId)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'DOC eliminado',
                            text: 'El archivo DOC ha sido eliminado con éxito.',
                        });
                        setHasDoc(false);
                    })
                    .catch((error) => {
                        console.error('Error al eliminar el DOC:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `No se pudo eliminar el archivo: ${error.message}`,
                        });
                    });
            }
        });
    };

    return (
        <div className="flex flex-col gap-2 justify-center">
            {/* Sección PDF */}
            <div className="flex gap-2 items-center">
                <span className="font-semibold text-sm w-16">PDF:</span>
                {hasPdf && (
                    <button onClick={viewPDF} className="btn btn-sm btn-outline-primary m-0">
                        Ver
                    </button>
                )}
                {!meetsRequirements && (
                    <>
                        <button onClick={uploadFile} className="btn btn-sm btn-outline-secondary m-0">
                            {hasPdf ? 'Actualizar' : 'Subir'}
                        </button>
                        {hasPdf && (
                            <button onClick={deletePDF} className="btn btn-sm btn-outline-danger m-0">
                                Eliminar
                            </button>
                        )}
                    </>
                )}
            </div>
            
            {/* Sección DOCX */}
            <div className="flex gap-2 items-center">
                <span className="font-semibold text-sm w-16">DOCX:</span>
                {hasDoc && (
                    <button onClick={viewDOC} className="btn btn-sm btn-outline-info m-0">
                        Descargar
                    </button>
                )}
                {!meetsRequirements && (
                    <>
                        <button onClick={uploadDocFile} className="btn btn-sm btn-outline-secondary m-0">
                            {hasDoc ? 'Actualizar' : 'Subir'}
                        </button>
                        {hasDoc && (
                            <button onClick={deleteDOC} className="btn btn-sm btn-outline-danger m-0">
                                Eliminar
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ThesisUpload;
