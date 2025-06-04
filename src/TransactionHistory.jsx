import React from 'react';

function TransactionHistory({ historyList, onDelete }) {
  return (
    <div>
      <h3>Transaction History</h3>
      <ul className='ul'>
        {historyList.map((el, index) => (
          <li key={index} className={`li ${el.type === 'income' ? 'incomeStyle' : 'expenseStyle'}`}>
            {el.type === 'income'
              ? `You added $${el.amount} and your balance then was $${el.currentBalance}  -  ${new Date().toLocaleString()}`
              : `You spent $${el.amount} and your balance then was $${el.currentBalance}  -  ${new Date().toLocaleString()}`
            }
            <button className='btnRemove' onClick={() => onDelete(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
