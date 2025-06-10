import React, { useState } from 'react';
import { useTransaction, useTransactionDispatch } from './TransactionsContext';

function TransactionHistory() {
  const { history } = useTransaction();
  const dispatch = useTransactionDispatch();
  const [filter, setFilter] = useState('all');

  const filteredHistory = history.filter((el) => {
    if (filter === 'all') return true;
    return filter === el.type;
  });

  return (
    <div>
      <h3>Transaction History</h3>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('income')}>Incomes</button>
      <button onClick={() => setFilter('expense')}>Expenses</button>

      <ul className="ul">
        {filteredHistory.map((el) => {
          const originalIndex = history.findIndex(
            (item) =>
              item.timestamp === el.timestamp &&
              item.amount === el.amount &&
              item.type === el.type
          );

          return (
            <li
              key={el.timestamp}
              className={`li ${el.type === 'income' ? 'incomeStyle' : 'expenseStyle'}`}
            >
              {el.type === 'income'
                ? `You added $${el.amount} - Balance: $${el.currentBalance}`
                : `You spent $${el.amount} - Balance: $${el.currentBalance}`}
              <span> — {new Date(el.timestamp).toLocaleString()}</span>
              <button
                className="btnRemove"
                onClick={() => dispatch({ type: 'deleted', index: originalIndex })}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TransactionHistory;
