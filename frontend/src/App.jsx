import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";


export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      </Routes>
    </>
  )
}