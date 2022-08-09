import { useContext, useDebugValue } from "react";
import AuthContext from "../components/AuthContext";

const useAuth = () => {
    let { auth } = useContext(AuthContext);
    return useContext(AuthContext);
}

export default useAuth;