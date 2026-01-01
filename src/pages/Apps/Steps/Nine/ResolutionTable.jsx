import { useState } from 'react';
import Pagination from '../Pagination';
import PdfStepNine from '../Pdfs/pdf-9';
import { formatDate } from '../utils/Dates';
import DownloadDocs from '../utils/DownloadButton';

const ResolutionTable = ({ resolutions, onEdit, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(resolutions?.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResolutions = resolutions?.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const getDownloadButton = (resolution) => {
        const fileName = `resolution_${resolution.id}.pdf`;
        return (
            <DownloadDocs infoStepTable={resolution} PdfDocument={PdfStepNine} institutionalInfo={info} fileName={fileName} />
            
        );
    };
    
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Estudiante(s)</th>
                            <th>Código(s)</th>
                            <th>Carrera</th>
                            <th>Cumple Requisitos</th>
                            <th>Última Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-white-dark">
                        {currentResolutions?.length > 0 ? (
                            currentResolutions.map((resolution) => (
                                <tr key={resolution?.id}>
                                    <td>
                                        {
                                            resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                ?.titleReservationStepOne?.student.firstNames
                                        }{' '}
                                        {
                                            resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                ?.titleReservationStepOne?.student.lastName
                                        }
                                        {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <span className="font-bold"> - </span>
                                                <br />
                                                {
                                                    resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames
                                                }{' '}
                                                {
                                                    resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName
                                                }
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                        {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <br />
                                                {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                    .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student.career?.name || 'N/A'}
                                    </td>
                                    <td>{resolution?.meetRequirements ? 'Sí' : 'No'}</td>

                                    <td>{formatDate(resolution?.updatedAt)}</td>

                                    <td className="flex gap-4 items-center justify-center">
                                        {getDownloadButton(resolution)}

                                        <button onClick={() => onEdit(resolution)} className="btn btn-sm btn-outline-primary">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-2 text-center">
                                    No hay campos disponibles
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

export default ResolutionTable;
