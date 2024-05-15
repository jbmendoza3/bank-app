// SendMoneyForm.jsx
import './SendMoney.css'
import React, { useState } from 'react';

const SendMoneyForm = ({ users, sendMoney, toggleSendMoneyPopup }) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sender && recipient && amount > 0) {
      const senderUser = users.find(user => user.name === sender);
      if (senderUser.balance < parseFloat(amount)) {
        setError('Insufficient balance');
      } else {
        sendMoney(sender, recipient, parseFloat(amount));
        toggleSendMoneyPopup();
      }
    } else {
      setError('Transaction invalid!');
    }
  };

  return (
    <div className="sendmoney-popup">
      <h2>Send Money</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="sender">Sender:</label>
        <select id="sender" value={sender} onChange={(e) => setSender(e.target.value)} required>
          <option value="">Select Sender</option>
          {users.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="recipient">Recipient:</label>
        <select id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} required>
          <option value="">Select Recipient</option>
          {users.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onKeyDown={ e => ( e.keyCode === 69 ) && e.preventDefault() } onChange={(e) => setAmount(e.target.value)} required></input>
        <button className="sendmoneybtn" type="submit">Send</button>
        <button className="close-btn" onClick={toggleSendMoneyPopup}>Close</button>
      </form>
    </div>
  );
};

export default SendMoneyForm;
