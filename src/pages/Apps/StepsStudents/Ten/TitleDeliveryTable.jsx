import { showObservations } from "../utils/ShowObservations";

const TitleDeliveryTable = ({ titleDelivery }) => {
    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Estudiante(s)</th>
                            <th>Carrera</th>
                            <th>Fecha Actualización</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titleDelivery ? (
                            <tr key={titleDelivery?.id}>
                                <td>
                                    {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames ?? ''} {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName ?? ''}
                                    {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{titleDelivery?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(titleDelivery?.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(titleDelivery?.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center">
                                    El paso nueve aún no ha terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TitleDeliveryTable;
