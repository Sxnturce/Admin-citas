import { Link } from "react-router-dom";
import Input from "../../components/auth/Input";

function ForgotPassword() {
	return (
		<>
			<div className="flex items-center">
				<h1 className="text-indigo-600 text-[40px] sm:text-6xl font-black text-center lg:text-left">
					Recupera tu cuenta y no pierdas tus{" "}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div className="flex flex-col gap-4 p-5 py-8 bg-white shadow-lg rounded">
				<form
					className="w-full max-w-[520px] mx-auto flex flex-col gap-10 "
					action=""
					method="POST"
				>
					<Input name="Email" id="email" type="email" />
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
