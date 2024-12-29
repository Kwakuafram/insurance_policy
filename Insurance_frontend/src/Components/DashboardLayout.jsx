import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // Import the AdminDashboard component
import PolicyDashboard from "./PolicyDashboard";

const DashboardLayout = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [userInitials, setUserInitials] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fullName = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (fullName && role) {
      setUserName(fullName);
      const initials = fullName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
      setUserInitials(initials);

      // Map the role to a display name
      setUserRole(role === "1" ? "Admin" : role === "2" ? "Agent" : "User");
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
    localStorage.removeItem("role");
    toast.success("Logout successful");
    navigate("/");
    console.log("Logout");
  };

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <AdminDashboard />; // Render the AdminDashboard component

        case "policies":
          return <PolicyDashboard/>; 
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-50 bg-gray-800 text-white p-4">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
            {userInitials}
          </div>
          <div>
            <h2 className="text-lg font-bold">{userName}</h2>
            <p className="text-sm">{userRole}</p> {/* Display the role dynamically */}
          </div>
        </div>
        <nav>
          <button
            onClick={() => setActiveContent("dashboard")}
            className={`w-full text-left py-2 px-4 mb-2 rounded hover:bg-blue-500 ${
              activeContent === "dashboard" && "bg-blue-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveContent("policies")}
            className={`w-full text-left py-2 px-4 mb-2 rounded hover:bg-blue-500 ${
              activeContent === "policies" && "bg-blue-600"
            }`}
          >
            Policies
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 rounded hover:bg-red-500 bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6 bg-gray-100">{renderContent()}</main>
    </div>
  );
};

export default DashboardLayout;
