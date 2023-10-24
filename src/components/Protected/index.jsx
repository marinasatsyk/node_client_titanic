import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const Protected = ({isLoggedIn  , children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


Protected.propTypes = {
    isLoggedIn:   PropTypes.bool,
    children: PropTypes.any 
}

export default Protected;