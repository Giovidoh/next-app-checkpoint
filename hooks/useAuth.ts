import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider/AuthContext";

const useAuth = () => useContext(AuthContext);
export default useAuth;
