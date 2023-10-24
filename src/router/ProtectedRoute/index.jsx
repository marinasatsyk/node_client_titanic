/* eslint-disable react/prop-types */
import { Navigate } from 'react-router';

const ProtectedRoute = ({ id, children }) => {
    if (!id) {
        return <Navigate to="/user/login" replace />;
    }
    return children;
};

export default ProtectedRoute;