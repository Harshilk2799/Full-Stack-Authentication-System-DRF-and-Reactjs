import { BrowserRouter, Routes, Route } from "react-router";
import AuthContext from "./context/AuthContext";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./components/ChangePassword";
import SendForgetPasswordEmail from "./components/SendForgetPasswordEmail";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/send-forget-password-email"
            element={<SendForgetPasswordEmail />}
          />
          <Route
            path="/forget-password/:uid/:token"
            element={<ForgetPassword />}
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
