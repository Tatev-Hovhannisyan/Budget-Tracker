
import { useState } from 'react';
import './App.css';

import TransactionForm from './TransactionForm';
import TransactionHistory from './TransactionHistory';


function App() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  function handleOnChange(e) {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setAmount(value);
    }
  }

  function handleIncomeClick() {
    const newIncome = balance + Number(amount);
    setBalance(newIncome);
    setHistoryList([...historyList, {
      type: 'income',
      amount: Number(amount),
      currentBalance: newIncome
    }]);
    setAmount("");
  }

  function handleExpenseClick() {
    const newExpense = balance - Number(amount);
    setBalance(newExpense);
    setHistoryList([...historyList, {
      type: 'expense',
      amount: Number(amount),
      currentBalance: newExpense
    }]);
    setAmount("");
  }

  function handleDeleteClick(index) {
    const removedElem = historyList[index];
    let newBalance = balance;

    if (removedElem.type === 'income') {
      newBalance -= removedElem.amount;
    } else if (removedElem.type === 'expense') {
      newBalance += removedElem.amount;
    }

    const newHistoryList = historyList.filter((_, idx) => idx !== index);
    setHistoryList(newHistoryList);
    setBalance(newBalance);
  }

  return (
    <>
      <h1>Budget Tracker</h1>

      <TransactionForm 
        amount={amount}
        onChange={handleOnChange}
        onIncome={handleIncomeClick}
        onExpense={handleExpenseClick}
      />

      <TransactionHistory 
        historyList={historyList}
        onDelete={handleDeleteClick}
      />

    <h3 className='balance'>Your Current Balance is {balance}</h3>
    </>
  );
}

export default App;
