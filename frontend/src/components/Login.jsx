import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";
import { Link } from "react-router";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, isAuthenticated } = useAuth();
  console.log("Login Auth: ", isAuthenticated);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(formData);
      if (response.status === 200 && response.success === true) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Login Error: ", error);
      toast.error("Login failed! please try again.");
      setErrors(error?.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("Errors: ", errors);
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold text-dark mb-2">Welcome Back</h1>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* General Error Alert */}
                {errors?.non_field_errors && (
                  <div
                    className="alert alert-danger d-flex align-items-center mb-4 rounded-3 border-0"
                    role="alert"
                  >
                    <svg
                      className="bi flex-shrink-0 me-2"
                      width="16"
                      height="16"
                      role="img"
                      aria-label="Danger:"
                    >
                      <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>{errors?.non_field_errors[0]}</div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate
                >
                  {/* Email Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-dark"
                    >
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 rounded-start-3">
                        <AiOutlineMail className="text-muted" size={18} />
                      </span>
                      <input
                        type="email"
                        className={`form-control border-start-0 rounded-end-3 py-3 ${
                          errors?.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors?.email && (
                        <div className="invalid-feedback">
                          {errors?.email[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold text-dark"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 rounded-start-3">
                        <AiOutlineLock className="text-muted" size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control border-start-0 rounded-end-3 py-3 ${
                          errors?.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        className="btn btn-outline-light border-start-0 rounded-end-3"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderColor: "#dee2e6",
                        }}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible
                            className="text-muted"
                            size={18}
                          />
                        ) : (
                          <AiOutlineEye className="text-muted" size={18} />
                        )}
                      </button>
                      {errors?.password && (
                        <div className="invalid-feedback">
                          {errors?.password[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="rememberMe"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/send-forget-password-email"
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 rounded-3 fw-semibold"
                    disabled={isLoading}
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
