import { showObservations } from "../utils/ShowObservations";

const FinalStepTable = ({ finalStep }) => {
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
                        {finalStep ? (
                            <tr key={finalStep?.id}>
                                <td>
                                    {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames ?? ''} {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName ?? ''}
                                    {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{finalStep?.titleDeliveryStepTen?.resolutionStepNine?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(finalStep?.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(finalStep?.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center">
                                    El paso diez aún no ha terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinalStepTable;
