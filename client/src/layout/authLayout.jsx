import { Outlet } from "react-router-dom";

function Auth() {
	return (
		<>
			<main className="w-11/12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 h-dvh place-content-center gap-4">
				<Outlet />
			</main>
		</>
	);
}

export default Auth;
