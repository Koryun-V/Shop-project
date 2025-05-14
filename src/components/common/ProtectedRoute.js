import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setRedirectPath } from "../../store/slices/authRedirect";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // կամ օգտագործիր Redux-ով
    const dispatch = useDispatch();
    const location = useLocation();

    if (!token) {
        dispatch(setRedirectPath(location.pathname)); // ⬅️ Պահում ենք օգտատիրոջ ուզած ուղին
        return <Navigate to="/" replace />; // կամ թողնում մոդալը բացվի Layout-ում
    }

    return children;
};

export default ProtectedRoute;
