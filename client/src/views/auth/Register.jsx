import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../../components/auth/Input";
import Alerta from "../../components/Alerta";

function Register() {
	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [repet, setRepet] = useState("");
	const [errUser, setErrUser] = useState("");
	const [errEmail, setErrEmail] = useState("");
	const [errPass, setErrPass] = useState("");
	const [errRepet, setErrRepet] = useState("");
	const [alert, setAlert] = useState({});

	useEffect(() => {
		setErrUser("");
		setErrEmail("");
		setErrPass("");
		setErrRepet("");
		setAlert({});
	}, [user, email, pass, repet]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!user.trim()) {
			setErrUser("El usuario es obligatorio");
			return;
		}
		if (!email.trim()) {
			setErrEmail("El email es obligatorio");
			return;
		}
		if (!pass.trim()) {
			setErrPass("La contraseña es obligatorio");
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
			const URL = "http://localhost:4000/api/veterinarios/";
			await axios.post(URL, { nombre: user, email, password: pass });
			setAlert({
				msg: "Creado correctamente. Revisa tu email",
				type: true,
			});
		} catch (e) {
			setAlert({
				msg: e.response.data.msg,
				type: false,
			});
		}
	}

	function handleName(e) {
		setUser(e.target.value);
	}
	function handleEmail(e) {
		setEmail(e.target.value);
	}
	function handlePass(e) {
		setPass(e.target.value);
	}
	function handleRepet(e) {
		setRepet(e.target.value);
	}

	const { msg } = alert;
	return (
		<>
			<div className="flex items-center">
				<h1 className="text-indigo-600 text-[40px] sm:text-6xl font-black text-center lg:text-left">
					Crea tu cuenta y registra tus{" "}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div className="flex flex-col gap-4 p-5 py-8 bg-white shadow-lg rounded">
				{msg && <Alerta msg={alert.msg} type={alert.type} />}
				<form
					className="w-full max-w-[520px] mx-auto flex flex-col gap-8 "
					action=""
					method="POST"
					onSubmit={handleSubmit}
				>
					<Input
						name="Nombre"
						id="nombre"
						event={handleName}
						value={user}
						msg={errUser}
					/>
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
						value="Registrar Cuenta"
					/>
				</form>
				<nav className="flex gap-4 flex-col text-center sm:flex-row justify-center lg:justify-end text-gray-500">
					<Link to="/" className=" hover:underline">
						¿Ya tienes una cuenta? Logueate
					</Link>
					<Link to="/olvide-password" className=" hover:underline">
						Olvide mi password
					</Link>
				</nav>
			</div>
		</>
	);
}

export default Register;
