import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PublicRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();

    
    if (!currentUser) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />
};

export default PublicRoute;