import { useState } from "react";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { EyeOpen, EyeClosed } from "../components/Icon";
import { login, signup } from "../api/auth";

export default function Login() {
  const initialForm = { email: "", password: "", name: "", confirmPassword: "" };
  const [form, setForm] = useState(initialForm);
  const [active, setActive] = useState(true);
  const [signUpErrors, setSignUpErrors] = useState({});
  const [signUpMsg, setSignUpMsg] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfmPassword, setShowCnfmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignUpErrors({});
    setLoading(true);

    // Client-side validation
    const errors = {};
    if (form.name.length < 5) errors.name = "Full name must be at least 5 characters long";
    if (!passwordRegex.test(form.password)) errors.password = "Password must be at least 8 characters, include uppercase, number, and symbol";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const data = await signup(form);
      saveToken(data.token);
      setSignUpMsg(data.message);
      setSignUpErrors({});
      setForm(initialForm);
      setTimeout(() => {
        setActive(true);
        setSignUpMsg("")
      }, 3000);
    } catch (err) {
      setSignUpErrors(err?.response?.data?.errors);
    } finally {
    setLoading(false);
    }
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      saveToken(data.token);
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } catch (err) {
      console.error("Login failed:", err);
      setLoginErrors(err?.response?.data?.errors);
    } finally {
    setLoading(false);
    }
  };


  return (
    <section >
      <div className="auth-logo">
        <img src="images/virallens.png" alt="" />
      </div>
      <div className={`wrapper ${active ? "active" : ""}`}>
        {/* Signup Form */}
        <div className="form signup">
          <header onClick={() => {setActive(false); setForm(initialForm)}}>Create Account</header>
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                className={signUpErrors.name ? "danger-border" : ""}
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {signUpErrors?.name && <p className="danger-text">{signUpErrors?.name}</p>}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                className={signUpErrors.email ? "danger-border" : ""}
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {signUpErrors?.email && <p className="danger-text">{signUpErrors?.email}</p>}
            </div>
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  className={signUpErrors.password ? "danger-border" : ""}
                  required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? EyeClosed : EyeOpen}
                </button>
              </div>
              {signUpErrors?.password && <p className="danger-text">{signUpErrors?.password}</p>}
            </div>
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showCnfmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={signUpErrors.confirmPassword ? "danger-border" : ""}
                  value={form.confirmPassword}
                  required
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowCnfmPassword(!showCnfmPassword)}
                >
                  {showCnfmPassword ? EyeClosed : EyeOpen}
                </button>
              </div>
              {signUpErrors?.confirmPassword && <p className="danger-text">{signUpErrors?.confirmPassword}</p>}
            </div>
            {signUpErrors?.general && <p className="danger-text">{signUpErrors?.general}</p>}
            {signUpMsg && <p className="success-text">{signUpMsg}</p>}
            <input type="submit"  value={loading ? "Signing Up..." : "Sign Up"} disabled={loading} />
          </form>
        </div>

        {/* Login Form */}
        <div className="form login">
          <header onClick={() => {setActive(true); setForm(initialForm)}}>Login</header>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={loginErrors.email ? "danger-border" : ""}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {loginErrors?.email && <p className="danger-text">{loginErrors?.email}</p>}
            </div>
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  className={loginErrors.password ? "danger-border" : ""}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? EyeClosed : EyeOpen}
                </button>
              </div>
              {loginErrors?.password && <p className="danger-text">{loginErrors?.password}</p>}
            </div>
            <Link to="/forgot">Forgot password?</Link>
            <input type="submit" value={loading ? "Signing In..." : "Sign In"} disabled={loading}/>
          </form>
        </div>
      </div>
    </section>
  );
}
