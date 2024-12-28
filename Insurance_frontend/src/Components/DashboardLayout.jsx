import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PolicyDashboard from "./PolicyDashboard"; // Importing the PolicyDashboard component

const DashboardLayout = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [userInitials, setUserInitials] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fullName = localStorage.getItem("name");

    if (fullName) {
      setUserName(fullName);
      const initials = fullName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
      setUserInitials(initials);
    } else {
      console.error("User data missing in localStorage");
      toast.error("User data missing. Please log in again.");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    toast.success("Logout successful");
    navigate("/");
    console.log("Logout");
  };

  const handlePolicyDashboard = () => {
    setActiveContent("policyDashboard"); // Change the active content to "policyDashboard"
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      <button onClick={handlePolicyDashboard} className="bg-blue-500 text-white py-2 px-4 rounded">Policy Dashboard</button>

      {activeContent === "policyDashboard" && <PolicyDashboard />} {/* Conditionally render the PolicyDashboard component */}
    </div>
  );
};

export default DashboardLayout;
