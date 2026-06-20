import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getMe } from "../api/auth"
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { saveToken, setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { access_token } = await login(email, password);
            saveToken(access_token);
            const me = await getMe();
            setUser(me);
            navigate("/dashboard");
        }
        catch (err) {
            setError(err.response?.data?.detail || "Login Failed.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-sub">Sign in to your account</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label className="label">Email</label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />

                    <label className="label">Password</label>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}