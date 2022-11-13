import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = ({ redirectLink, check }) => {
    return check ? <Outlet /> : <Navigate to={redirectLink} replace />;
}

export default PrivateRoutes;