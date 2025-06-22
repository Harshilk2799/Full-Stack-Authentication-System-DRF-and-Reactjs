import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/AuthServices";
import { useNavigate } from "react-router";

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(isAuthenticated);
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);

        const response = await axiosInstance.get("profile/");
        console.log(response.data);
        setUserProfile(response.data);
      } catch (error) {
        // Only navigate to login if it's an auth-related error
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchUser();
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {userProfile && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title mb-0">User Dashboard</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>First Name:</strong> {userProfile.first_name}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Last Name:</strong> {userProfile.last_name}
                </p>
              </div>
              <div className="col-12">
                <p>
                  <strong>Email:</strong> {userProfile.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
