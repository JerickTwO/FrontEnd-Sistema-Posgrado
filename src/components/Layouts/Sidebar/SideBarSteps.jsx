const STUDENT_PREFIX = '/apps/paso-estudiante';
const ADMIN_PREFIX = '/apps/paso';

export const adminSteps = [
    { path: `${ADMIN_PREFIX}/constancia-de-filtro`, label: '1: Aprobación de Tesis' },
    { path: `${ADMIN_PREFIX}/aprobacion-de-proyecto`, label: '2: Designación de Jurados' },
    { path: `${ADMIN_PREFIX}/designacion-de-jurados`, label: '3: Sustentación de Tesis' },
    { path: `${ADMIN_PREFIX}/revision-de-reporte`, label: '4: Revision de Reporte' },
    { path: `${ADMIN_PREFIX}/constancia-de-tesis`, label: '5: Constancia de Tesis' },
    { path: `${ADMIN_PREFIX}/notificacion-de-jurados`, label: '6: Notificación de Jurados' },
    { path: `${ADMIN_PREFIX}/aprobacion-de-tesis`, label: '7: Aprobación de Tesis' },
    { path: `${ADMIN_PREFIX}/aprobacion-de-empastados`, label: '8: Aprobación de Empastados' },
];
export const studentSteps = [
    { path: `${STUDENT_PREFIX}/constancia-de-filtro`, label: '1: Aprobación de Tesis' },
    { path: `${STUDENT_PREFIX}/aprobacion-de-proyecto`, label: '2: Designación de Jurados' },
    { path: `${STUDENT_PREFIX}/designacion-de-jurados`, label: '3: Sustentación de Tesis' },
    { path: `${STUDENT_PREFIX}/revision-de-reporte`, label: '4: Revision de Reporte' },
    { path: `${STUDENT_PREFIX}/constancia-de-tesis`, label: '5: Constancia de Tesis' },
    { path: `${STUDENT_PREFIX}/notificacion-de-jurados`, label: '6: Notificación de Jurados' },
    { path: `${STUDENT_PREFIX}/aprobacion-de-tesis`, label: '7: Aprobación de Tesis' },
    { path: `${STUDENT_PREFIX}/aprobacion-de-empastados`, label: '8: Aprobación de Empastados' },
];

export const extraSteps = [
    { path: `${ADMIN_PREFIX}/extra/cambio-de-asesor`, label: '1: Cambio de Asesor' },
    { path: `${ADMIN_PREFIX}/extra/ampliacion-de-proceso`, label: '2: Ampliación de Proceso' },
    { path: `${ADMIN_PREFIX}/extra/recomposicion-de-jurados`, label: '3: Recomposición de Jurado' },
];
