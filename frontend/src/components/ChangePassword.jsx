import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ChangePassword() {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const { change_password, user } = useAuth();
  console.log("User: ", user);
  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data: ", formData);

    try {
      const response = await change_password({
        password: formData.password,
        password2: formData.password2,
        user: user,
      });
      if (response.success) {
        toast.success("Change password successfully!");
        navigate("/");
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors);
    }
  }

  console.log("Change Password Errors: ", errors);
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Change Password</h3>

        {/* General Error Alert */}
        {errors?.non_field_errors && (
          <div className="alert alert-danger" role="alert">
            {errors.non_field_errors[0]}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Password Field */}
          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors?.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">New Password</label>
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              style={{ zIndex: "10" }}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors?.password && (
              <div className="invalid-feedback">{errors.password[0]}</div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-floating mb-4 position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${
                errors?.password2 ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              name="password2"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ zIndex: "10" }}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
            {errors?.password2 && (
              <div className="invalid-feedback">{errors.password2[0]}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
