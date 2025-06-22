import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";

function SendForgetPasswordEmail() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { send_forget_password_email } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await send_forget_password_email({ email });
      console.log(response);
      if (response.status === 200 && response.success === true) {
        toast.success(
          "Password reset email sent successfully! Please check your inbox."
        );
        setEmail("");
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors || {});
    } finally {
      setIsLoading(false);
    }
  }
  console.log("Forget Password Error: ", errors);
  return (
    <>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100">
          <div className="col-12 col-md-6 col-lg-4 mx-auto">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="fas fa-lock fs-1 text-primary mb-3"></i>
                  <h2 className="card-title text-dark mb-2">
                    Forgot Password?
                  </h2>
                  <p className="text-muted">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
                </div>

                {errors?.non_field_errors && (
                  <div className="alert alert-danger" role="alert">
                    {errors?.non_field_errors[0]}
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email[0]}
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-2 mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Reset Link
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="mb-0 text-muted">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Back to Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendForgetPasswordEmail;
