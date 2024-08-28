import { redirect, useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import clientAxios from "../../config/axios";
import Alerta from "../../components/Alerta";
import Input from "../../components/auth/Input";
import Invalid from "../../components/auth/Invalid";

function NewPass() {
  const [alert, setAlert] = useState({});
  const [pass, setPass] = useState("");
  const [repet, setRepet] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errRepet, setErrRepet] = useState("");
  const [load, setLoad] = useState(false);
  const { token } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    if (!token) {
      redirect("/");
      return;
    }

    async function readToken() {
      try {
        const url = `/veterinarios/olvide-password/${token}`;
        await clientAxios.get(url);
        setLoad(true);
      } catch (e) {
        setLoad(false);
      }
    }
    readToken();
  }, []);

  useEffect(() => {
    setErrPass("");
    setErrRepet("");
  }, [pass, repet]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pass.trim()) {
      setErrPass("La contraseña es obligatorio");
      return;
    }

    if (pass.trim().length <= 6) {
      setErrPass("La contraseña es muy corta");
      return;
    }

    if (!repet.trim()) {
      setErrRepet("La contraseña es obligatoria");
      return;
    }

    if (repet.trim() !== pass.trim()) {
      setErrRepet("La contraseñas no coinciden");
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const client = await clientAxios.post(url, {
        password: pass,
      });
      const {
        data: { msg },
      } = client;
      setAlert({
        msg,
        type: true,
      });
      formRef.current.reset();
      reset();
    } catch (e) {
      console.log(e);
    }
  }

  function handlePass({ target: { value } }) {
    setPass(value);
  }
  function handleRepet({ target: { value } }) {
    setRepet(value);
  }

  function reset() {
    setPass("");
    setRepet("");
  }
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-indigo-600 text-[40px] sm:text-6xl font-black text-center lg:text-left">
          Cambia tu contraseña y registra a tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 p-5 py-8 bg-white shadow-lg rounded">
        {alert.msg && <Alerta msg={alert.msg} type={alert.type} />}
        {load ? (
          <form
            className="w-full max-w-[520px] mx-auto flex flex-col gap-8 "
            action=""
            method="POST"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <Input
              name="Contraseña"
              id="password"
              type="password"
              event={handlePass}
              value={pass}
              msg={errPass}
            />
            <Input
              name="Repetir Contraseña"
              id="repetPass"
              type="password"
              event={handleRepet}
              value={repet}
              msg={errRepet}
            />
            <input
              className="bg-indigo-600 text-white uppercase font-bold p-2 rounded hover:bg-indigo-800 hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer"
              type="submit"
              value="Cambiar password"
            />
          </form>
        ) : (
          <Invalid />
        )}
        <nav className="flex gap-4 flex-col text-center sm:flex-row justify-center lg:justify-end text-gray-500">
          <Link to="/" className=" hover:underline">
            Regresar al menu
          </Link>
        </nav>
      </div>
    </>
  );
}

export default NewPass;
