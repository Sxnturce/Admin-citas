import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    async function authUser() {
      const token = localStorage.getItem("apv_token");
      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios.get("/veterinarios/perfil", config);
        setAuth(data);
      } catch (e) {
        console.log(e);
        setAuth({});
      }
    }
    authUser();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
