import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Promisses/Permissions.css';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState({
    id: '',
    name: '',
    role: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPermission({ ...newPermission, [name]: value });
  };

 
  const handleAddPermission = (e) => {
    e.preventDefault();
    if (newPermission.name && newPermission.role && newPermission.description) {
      setPermissions([
        ...permissions,
        { id: Math.floor(10000 + Math.random() * 90000), ...newPermission },
      ]);
      setNewPermission({ name: '', role: '', description: '' }); 
    }
  };

 
  const handleEditPermission = (permission) => {
    setNewPermission(permission);
    setIsEditing(true); 
  };

  
  const handleUpdatePermission = (e) => {
    e.preventDefault();
    setPermissions(
      permissions.map((permission) =>
        permission.id === newPermission.id ? { ...newPermission } : permission
      )
    );
    setNewPermission({ name: '', role: '', description: '' }); 
    setIsEditing(false); 
  };

 
  const handleDeletePermission = (id) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  return (
    <motion.div
      className="permissions-management-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="permissions-management">
        <h1 className="page-title">Permissions Management</h1>

       
        <form
          className="permissions-form"
          onSubmit={isEditing ? handleUpdatePermission : handleAddPermission}
        >
          <input
            type="text"
            name="name"
            placeholder="Permission Name"
            value={newPermission.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newPermission.role}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newPermission.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Permission' : 'Add Permission'}
          </button>
        </form>



        <motion.table
          className="permissions-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Permission Name</th>
              <th>Role</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td>{permission.id}</td>
                <td>{permission.name}</td>
                <td>{permission.role}</td>
                <td>{permission.description}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditPermission(permission)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletePermission(permission.id)}
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

export default Permissions;
