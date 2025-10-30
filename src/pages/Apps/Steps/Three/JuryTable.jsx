import { useState } from 'react';
import Pagination from '../Pagination';
import PdfThreeA from '../pdfSteps/PdfThreeA';
import PdfThreeC from '../pdfSteps/PdfThreeC';
import PdfThreeCM from '../pdfSteps/PdfThreeCM';
import { formatDate, formatNumberWithZero } from '../utils/Dates';
import DownloadDocs from '../utils/DownloadButton';

const JuryTable = ({ currentJury, onEdit, onSave, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(currentJury.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const jurys = currentJury.slice(indexOfFirstItem, indexOfLastItem);
    const getDownloadButton = (jury) => {
        
        const fileNameActa = `P3 ACTA Nº ${formatNumberWithZero(jury.id)}.pdf`;
        const fileNameCarta = `P3 CARTA Nº ${formatNumberWithZero(jury.id)}.pdf`;
        const fileNameCartaMultiple = `P3 CARTA MULTIPLE Nº ${formatNumberWithZero(jury.id)}.pdf`;
        
        return (
            <>
                <DownloadDocs
                    infoStepTable={jury}
                    PdfDocument={PdfThreeA}
                    institutionalInfo={info}
                    fileName={fileNameActa}
                    fields = {{ numero_folio: 1, acta_reunion: 1,  }}
                />
                <DownloadDocs
                    infoStepTable={jury}
                    institutionalInfo={info}
                    PdfDocument={PdfThreeC}
                    fileName={fileNameCarta}
                    
                />
                <DownloadDocs
                    infoStepTable={jury}
                    PdfDocument={PdfThreeCM}
                    institutionalInfo={info}
                    fileName={fileNameCartaMultiple}
                    fields = {{ cart_multiple: 1 }}
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

                            <th>Presidente</th>
                            <th>Primer Miembro</th>
                            <th>Segundo Miembro</th>
                            <th>Accesitario</th>
                            <th>Asesor</th>
                            <th>Segundo Asesor</th>
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
                                    <td>{jury.president ? `${jury.president.firstNames || ' '} ${jury.president.lastName || ' '}` : 'N/A'}</td>
                                    <td>{jury.firstMember ? `${jury.firstMember.firstNames || ' '} ${jury.firstMember.lastName || ' '}` : 'N/A'}</td>
                                    <td>{jury.secondMember ? `${jury.secondMember.firstNames || ' '} ${jury.secondMember.lastName || ' '}` : 'N/A'}</td>
                                    <td>{jury.accessory ? `${jury.accessory.firstNames || ' '} ${jury.accessory.lastName || ' '}` : 'N/A'}</td>
                                    <td>
                                        {jury.projectApprovalStepTwo?.adviser
                                            ? `${jury.projectApprovalStepTwo?.adviser.firstNames || ' '} ${jury.projectApprovalStepTwo?.adviser.lastName || ' '}`
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {jury.projectApprovalStepTwo?.coadviser
                                            ? `${jury.projectApprovalStepTwo?.coadviser.firstNames || ' '} ${jury.projectApprovalStepTwo?.coadviser.lastName || ' '}`
                                            : 'N/A'}
                                    </td>
                                    <td>{formatDate(jury.updatedAt)}</td>
                                    <td>
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
