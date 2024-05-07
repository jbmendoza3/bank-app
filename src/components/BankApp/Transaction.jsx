

import React from 'react';
import './Transaction.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount (Php)</th> {/* Update the heading to include (Php) */}
            <th>Sender</th>
            <th>Recipient</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className={transaction.amount >= 0 ? 'deposit' : 'send'}>
              <td>{transaction.type}</td>
              <td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(transaction.amount)}</td>
              <td>{transaction.sender}</td>
              <td>{transaction.recipient}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
