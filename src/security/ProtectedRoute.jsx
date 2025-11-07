import { Navigate } from 'react-router';
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to="/auth/inicio-sesion" />;
    }
    if (user.rol?.name !== 'ROLE_ADMIN') {
        return <Navigate to="/" />;
    }

    return children;
};
const StudentRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to="/auth/inicio-sesion" />;
    }
    if (user.rol?.name !== 'ROLE_ESTUDIANTE') {
        return <Navigate to="/" />;
    }
    return children;
};

export { ProtectedRoute, StudentRoute };