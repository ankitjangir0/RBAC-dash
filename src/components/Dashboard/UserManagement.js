import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import './usermanagment/UserManagment.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({ id: '', name: '', email: '', role: '' });
  const [isEditing, setIsEditing] = useState(false); 

 
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new user
  const addUser = () => {
    if (userData.name && userData.email && userData.role) {
      setUsers([...users, { id: Math.floor(10000 + Math.random() * 90000), ...userData }]);
      setUserData({ id: '', name: '', email: '', role: '' }); 
    }
  };

  // Edit an existing user
  const editUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setUserData(userToEdit);
    setIsEditing(true); 
  };

  
  const saveEditedUser = () => {
    setUsers(users.map((user) => (user.id === userData.id ? { ...userData } : user)));
    setUserData({ id: '', name: '', email: '', role: '' }); 
    setIsEditing(false); 
  };

  // Delete a user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <motion.div
      className="user-management-container"
      initial={{ opacity: 0, x: -100 }}   
      animate={{ opacity: 1, x: 0 }}     
      transition={{ type: 'spring', stiffness: 100, damping: 25 }}  
    >
      <h1>User Management</h1>



      <div className="user-form">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        {isEditing ? (
          <button className="btn btn-primary" onClick={saveEditedUser}>
            Update User
          </button>
        ) : (
          <button className="btn btn-primary" onClick={addUser}>
            Add User
          </button>
        )}
      </div>



      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td> 
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                 
                  <button className="btn btn-primary" onClick={() => editUser(user.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserManagement;
