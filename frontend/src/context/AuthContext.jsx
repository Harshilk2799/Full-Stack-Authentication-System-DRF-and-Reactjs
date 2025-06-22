import { createContext, useContext, useState } from "react";
import axiosInstance from "../services/AuthServices";

export const AuthContextData = createContext();

export function useAuth() {
  return useContext(AuthContextData);
}

function AuthContext({ children }) {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("access_token") ? true : false;
  });

  async function register(registerData) {
    try {
      const response = await axiosInstance.post("register/", registerData);
      console.log("Auth Response: ", response.data);
      return {
        status: 201,
        success: true,
        message: response.data.msg,
      };
    } catch (error) {
      throw error;
    }
  }

  async function login(loginData) {
    try {
      const response = await axiosInstance.post("login/", loginData);
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("access_token", response.data.token.access);
        localStorage.setItem("refresh_token", response.data.token.refresh);
        setUser(loginData.email);
        console.log("isAuthenticated: ", isAuthenticated);
        setIsAuthenticated(true);
        console.log("isAuthenticated: ", isAuthenticated);
        return {
          status: response.status,
          success: true,
          message: response.data.msg,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async function change_password(passwordData) {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await axiosInstance.post(
          "changepassword/",
          passwordData
        );
        console.log("Response: ", response.data);
        return {
          success: true,
          data: response.data,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async function send_forget_password_email(email) {
    try {
      const response = await axiosInstance.post(
        "send-reset-password-email/",
        email
      );
      console.log(response.status);

      return {
        success: true,
        status: response.status,
        message: response.data.msg,
      };
    } catch (error) {
      throw error;
    }
  }

  async function forget_password(forgetData) {
    try {
      const response = await axiosInstance.post(
        `reset-password/${forgetData.uid}/${forgetData.token}/`,
        forgetData
      );
      console.log(response);
      return {
        success: true,
        status: response.status,
        message: response.data.msg,
      };
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.clear();
    setUser("");
  }

  return (
    <AuthContextData.Provider
      value={{
        user,
        register,
        login,
        logout,
        change_password,
        send_forget_password_email,
        forget_password,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContextData.Provider>
  );
}

export default AuthContext;
