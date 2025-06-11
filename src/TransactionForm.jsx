import React, { useState } from 'react';
import { useTransactionDispatch } from './TransactionsContext';

function TransactionForm() {
const [amount, setAmount] = useState('');
const dispatch = useTransactionDispatch();

function handleChange(e){
  const value = e.target.value;
  if(Number(value) >= 0){
    setAmount(value)
  }
  
}

function addTransaction(type){
  if(amount === "" || Number(amount) < 0) return;
  
  dispatch({
    type,
    amount: Number(Number(amount).toFixed(2))
  });
  setAmount('');
  
}
  return (
    <div className="transaction-form"> 
      <input 
      className='input'
        type='number' 
        value={amount} 
        onChange={handleChange} 
      />
      <button className='IncomeBtn' onClick={() => addTransaction('income')} >Income</button>
      <button className='ExpenseBtn' onClick={() => addTransaction('expense')}>Expense</button>
    </div>
  );
}

export default TransactionForm;
