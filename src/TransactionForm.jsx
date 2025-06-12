import React, { useState } from 'react';
import { useTransaction, useTransactionDispatch } from './TransactionsContext';

function TransactionForm() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const dispatch = useTransactionDispatch();
  const { balance } = useTransaction();

  function handleChange(e) {
    setAmount(e.target.value);
    setError('');
  }

  function addTransaction(type) {
    const numericAmount = Number(amount);

    if (amount === "" || isNaN(numericAmount) || numericAmount < 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (type === "expense" && numericAmount > balance) {
      setError("Insufficient funds for this expense.");
      return;
    }

    setError("");
    dispatch({
      type,
      amount: Number(numericAmount.toFixed(2)),
    });
    setAmount('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTransaction('income');
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        className='input'
        type='number'
        value={amount}
        onChange={handleChange}
        step="0.01"
        min="0"
      />
      <button type="button" className='IncomeBtn' onClick={() => addTransaction('income')}>
        Income
      </button>
      <button type='button' className='ExpenseBtn' onClick={() => addTransaction('expense')}>
        Expense
      </button>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TransactionForm;
