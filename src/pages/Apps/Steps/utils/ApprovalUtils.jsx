// Función para extraer detalles de un reporte
export const getApprovalDetails = (project = {}) => {
    const id = project?.id ?? null;

    const student = project?.titleReservationStepOne?.student ?? null;
    const studentTwo = project?.titleReservationStepOne?.studentTwo ?? null;

    const observations = project?.observations ?? null;
    const articleNumber = project?.articleNumber ?? null;
    const secondArticleNumber = project?.secondArticleNumber ?? null;
    const referenceDate = project?.referenceDate ?? null;
    const meetsRequirements = project?.meetsRequirements ?? null;
    const updatedAt = project?.updatedAt ?? null;

    return {
        id,
        student,
        studentTwo,
        articleNumber,
        secondArticleNumber,
        meetsRequirements,
        referenceDate,
        observations,
        updatedAt,
    };
};
