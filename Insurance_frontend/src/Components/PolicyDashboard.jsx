import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PolicyDashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ policyType: "", status: "" });
  const [newPolicy, setNewPolicy] = useState({
    policy_number: "",
    customer_name: "",
    policy_type: "Health",
    status: "Pending",
    premium_amount: "",
    start_date: "",
    end_date: "",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);

  const userRole = localStorage.getItem("role"); // Retrieve the role from localStorage

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = () => {
    axios
      .get("http://localhost:8000/api/policies")
      .then((response) => {
        setPolicies(Array.isArray(response.data) ? response.data : []);
        toast.success("Policies loaded successfully.");
      })
      .catch((error) => {
        console.error("Error fetching policies:", error);
        setPolicies([]);
        toast.error("Failed to load policy records.");
      });
  };

  const handleCreatePolicyChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const createPolicy = () => {
    axios
      .post("http://localhost:8000/api/policies", newPolicy)
      .then(() => {
        toast.success("Policy created successfully!");
        setShowCreateModal(false);
        fetchPolicies();
      })
      .catch((error) => {
        console.error("Error creating policy:", error);
        toast.error("Failed to create policy.");
      });
  };

  const handleEditPolicyChange = (e) => {
    const { name, value } = e.target;
    setEditPolicy({ ...editPolicy, [name]: value });
  };

  const updatePolicy = () => {
    axios
      .put(`http://localhost:8000/api/policies/${editPolicy.id}`, editPolicy)
      .then(() => {
        toast.success("Policy updated successfully!");
        setEditPolicy(null);
        fetchPolicies();
      })
      .catch((error) => {
        console.error("Error updating policy:", error);
        toast.error("Failed to update policy.");
      });
  };

  const handleDelete = (policyId) => {
    if (userRole !== "1") {
      toast.error("You do not have permission to delete policies.");
      return;
    }

    axios
      .delete(`http://localhost:8000/api/policies/${policyId}`)
      .then(() => {
        toast.success("Policy deleted successfully.");
        fetchPolicies();
      })
      .catch((error) => {
        console.error("Error deleting policy:", error);
        toast.error("Failed to delete policy.");
      });
  };

  const filteredPolicies = policies.filter((policy) => {
    return (
      (filters.policyType === "" || policy.policy_type === filters.policyType) &&
      (filters.status === "" || policy.status === filters.status) &&
      (searchTerm === "" ||
        policy.policy_number.includes(searchTerm) ||
        policy.customer_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Policy Dashboard</h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Policy Number or Customer Name"
          className="border px-4 py-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          name="policyType"
          className="border px-4 py-2 rounded"
          value={filters.policyType}
          onChange={(e) =>
            setFilters({ ...filters, policyType: e.target.value })
          }
        >
          <option value="">All Types</option>
          <option value="Health">Health</option>
          <option value="Life">Life</option>
          <option value="Auto">Auto</option>
          <option value="Property">Property</option>
          <option value="Travel">Travel</option>
        </select>
        <select
          name="status"
          className="border px-4 py-2 rounded"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
        {(userRole === "1" || userRole === "2") && (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => setShowCreateModal(true)}
          >
            Add Policy
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Policy Number</th>
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Policy Type</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Premium Amount</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              {(userRole === "admin" || userRole === "agent") && (
                <th className="border px-4 py-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map((policy) => (
              <tr key={policy.id}>
                <td className="border px-4 py-2">{policy.policy_number}</td>
                <td className="border px-4 py-2">{policy.customer_name}</td>
                <td className="border px-4 py-2">{policy.policy_type}</td>
                <td className="border px-4 py-2">{policy.status}</td>
                <td className="border px-4 py-2">{policy.premium_amount}</td>
                <td className="border px-4 py-2">{policy.start_date}</td>
                <td className="border px-4 py-2">{policy.end_date}</td>
                <td className="border px-4 py-2">
                  {(userRole === "1" || userRole === "2") && (
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                      onClick={() => setEditPolicy(policy)}
                    >
                      Edit
                    </button>
                  )}
                  {userRole === "1" && (
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(policy.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Policy</h2>
            <form>
              <input
                type="text"
                name="policy_number"
                placeholder="Policy Number"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.policy_number}
                onChange={handleCreatePolicyChange}
              />
              <input
                type="text"
                name="customer_name"
                placeholder="Customer Name"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.customer_name}
                onChange={handleCreatePolicyChange}
              />
              <select
                name="policy_type"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.policy_type}
                onChange={handleCreatePolicyChange}
              >
                <option value="Health">Health</option>
                <option value="Life">Life</option>
                <option value="Auto">Auto</option>
                <option value="Property">Property</option>
                <option value="Travel">Travel</option>
              </select>
              <select
                name="status"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.status}
                onChange={handleCreatePolicyChange}
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
              <input
                type="number"
                name="premium_amount"
                placeholder="Premium Amount"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.premium_amount}
                onChange={handleCreatePolicyChange}
              />
              <input
                type="date"
                name="start_date"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.start_date}
                onChange={handleCreatePolicyChange}
              />
              <input
                type="date"
                name="end_date"
                className="block w-full p-2 mb-4 border rounded"
                value={newPolicy.end_date}
                onChange={handleCreatePolicyChange}
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={createPolicy}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editPolicy && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Policy</h2>
            <form>
              <input
                type="text"
                name="policy_number"
                placeholder="Policy Number"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.policy_number}
                onChange={handleEditPolicyChange}
              />
              <input
                type="text"
                name="customer_name"
                placeholder="Customer Name"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.customer_name}
                onChange={handleEditPolicyChange}
              />
              <select
                name="policy_type"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.policy_type}
                onChange={handleEditPolicyChange}
              >
                <option value="Health">Health</option>
                <option value="Life">Life</option>
                <option value="Auto">Auto</option>
                <option value="Property">Property</option>
                <option value="Travel">Travel</option>
              </select>
              <select
                name="status"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.status}
                onChange={handleEditPolicyChange}
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
              <input
                type="number"
                name="premium_amount"
                placeholder="Premium Amount"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.premium_amount}
                onChange={handleEditPolicyChange}
              />
              <input
                type="date"
                name="start_date"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.start_date}
                onChange={handleEditPolicyChange}
              />
              <input
                type="date"
                name="end_date"
                className="block w-full p-2 mb-4 border rounded"
                value={editPolicy.end_date}
                onChange={handleEditPolicyChange}
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={updatePolicy}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setEditPolicy(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDashboard;
