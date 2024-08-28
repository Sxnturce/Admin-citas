import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import clientAxios from "../../config/axios";
import Alerta from "../../components/Alerta";
import Input from "../../components/auth/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setErrEmail("");
    setErrPass("");
    setAlert({});
  }, [email, pass]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setErrEmail("El email es obligatorio");
      return;
    }
    if (!pass.trim()) {
      setErrPass("La contraseña es obligatorio");
      return;
    }

    if (pass.trim().length <= 6) {
      setErrPass("La contraseña es muy corta");
      return;
    }

    try {
      const { data } = await clientAxios.post("/veterinarios/login", {
        correo: email,
        password: pass,
      });
      localStorage.setItem("apv_token", data.token);
      navigate("/admin");
      console.log("Todo bien");
    } catch (e) {
      const {
        response: {
          data: { msg },
        },
      } = e;
      if (e.status === 404) {
        setErrEmail(msg);
        return;
      }
      if (e.status === 403) {
        setErrPass(msg);
        return;
      }
      if (e.status === 401) {
        setAlert({ msg, type: false });
        return;
      }
      setAlert({ msg, type: false });
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePass(e) {
    setPass(e.target.value);
  }
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-indigo-600 text-[40px] sm:text-6xl font-black text-center lg:text-left">
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 p-5 py-8 bg-white shadow-lg rounded">
        {alert.msg && <Alerta msg={alert.msg} type={alert.type} />}
        <form
          className="w-full max-w-[520px] mx-auto flex flex-col gap-10 "
          action=""
          method="POST"
          onSubmit={handleSubmit}
        >
          <Input
            name="Email"
            id="email"
            type="email"
            event={handleEmail}
            value={email}
            msg={errEmail}
          />
          <Input
            name="Contraseña"
            id="password"
            type="password"
            event={handlePass}
            value={pass}
            msg={errPass}
          />
          <input
            className="bg-indigo-600 text-white uppercase font-bold p-2 rounded hover:bg-indigo-800 hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>
        <nav className="flex gap-4 flex-col text-center sm:flex-row justify-center lg:justify-end text-gray-500">
          <Link to="registrar" className=" hover:underline">
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link to="olvide-password" className=" hover:underline">
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Login;
