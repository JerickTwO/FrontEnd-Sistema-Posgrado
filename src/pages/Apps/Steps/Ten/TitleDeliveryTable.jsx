import { useState } from 'react';
import Pagination from '../Pagination';
import PdfStepTen from '../Pdfs/pdf-10';
import { formatDate } from '../utils/Dates';
import DownloadDocs from '../utils/DownloadButton';

const TitleDeliveryTable = ({ titleDeliveries, onEdit, info }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(titleDeliveries?.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTitleDeliveries = titleDeliveries?.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const getDownloadButton = (titleDelivery) => {
        const fileName = `title_delivery_${titleDelivery.id}.pdf`;
        return (
            <DownloadDocs infoStepTable={titleDelivery} PdfDocument={PdfStepTen} institutionalInfo={info} fileName={fileName} />
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
                        {currentTitleDeliveries?.length > 0 ? (
                            currentTitleDeliveries.map((titleDelivery) => (
                                <tr key={titleDelivery?.id}>
                                    <td>
                                        {
                                            titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                ?.titleReservationStepOne?.student.firstNames
                                        }{' '}
                                        {
                                            titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                                ?.titleReservationStepOne?.student.lastName
                                        }
                                        {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <span className="font-bold"> - </span>
                                                <br />
                                                {
                                                    titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.firstNames
                                                }{' '}
                                                {
                                                    titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                        .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo.lastName
                                                }
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                        {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.studentTwo && (
                                            <>
                                                <br />
                                                {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree
                                                    .projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree.projectApprovalStepTwo
                                            ?.titleReservationStepOne?.student.career?.name || 'N/A'}
                                    </td>
                                    <td>{titleDelivery?.meetRequirements ? 'Sí' : 'No'}</td>

                                    <td>{formatDate(titleDelivery?.updatedAt)}</td>

                                    <td className="flex gap-4 items-center justify-center">
                                        {getDownloadButton(titleDelivery)}

                                        <button onClick={() => onEdit(titleDelivery)} className="btn btn-sm btn-outline-primary">
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

export default TitleDeliveryTable;
