// Función para extraer detalles de un reporte
export const getThesisDetails = (thesis = {}) => {
    const id = thesis?.id ?? null;

    const student = thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student ?? null;
    const studentTwo = thesis?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo ?? null;

    const observations = thesis?.observations ?? null;
    const meetsRequirements = thesis?.meetsRequirements ?? null;
    const updatedAt = thesis?.updatedAt ?? null;

    return {
        id,
        student,
        studentTwo,
        meetsRequirements,
        observations,
        updatedAt,
    };
};
