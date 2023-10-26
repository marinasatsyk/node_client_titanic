/* eslint-disable react/prop-types */
import { Navigate } from 'react-router';

const RedirectRoute = ({ clientToken, path, children  }) => {
    if (clientToken) {
        return <Navigate to={path} replace />;
    }
    return children;
};

export default RedirectRoute;