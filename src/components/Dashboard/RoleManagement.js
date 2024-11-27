import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Rolemanagment/RoleManagment.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ id: '', name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };



  const handleAddRole = (e) => {
    e.preventDefault();
    if (newRole.name && newRole.description) {
      setRoles([...roles, { id: Math.floor(10000 + Math.random() * 90000), ...newRole }]);
      setNewRole({ id: '', name: '', description: '' });
    }
  };

  // Edit an existing role
  const handleEditRole = (role) => {
    setNewRole(role);
    setIsEditing(true); 
  };

  // Save updated role
  const handleUpdateRole = (e) => {
    e.preventDefault();
    setRoles(
      roles.map((role) => (role.id === newRole.id ? { ...newRole } : role))
    );
    setNewRole({ id: '', name: '', description: '' }); 
    setIsEditing(false); 
  };

  // Delete a role
  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <motion.div
      className="role-management-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="role-management">
        <h1 className="page-title">Role Management</h1>


        <form
          className="role-form"
          onSubmit={isEditing ? handleUpdateRole : handleAddRole}
        >
          <input
            type="text"
            name="name"
            placeholder="Role Name"
            value={newRole.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Role Description"
            value={newRole.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Role' : 'Add Role'}
          </button>
        </form>




        <motion.table
          className="role-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditRole(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
};

export default RoleManagement;
