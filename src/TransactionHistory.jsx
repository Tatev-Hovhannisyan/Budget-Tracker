import React from 'react';
import { useTransaction, useTransactionDispatch } from './TransactionsContext';


function TransactionHistory() {
  const {history} = useTransaction();
  const dispatch = useTransactionDispatch();

  return (
    <div>
      <h3>Transaction History</h3>
  
      <ul className='ul'>
        {history.map((el, index) => (
          <li key={index} className={`li ${el.type === 'income' ? 'incomeStyle' : 'expenseStyle'}`}>
            {el.type === 'income'
              ? `You added $${el.amount} - Balance: $${el.currentBalance}`
              : `You spent $${el.amount} - Balance: $${el.currentBalance}`
              }
               <span> — {new Date(el.timestamp).toLocaleString()}</span>
            <button className='btnRemove' onClick={() => dispatch({ type: 'deleted', index })}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
