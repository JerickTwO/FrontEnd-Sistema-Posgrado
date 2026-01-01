import { useState } from 'react';
import Pagination from '../Pagination';
import PdfStepEleven from '../Pdfs/pdf-11';
import { formatDate } from '../utils/Dates';
import DownloadDocs from '../utils/DownloadButton';

const FinalStepTable = ({ finalSteps, onEdit, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(finalSteps?.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFinalSteps = finalSteps?.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const getDownloadButton = (finalStep) => {
        const fileName = `final_step_${finalStep.id}.pdf`;
        return (
            <DownloadDocs infoStepTable={finalStep} PdfDocument={PdfStepEleven} institutionalInfo={info} fileName={fileName} />
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
                        {currentFinalSteps?.length > 0 ? (
                            currentFinalSteps.map((finalStep) => (
                                <tr key={finalStep?.id}>
                                    <td>
                                        {
                                            finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                ?.titleReservationStepOne?.student.firstNames
                                        }{' '}
                                        {
                                            finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                ?.titleReservationStepOne?.student.lastName
                                        }
                                        {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <span className="font-bold"> - </span>
                                                <br />
                                                {
                                                    finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames
                                                }{' '}
                                                {
                                                    finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName
                                                }
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                        {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <br />
                                                {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                    .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student.career?.name || 'N/A'}
                                    </td>
                                    <td>{finalStep?.meetRequirements ? 'Sí' : 'No'}</td>

                                    <td>{formatDate(finalStep?.updatedAt)}</td>

                                    <td className="flex gap-4 items-center justify-center">
                                        {getDownloadButton(finalStep)}

                                        <button onClick={() => onEdit(finalStep)} className="btn btn-sm btn-outline-primary">
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

export default FinalStepTable;
