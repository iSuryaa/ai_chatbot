import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOpen, EyeClosed } from "../components/Icon";
import { forgot } from "../api/auth";

export default function Forgot() {
  const [form, setForm] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [forgotErrors, setForgotErrors] = useState({});
  const [forgotMsg, setForgotMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfmPassword, setShowCnfmPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await forgot(form);
      setForgotMsg(data.message);
      setForgotErrors({});

      setTimeout(() => {
        navigate("/");
        setForgotMsg("")
      }
        , 3000);
    } catch (err) {
      setForgotErrors(err.response.data.errors);
    }
  };

  return (
    <div className="forgotPage">
      <div className="auth-logo">
        <img src="images/virallens.png" alt="" />
      </div>
      <div className="wrapper">
        <div className="form forgot">
          <header >Forget Password</header>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                className={forgotErrors.email ? "danger-border" : ""}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {forgotErrors?.email && <p className="danger-text">{forgotErrors?.email}</p>}
            </div>
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className={forgotErrors.newPassword ? "danger-border" : ""}
                  required
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? EyeClosed : EyeOpen}
                </button>
              </div>
              {forgotErrors?.newPassword && <p className="danger-text">{forgotErrors?.newPassword}</p>}
            </div>
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showCnfmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className={forgotErrors.confirmPassword ? "danger-border" : ""}
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
              {forgotErrors?.confirmPassword && <p className="danger-text">{forgotErrors?.confirmPassword}</p>}
            </div>
            {forgotMsg && <p className="success-text">{forgotMsg}</p>}
            <Link to="/">← Back to login </Link>
            <input type="submit" value="Change Password" />
          </form>
        </div>
      </div>
    </div>
  );
}
