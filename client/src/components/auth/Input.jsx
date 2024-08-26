function Input({ type = "text", name, id, event, value, msg }) {
	return (
		<>
			<div className="flex flex-col gap-2">
				<label
					className="font-bold text-xl uppercase text-neutral-700"
					htmlFor={id}
				>
					{name}
				</label>
				<input
					onChange={event}
					className="p-[0.45rem] rounded-sm outline-none ring-offset-1 ring-1 ring-gray-400 focus:ring-2 focus:ring-indigo-600 transition-all ease-in-out duration-200"
					type={type}
					value={value}
					id={id}
					name={id}
					placeholder={type !== "password" ? `Ingrese su ${name}` : "*********"}
				/>
				{msg && <p className="text-[0.95rem] text-red-400">{msg}</p>}
			</div>
		</>
	);
}

export default Input;
