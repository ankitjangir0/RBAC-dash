import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginSignup from "./components/Auth/SignupLogin";
import PrivateRoute from "./components/PrivateRoute";
import UserManagement from "./components/Dashboard/UserManagement";
import RoleManagement from "./components/Dashboard/RoleManagement";
import PermissionManagement from "./components/Dashboard/Permissions";


const App = () => {
    return (
      <Router>
        <Routes>
          
          <Route path="/login" element={<LoginSignup />} />
  
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
           
            <Route path="/" element={<UserManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="roles" element={<RoleManagement />} />
            <Route path="permissions" element={<PermissionManagement />} />
          </Route>
        </Routes>
      </Router>
    );
  };
  
  export default App;
  
