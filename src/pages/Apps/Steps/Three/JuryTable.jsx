import { useState } from 'react';
import Pagination from '../Pagination';
import PdfThree from '../Pdfs/pdf-3';
import { formatDate, formatNumberWithZero } from '../utils/Dates';
import DownloadDocs from '../utils/DownloadButton';

const JuryTable = ({ currentJury, onEdit, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(currentJury.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const jurys = currentJury.slice(indexOfFirstItem, indexOfLastItem);
    const getDownloadButton = (jury) => {
        
        const fileNameActa = `P3 CARTA Nº ${formatNumberWithZero(jury.id)}.pdf`;
        return (
            <>
                <DownloadDocs
                    infoStepTable={jury}
                    PdfDocument={PdfThree}
                    institutionalInfo={info}
                    fileName={fileNameActa}
                />
            </>
        );
    };

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiantes</th>
                            <th>Código(s)</th>
                            <th>Cumple Requisitos</th>
                            <th>Carrera</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {jurys.length > 0 ? (
                            jurys.map((jury) => (
                                <tr key={jury.id}>
                                    <td>
                                        {jury.projectApprovalStepTwo?.titleReservationStepOne.student.firstNames} {jury.projectApprovalStepTwo?.titleReservationStepOne.student.lastName}
                                        {jury.projectApprovalStepTwo?.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {jury.projectApprovalStepTwo?.titleReservationStepOne.studentTwo.firstNames} {jury.projectApprovalStepTwo?.titleReservationStepOne.studentTwo.lastName}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {jury.projectApprovalStepTwo?.titleReservationStepOne.student.studentCode || 'N/A'}
                                        {jury.projectApprovalStepTwo?.titleReservationStepOne.studentTwo && (
                                            <>
                                                <br />
                                                {jury.projectApprovalStepTwo?.titleReservationStepOne.studentTwo.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>{jury.meetRequirements ? 'Sí' : 'No'}</td>
                                    <td>{jury.projectApprovalStepTwo?.titleReservationStepOne.student.career?.name || 'N/A'}</td>
                                    <td>{formatDate(jury.updatedAt)}</td>
                                    <td className='flex gap-2'>
                                        {getDownloadButton(jury)}
                                        <button
                                            onClick={() => onEdit(jury)}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 text-center">
                                    No hay proyectos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default JuryTable;
