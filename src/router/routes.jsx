import LoginCover from '../pages/Authentication/LoginCover';
import RecoverIdCover from '../pages/Authentication/RecoverIdCover';
import Teachers from '../pages/Apps/Teacher/Teachers';
import ThesisAdvisory from '../pages/Apps/ThesisAdvisory';
import { ProtectedRoute, StudentRoute } from '../security/ProtectedRoute';
import Profile from '../pages/Users/Profile';
import Info from '../pages/InstitutionalInfo'
import Progress from '../pages/Progress';
import ProgressStudents from '../pages/ProgressStudent';
import Students from '../pages/Apps/Student/Students';
import Error from '../components/Error';
// <--Admin Imports-->


import Constancy from '../pages/Apps/Steps/One/TitleReservation';
import ProjectAproval from '../pages/Apps/Steps/Two/ProjectApproval';
import JuryAppointment from '../pages/Apps/Steps/Three/JuryAppointment';
import ReportReview from '../pages/Apps/Steps/Four/ReportReview';
import ConstancyThesis from '../pages/Apps/Steps/Five/ConstancyThesis';
import JuryNotifications from '../pages/Apps/Steps/Six/JuryNotifications';
import ThesisApproval from '../pages/Apps/Steps/Seven/ThesisApproval';
import PastingApproval from '../pages/Apps/Steps/Eight/PastingApproval';
import JuryRecomposition from '../pages/Apps/Steps/Extra/JuryRecomposition';
import ChangeAdvisor from '../pages/Apps/Steps/Extra/ChangeAdvisor';
import PassageExpansion from '../pages/Apps/Steps/Extra/PassageExpansion';
// <--End Admin Imports-->

// <--Students Imports-->
import ConstancyStudents from '../pages/Apps/StepsStudents/One/TitleReservation';
import ProjectApprovalStudents from '../pages/Apps/StepsStudents/Two/ProjectApproval';
import JuryAppointmentStudents from '../pages/Apps/StepsStudents/Three/JuryAppointment';
import ReportReviewStudents from '../pages/Apps/StepsStudents/Four/ReportReview';
import ConstancyThesisStudents from '../pages/Apps/StepsStudents/Five/ConstancyThesis';
import JuryNotificationsStudents from '../pages/Apps/StepsStudents/Six/JuryNotification';
import ThesisApprovalStudents from '../pages/Apps/StepsStudents/Seven/ThesisApproval';
import PastingApprovalStudents from '../pages/Apps/StepsStudents/Eight/PastingApproval';
// <--End Students Imports-->

import AuthRoute from '../security/AuthRoute ';

const routes = [
    // Ruta de inicio de sesión protegida
    {
        path: '/auth/inicio-sesion',
        element: (
            <AuthRoute>
                <LoginCover />
            </AuthRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/auth/cambiar-contrasena',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    // perfil
    {
        path: '/usuario/perfil',
        element: <Profile />,
    },
    ///---INICIO----------------------------------------------------------------/////

    ////////
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Info />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/estudiantes',
        element: (
            <ProtectedRoute>
                <Students />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/docentes',
        element: (
            <ProtectedRoute>
                <Teachers />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/reserva-de-titulo',
        element: (
            <ProtectedRoute>
                <Constancy />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/filtro-de-similitud',
        element: (
            <ProtectedRoute>
                <ProjectAproval />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/revision-de-tesis',
        element: (
            <ProtectedRoute>
                <JuryAppointment />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/filtro-de-similitud-dos',
        element: (
            <ProtectedRoute>
                <ReportReview />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/extra/cambio-de-asesor',
        element: (
            <ProtectedRoute>
                <ChangeAdvisor />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/extra/ampliacion-de-proceso',
        element: (
            <ProtectedRoute>
                <PassageExpansion />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/extra/recomposicion-de-jurados',
        element: (
            <ProtectedRoute>
                <JuryRecomposition />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/presentacion-de-informe',
        element: (
            <ProtectedRoute>
                <ConstancyThesis />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/revision-de-informe',
        element: (
            <ProtectedRoute>
                <JuryNotifications />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/aprobacion-de-tesis',
        element: (
            <ProtectedRoute>
                <ThesisApproval />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/aprobacion-de-empastados',
        element: (
            <ProtectedRoute>
                <PastingApproval />
            </ProtectedRoute>
        ),
    },
    // Estudiantes
    {
        path: 'apps/paso-estudiante/reserva-de-titulo',
        element: (
            <StudentRoute>
                <ConstancyStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/filtro-de-similitud',
        element: (
            <StudentRoute>
                <ProjectApprovalStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/revision-de-tesis',
        element: (
            <StudentRoute>
                <JuryAppointmentStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/filtro-de-similitud-dos',
        element: (
            <StudentRoute>
                <ReportReviewStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/presentacion-de-informe',
        element: (
            <StudentRoute>
                <ConstancyThesisStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/revision-de-informe',
        element: (
            <StudentRoute>
                <JuryNotificationsStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/aprobacion-de-tesis',
        element: (
            <StudentRoute>
                <ThesisApprovalStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/aprobacion-de-empastados',
        element: (
            <StudentRoute>
                <PastingApprovalStudents />
            </StudentRoute>
        ),
    },
    // Estudiantes Fin
    {
        path: 'apps/paso-estudiante/asesoria-tesis',
        element: (
            <ProtectedRoute>
                <ThesisAdvisory />
            </ProtectedRoute>
        ),
    },
    {
        path: '/progreso-estudiante',
        element: (
            <StudentRoute>
                <ProgressStudents />
            </StudentRoute>
        ),
    },

    ///---FIN----------------------------------------------------------------/////
    {
        path: '/progreso',
        element: <Progress />,
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
