// Función para extraer detalles de un reporte
export const getNotificationsDetails = (notifications = {}) => {
    const id = notifications?.id ?? null;

    const student = notifications.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student ?? null;
    const studentTwo = notifications.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo ?? null;

    const observations = notifications?.observations ?? null;
    const updatedAt = notifications?.updatedAt ?? null;
    const deanResolution = notifications?.deanResolution ?? null
    const secondDeanResolution = notifications?.secondDeanResolution ?? null
    const day = notifications?.day ?? null
    const hour = notifications?.hour ?? null
    const location = notifications?.location ?? null
    const articleNumber = notifications?.articleNumber ?? null
    const futDate = notifications?.futDate ?? null;
    const meetRequirements = notifications?.meetRequirements ?? null;
    const additionalInputs = notifications?.additionalInputs ?? null;



    return {
        id,
        student,
        studentTwo,
        meetRequirements,
        observations,
        deanResolution,
        secondDeanResolution,
        day,
        additionalInputs,
        hour,
        location,
        futDate,
        articleNumber,
        updatedAt,
    };
};
