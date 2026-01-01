import { showObservations } from "../utils/ShowObservations";

const ResolutionTable = ({ resolution }) => {
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
                        {resolution ? (
                            <tr key={resolution?.id}>
                                <td>
                                    {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.studentCode || 'N/A'}
                                    {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <>
                                            <br />
                                            {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.studentCode || 'N/A'}
                                        </>
                                    )}
                                </td>

                                <td>
                                    {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.firstNames ?? ''} {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.lastName ?? ''}
                                    {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo && (
                                        <p>
                                            {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.firstNames ?? ''} {resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo?.lastName ?? ''}
                                        </p>
                                    )}
                                </td>
                                <td>{resolution?.pastingApprovalStepEight?.thesisApprovalStepSeven?.juryNotificationsStepSix?.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student?.career?.name || 'N/A'}</td>

                                <td>{new Date(resolution?.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-success" onClick={() => showObservations(resolution?.observations)}>
                                        Observaciones
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center">
                                    El paso ocho aún no ha terminado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResolutionTable;
