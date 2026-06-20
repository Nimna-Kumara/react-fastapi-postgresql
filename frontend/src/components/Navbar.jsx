import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <span className="navbar-brand">MyApp</span>
            {user && (
                <div className="navbar-right">
                    <span className="navbar-user">👤 {user.username}</span>
                    <button className="btn btn-ghost" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}