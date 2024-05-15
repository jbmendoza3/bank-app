// DepositForm.jsx
import './DepositForm.css'
import React, { useState } from 'react';

const DepositForm = ({ depositMoney, toggleDepositPopup, users }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && selectedUser) {
      depositMoney(selectedUser, parseFloat(amount));
      toggleDepositPopup();
    }
  };

  return (
    <div className="deposit-popup">
      <h2>Deposit</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Select User:</label>
        <select id="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onKeyDown={ e => ( e.keyCode === 69 ) && e.preventDefault() } onChange={(e) => setAmount(e.target.value)} required/>
        <button className="deposit-btn" type="submit">Deposit</button>
        <button className="close-btn" onClick={toggleDepositPopup}>Close</button>
      </form>
    </div>
  );
};

export default DepositForm;
