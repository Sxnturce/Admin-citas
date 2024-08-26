function Alerta({ msg, type }) {
	return (
		<>
			<div
				className={`w-full text-center p-1 rounded mx-auto text-white uppercase font-bold ${
					!type ? "bg-red-500" : "bg-green-500"
				}  `}
			>
				<p>{msg}</p>
			</div>
		</>
	);
}

export default Alerta;
