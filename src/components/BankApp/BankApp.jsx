import React, { useState } from 'react';
import DepositForm from './DepositForm';
import WithdrawButton from './WithdrawButton'
import Dashboard from './Dashboard';
import AddUserButton from './AddUserButton'; // Importing AddUserButton component
import SendMoneyForm from './SendMoney';
import RemoveUserButton from './RemoveUserButton'; // Importing RemoveUserButton component
import TransactionHistory from './Transaction';
import BudgetFund from './../BudgetFund/BudgetFund';
import './BankApp.css';


function BankApp() {
 const [showDepositPopup, setShowDepositPopup] = useState(false);
 const [showWithdrawalPopup, setShowWithdrawalPopup] = useState(false);
 const [showSendMoneyPopup, setShowSendMoneyPopup] = useState(false);
 const [showAddUserPopup, setShowAddUserPopup] = useState(false);
 const [showRemoveUserPopup, setShowRemoveUserPopup] = useState(false);
 const [users, setUsers] = useState([
  {name: 'Poseidon', email: 'poseidon@email.com', balance: 50000 }
 ]); // State for storing user details
 const employeeName = 'Poseidon'
 const [transactions, setTransactions] = useState([]);

 const depositMoney = (selectedUser, amount) => {
    if (amount <= 0) {
      alert("Deposited money cannot be negative or zero");
      return;
    }
    // Function to deposit money into a user's account, updating the balance
    const updatedUsers = users.map(user => {
     if (user.name === selectedUser) {
      return { ...user, balance: user.balance + amount };
    }
      return user;
    });
    setUsers(updatedUsers);

    // Add transaction to history with user's name as recipient
    const recipientName = users.find(user => user.name === selectedUser).name;
    const newTransaction = { type: 'Deposit', amount: amount, recipient: recipientName, date: new Date().toLocaleString() };
    setTransactions([...transactions, newTransaction]);
  };

  const withdrawMoney = (selectedUser, amount) => {
    if (amount <= 0) {
      alert("Withdrawn amount cannot be negative or zero");
      return;
    }

    const user = users.find(user => user.name === selectedUser);
    if (!user || user.balance < amount) {
      alert("Insufficient balance");
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.name === selectedUser) {
        return { ...user, balance: user.balance - amount };
      }
      return user;
    });
    setUsers(updatedUsers);

    // Add transaction to history with user's name as sender
    const newTransaction = { type: 'Withdraw', amount: -amount, sender: selectedUser, date: new Date().toLocaleString() };
    setTransactions([...transactions, newTransaction]);
  };

  const handleCloseWithdraw = () => {
    setShowWithdrawalPopup(false); // Close the Withdraw button
  };

 // Function to add a new user
 const addUser = (user) => {
    // Check if user with the same email already exists
    const existingUser = users.find(u => u.email === user.email);
     if (existingUser) {
      alert("User already exists");
     return;
    }
    setUsers([...users, user]);
    setShowAddUserPopup(false); 
 };

  const handleCloseAddUserPopup = () => {
    setShowAddUserPopup(false); // Close the Add User popup
  };


 const sendMoney = (sender, recipient, amount) => {
    // Validate if recipient is selected
    if (!recipient) {
      alert("User does not exist");
      return;
    }

    // Check if sender and recipient are the same
    if (sender === recipient) {
      alert("Cannot send money to your own account");
      return;
    }

    // / Check if sender's balance is sufficient
    const senderUser = users.find(user => user.name === sender);
      if (!senderUser || senderUser.balance < amount) {
      alert("Insufficient balance");
      return;
    }

    const updatedUsers = users.map(user => {
     if (user.name === sender) {
          return { ...user, balance: user.balance - amount };
        }
        if (user.name === recipient) {
         return { ...user, balance: user.balance + amount };
        }
        return user;
      });
      setUsers(updatedUsers);

    const newTransaction = { type: 'Send Money', amount: -amount, sender: sender, recipient: recipient, date: new Date().toLocaleString() };
      setTransactions([...transactions, newTransaction]);
  
  };


 const removeUser = (userToRemove) => {
    const updatedUsers = users.filter(user => user.email !== userToRemove.email);
    setUsers(updatedUsers);
  };  


 const toggleDepositPopup = () => {
  setShowDepositPopup(!showDepositPopup);
 };

 const toggleWithdrawalPopup = () => {
  setShowWithdrawalPopup(!showWithdrawalPopup);
 }


 const toggleSendMoneyPopup = () => {
   setShowSendMoneyPopup(!showSendMoneyPopup);
 };


 const toggleAddUserPopup = () => {
   setShowAddUserPopup(!showAddUserPopup);
 };


 const toggleRemoveUserPopup = () => {
   setShowRemoveUserPopup(!showRemoveUserPopup);
 };


 return (
   <div className="bank-app">
     <h1>Bank App</h1>
     <Dashboard users={users} employeeName={employeeName} />
     <div className="actions">
       <button onClick={toggleDepositPopup}>
         <i className="fas fa-money-bill"></i> Deposit
       </button>
       <button onClick={toggleWithdrawalPopup}>
          <i class="fa-solid fa-money-bill-transfer"></i> Withdraw
       </button>
       <button onClick={toggleSendMoneyPopup}>
         <i className="fas fa-paper-plane"></i> Send Money
       </button>
       <button onClick={toggleAddUserPopup}>
         <i className="fas fa-user-plus"></i> Add User
       </button>
       <button onClick={toggleRemoveUserPopup}>
         <i className="fas fa-user-minus"></i> Remove User
       </button>
      
     </div>


     {/* Rendering the new components */}
     {showDepositPopup && (
       <DepositForm users={users} depositMoney={depositMoney} toggleDepositPopup={toggleDepositPopup} />
     )}

     {showWithdrawalPopup && (
       <WithdrawButton users={users} onWithdraw={withdrawMoney} onClose={handleCloseWithdraw} toggleWithdrawalPopup={toggleWithdrawalPopup} />
     )}

     {showAddUserPopup && (
       <AddUserButton onAddUser={addUser} onClose={handleCloseAddUserPopup} />
     )}

     {showSendMoneyPopup && (
       <SendMoneyForm users={users} sendMoney={sendMoney} toggleSendMoneyPopup={toggleSendMoneyPopup} />
     )}

     {showRemoveUserPopup && (
       <RemoveUserButton users={users} employeeName={employeeName} onRemoveUser={removeUser} onClose={toggleRemoveUserPopup} />
     )}

     <BudgetFund />
     <TransactionHistory transactions={transactions} />
     
   </div>
 );
};


export default BankApp;
