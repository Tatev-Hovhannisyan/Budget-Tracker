import React from 'react';

function TransactionForm({ amount, onChange, onIncome, onExpense }) {
  return (
    <div className="transaction-form"> 
      <input 
      className='input'
        type='number' 
        value={amount} 
        onChange={onChange} 
      />
      <button className='IncomeBtn' onClick={onIncome}>Income</button>
      <button className='ExpenseBtn' onClick={onExpense}>Expense</button>
    </div>
  );
}

export default TransactionForm;
