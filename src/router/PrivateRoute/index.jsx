/* eslint-disable react/prop-types */
import { Navigate } from 'react-router';

const RedirectRoute = ({ id, path, children  }) => {
    if (id) {
        return <Navigate to={path} replace />;
    }
    return children;
};

export default RedirectRoute;