// RemoveUserPopup.jsx

import React from 'react';
import './RemoveUser.css';

const RemoveUserPopup = ({ users, employeeName, onRemoveUser, onClose }) => {
  const handleRemoveUser = (user) => {
    if (user.name !== employeeName) {
      onRemoveUser(user);
    }
    onClose();
  };

  return (
    <div className="remove-user-popup">
      <div className="removeuser-popup-content">
        <h2>Remove User</h2>
        <ul>
          {users.map(user => (
            <li key={user.email}>
              {user.name}
              <button onClick={() => handleRemoveUser(user)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RemoveUserPopup;
