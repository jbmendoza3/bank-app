

import React, { useState } from 'react';
import './WithdrawButton.css';

const WithdrawButton = ({ users, onWithdraw, onClose }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && amount) {
      onWithdraw(selectedUser, parseFloat(amount));
      setSelectedUser('');
      setAmount('');
    }
    handleClose();
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed as props
  };

  const handleCancel = () => {
    handleClose(); // Close the popup when cancel button is clicked
  };


  return (
    <div className="withdraw-popup">
      <h2>Withdraw</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Select User:</label>
        <select id="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((user, index) => (
            <option key={index} value={user.name}>{user.name}</option>
          ))}
        </select>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onKeyDown={ e => ( e.keyCode === 69 ) && e.preventDefault() } onChange={(e) => setAmount(e.target.value)} required></input>
        <button className="withdrawbtn" type="submit">Withdraw</button>
        <button className="cancelbtn" type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default WithdrawButton;
