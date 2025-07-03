import React, { useState, useRef, useEffect } from "react";
import { useTransaction, useTransactionDispatch } from "./TransactionsContext";

function TransactionForm() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('income'); // income или expense
  const dispatch = useTransactionDispatch();
  const { balance } = useTransaction();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  function handleChange(e) {
    setAmount(e.target.value);
    setError('');
  }

  function addTransaction() {
    const cleaned = amount.replace(',', '.');
    const numericAmount = Number(cleaned);

    if (cleaned === "" || isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (type === "expense" && numericAmount > balance) {
      setError("Insufficient funds for this expense.");
      return;
    }

    dispatch({
      type,
      amount: Number(numericAmount.toFixed(2)),
    });

    setAmount('');
    setError('');
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setType((prev) => (prev === "income" ? "expense" : "income"));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      addTransaction();
    }
  }

  return (
    <form className="transaction-form" onKeyDown={handleKeyDown}>
      <input
      ref = {inputRef}
        className="input"
        type="number"
        value={amount}
        onChange={handleChange}
        placeholder="Enter amount"
        step="0.01"
        min="0"
      />

      <div className="button-group">
        <button
          type="button"
          className={`IncomeBtn ${type === 'income' ? 'selected' : ''}`}
          onClick={() => {
            setType('income')
          addTransaction()
          }}
        >
          Income
        </button>

        <button
          type="button"
          className={`ExpenseBtn ${type === 'expense' ? 'selected' : ''}`}
          onClick={() => {
            setType('expense')
          addTransaction();
          }}
        >
          Expense
        </button>
      </div>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TransactionForm;
