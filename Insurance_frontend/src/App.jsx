import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './Components/DashboardLayout';
import Login from './Components/Login';
import AdminSignup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import PolicyDashboard from './Components/PolicyDashboard';


const App = () => {
  return (
    <div>
      <ToastContainer /> {/* Toast notifications container */}

      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute> } />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<AdminSignup />} />
        <Route path="/policies" element={<ProtectedRoute><PolicyDashboard/></ProtectedRoute>}/>
     


      </Routes>
    </div>
  );
};

export default App;
