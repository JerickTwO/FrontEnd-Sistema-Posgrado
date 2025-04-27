import { Navigate } from 'react-router';
const AuthRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AuthRoute;
