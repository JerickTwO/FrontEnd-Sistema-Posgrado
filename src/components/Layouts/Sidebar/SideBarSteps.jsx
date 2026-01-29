const STUDENT_PREFIX = '/apps/paso-estudiante';
const ADMIN_PREFIX = '/apps/paso';

const commonSteps = [
    { path: '/reserva-de-titulo', label: '1: Reserva de título' },
    { path: '/filtro-de-similitud', label: '2: Filtro de similitud' },
    { path: '/revision-de-tesis', label: '3: Revisión y aprobación de Proyecto' },
    { path: '/filtro-de-similitud-dos', label: '4: Filtro de similitud II' },
    { path: '/presentacion-de-informe', label: '5: Presentación de Informe' },
    { path: '/revision-de-informe', label: '6: Revisión de Informe' },
    { path: '/aprobacion-de-informe', label: '7: Aprobación de Informe' },
    { path: '/solicitud-de-tesis', label: '8: Solicitud de Tesis' },
    { path: '/filtro-de-similitud-tres', label: '9: Filtro de similitud III' },
    { path: '/constancia-de-empastados', label: '10: Constancia de Empastados' },
    { path: '/emision-de-tesis', label: '11: Emisión de Tesis' },
];

export const adminSteps = commonSteps.map(step => ({
    path: `${ADMIN_PREFIX}${step.path}`,
    label: step.label,
}));

export const studentSteps = commonSteps.map(step => ({
    path: `${STUDENT_PREFIX}${step.path}`,
    label: step.label,
}));

export const extraSteps = [
    { path: `${ADMIN_PREFIX}/extra/cambio-de-asesor`, label: '1: Cambio de Asesor' },
    { path: `${ADMIN_PREFIX}/extra/ampliacion-de-proceso`, label: '2: Ampliación de Proceso' },
    { path: `${ADMIN_PREFIX}/extra/recomposicion-de-jurados`, label: '3: Recomposición de Jurado' },
];