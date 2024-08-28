import { redirect, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clientAxios from "../../config/axios";
import Alerta from "../../components/Alerta";

function ConfirmAccount() {
	const [alert, setAlert] = useState({});
	const [cargado, setCargado] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const { token } = useParams();

	useEffect(() => {
		if (!token) {
			return redirect("/");
		}

		const confirmAccount = async () => {
			try {
				const url = `/veterinarios/confirmar/${token}`;
				const { data } = await clientAxios.get(url);
				setAlert({
					msg: data.msg,
					type: true,
				});
				setConfirm(true);
			} catch (e) {
				const {
					response: {
						data: { msg },
					},
				} = e;
				setAlert({
					msg,
					type: false,
				});
			}
			setCargado(true);
		};
		confirmAccount();
	}, []);

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-indigo-600 text-[40px] sm:text-6xl font-black text-center lg:text-left">
					Confirma tu cuenta y Administra tus{" "}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div className="flex flex-col gap-4 p-5 py-8 bg-white shadow-lg rounded">
				{cargado && <Alerta msg={alert.msg} type={alert.type} />}
				<nav className=" flex gap-4 flex-col text-center sm:flex-row justify-center lg:justify-end text-gray-500">
					<Link to="/" className=" hover:underline">
						Inicia Sesión
					</Link>
					<Link to="/registrar" className=" hover:underline">
						¿No tienes una cuenta? Registrate
					</Link>
				</nav>
			</div>
		</>
	);
}

export default ConfirmAccount;
