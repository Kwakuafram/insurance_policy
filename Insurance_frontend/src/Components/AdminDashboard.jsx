import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState({
    total_active_policies: 0,
    premiums_collected: 0,
    policies_expiring_soon: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard-data").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-2">
        <strong>Total Active Policies:</strong> {data.total_active_policies}
      </div>
      <div className="mb-2">
        <strong>Premiums Collected:</strong> ${data.premiums_collected}
      </div>
      <div>
        <strong>Policies Expiring Soon:</strong> {data.policies_expiring_soon}
      </div>
    </div>
  );
};

export default AdminDashboard;
