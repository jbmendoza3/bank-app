
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ users, employeeName }) => {
  return (
    <div className="dashboard">
      <h2>Welcome {employeeName}!</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance (Php)</th> {/* Update the heading to include (Php) */}
            <th>Handled By</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(user.balance)}</td>
              <td>{employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
