export const getNotificationsDetails = (notifications = {}) => {
    const id = notifications?.id ?? null;

    const student = notifications.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.student ?? null;
    const studentTwo = notifications.constancyThesisStepFive?.reportReviewStepFour?.juryAppointmentStepThree?.projectApprovalStepTwo?.titleReservationStepOne?.studentTwo ?? null;

    const observations = notifications?.observations ?? null;
    const futDate = notifications?.futDate ?? null;
    const deanResolution = notifications?.deanResolution ?? null
    const secondDeanResolution = notifications?.secondDeanResolution ?? null
    const day = notifications?.day ?? null
    const hour = notifications?.hour ?? null
    const location = notifications?.location ?? null
    const articleNumber = notifications?.articleNumber ?? null
    const reg = notifications?.reg ?? null
    const meetRequirements = notifications?.meetRequirements ?? null;
    const memorandoMult = notifications?.memorandoMult ?? null;
    const additionalInputs = notifications?.additionalInputs ?? null;
    const updatedAt = notifications?.updatedAt ?? null;

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
        memorandoMult,
        hour,
        reg,
        location,
        futDate,
        articleNumber,
        updatedAt,
    };
};
