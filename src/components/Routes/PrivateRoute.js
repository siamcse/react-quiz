import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>
    }
    if (currentUser) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;