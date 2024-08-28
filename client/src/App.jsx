import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./layout/authLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ConfirmAccount from "./views/auth/ConfirmAccount";
import ForgotPassword from "./views/auth/ForgotPassword";
import NewPass from "./views/auth/newPass";
import { AuthProvider } from "./context/AuthProvides";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Register />} />
            <Route path="confirmar/:token" element={<ConfirmAccount />} />
            <Route path="olvide-password" element={<ForgotPassword />} />
            <Route path="olvide-password/:token" element={<NewPass />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
