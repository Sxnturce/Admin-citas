import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./layout/authLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ConfirmAccount from "./views/auth/ConfirmAccount";
import ForgotPassword from "./views/auth/ForgotPassword";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route index element={<Login />} />
					<Route path="registrar" element={<Register />} />
					<Route path="confirmar/:id" element={<ConfirmAccount />} />
					<Route path="olvide-password" element={<ForgotPassword />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
