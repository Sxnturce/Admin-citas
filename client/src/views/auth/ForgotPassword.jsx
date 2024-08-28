import { Link } from "react-router-dom";
import Input from "../../components/auth/Input";
import Alerta from "../../components/Alerta";
import clientAxios from "../../config/axios";
import { useEffect, useState } from "react";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState("");
	const [alert, setAlert] = useState({});

	useEffect(() => {
		setErr("");
		setAlert({});
	}, [email]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!email.trim()) {
			setErr("Requiere un email para realizar esta acción");
			return;
		}

		try {
			const URL = "/veterinarios/olvide-password/";
			const user = await clientAxios.post(URL, {
				email,
			});
			const {
				data: { msg },
			} = user;
			setAlert({
				msg,
				type: true,
			});
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
	}

	function handleChange(e) {
		setEmail(e.target.value);
	}

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-indigo-600 text-[40px] sm:text-6xl font-black text-center lg:text-left">
					Recupera tu cuenta y no pierdas tus{" "}
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
						event={handleChange}
						value={email}
						msg={err}
					/>
					<input
						className="bg-indigo-600 text-white uppercase font-bold p-2 rounded hover:bg-indigo-800 hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer"
						type="submit"
						value="Enviar información"
					/>
				</form>
				<nav className="flex gap-4 flex-col text-center sm:flex-row justify-center lg:justify-end text-gray-500">
					<Link to="/" className=" hover:underline">
						¿Ya tienes una cuenta? Logueate
					</Link>
					<Link to="/registrar" className=" hover:underline">
						¿No tienes una cuenta? Registrate
					</Link>
				</nav>
			</div>
		</>
	);
}

export default ForgotPassword;
