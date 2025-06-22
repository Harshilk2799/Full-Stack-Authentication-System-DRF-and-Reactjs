import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router";

function Registration() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await register(formData);
      if (response.status === 201) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold text-dark mb-2">Create Account</h1>
                  <p className="text-muted">Sign up to get started</p>
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
                  {/* Name Fields Row */}
                  <div className="row mb-4">
                    {/* First Name */}
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label
                        htmlFor="firstName"
                        className="form-label fw-semibold text-dark"
                      >
                        First Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 rounded-start-3">
                          <AiOutlineUser className="text-muted" size={18} />
                        </span>
                        <input
                          type="text"
                          className={`form-control border-start-0 rounded-end-3 py-3 ${
                            errors?.first_name ? "is-invalid" : ""
                          }`}
                          id="firstName"
                          name="first_name"
                          placeholder="First name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                        {errors?.first_name && (
                          <div className="invalid-feedback">
                            {errors?.first_name[0]}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <label
                        htmlFor="lastName"
                        className="form-label fw-semibold text-dark"
                      >
                        Last Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 rounded-start-3">
                          <AiOutlineUser className="text-muted" size={18} />
                        </span>
                        <input
                          type="text"
                          className={`form-control border-start-0 rounded-end-3 py-3 ${
                            errors?.last_name ? "is-invalid" : ""
                          }`}
                          id="lastName"
                          name="last_name"
                          placeholder="Last name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                        {errors?.last_name && (
                          <div className="invalid-feedback">
                            {errors?.last_name[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

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
                        className={`form-control border-start-0 border-end-0 py-3 ${
                          errors?.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        placeholder="Create a password"
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

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold text-dark"
                    >
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 rounded-start-3">
                        <AiOutlineLock className="text-muted" size={18} />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password2"
                        className={`form-control border-start-0 border-end-0 py-3 ${
                          errors?.password2 ? "is-invalid" : ""
                        }`}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                      />
                      <button
                        className="btn btn-outline-light border-start-0 rounded-end-3"
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderColor: "#dee2e6",
                        }}
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible
                            className="text-muted"
                            size={18}
                          />
                        ) : (
                          <AiOutlineEye className="text-muted" size={18} />
                        )}
                      </button>
                      {errors?.password2 && (
                        <div className="invalid-feedback">
                          {errors?.password2[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeTerms"
                        required
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="agreeTerms"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-decoration-none text-primary fw-semibold"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-decoration-none text-primary fw-semibold"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
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
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      Sign in
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

export default Registration;
