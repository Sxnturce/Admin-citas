import { useContext } from "react";
import AuthContext from "../context/AuthProvides";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
