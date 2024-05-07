// AddUserPopup.jsx

import React, { useState } from 'react';
import './AddUserButton.css';

const AddUserPopup = ({ onAddUser, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(0); // Initialize balance as 0
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate name
    if (!/^[A-Za-z]/.test(name)) {
      setError('Name should not start with a number');
      return;
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Validate balance
    if (isNaN(parseFloat(balance)) || parseFloat(balance) < 0) {
      setError('Balance must be a non-negative number');
      return;
    }

    // If no errors, add user
    onAddUser({ name, email, password, balance: parseFloat(balance) });

    // Clear form fields after submission
    setName('');
    setEmail('');
    setPassword('');
    setBalance(0);
    setError('');
    handleClose();
  };
  const handleClose = () => {
    onClose(); // Call the onClose function passed as props
  };

  const handleCancel = () => {
    handleClose(); // Close the popup when cancel button is clicked
  };
 

  return (
    <div className="add-user-popup">
      <div className="adduser-popup-content">
        <h2>Add User</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="number" placeholder="Balance" value={balance} onChange={(e) => setBalance(parseFloat(e.target.value))} required />
          <button className="adduser-btn" type="submit">Add User</button>
          <button className="close-btnx" type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPopup;

