import React, { useState } from "react";
import { useTransaction, useTransactionDispatch } from "./TransactionsContext";

function TransactionHistory() {
  const { history, balance } = useTransaction();
  const dispatch = useTransactionDispatch();
  const [filter, setFilter] = useState("all");

  const filteredHistory = history.filter((el) => {
    if (filter === "all") return true;
    return filter === el.type;
  });

  const totalAmount = filteredHistory.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <>
      <h2>Transaction History</h2>
      <div className="filter-buttons">
        <button className="btnAll" onClick={() => setFilter("all")}> All </button>
        <button className="btnIncomes" onClick={() => setFilter("income")}> Incomes </button>
        <button className="btnExpenses" onClick={() => setFilter("expense")}> Expenses </button>
      </div>

 <div className="historyStyle">
          {filter === "all" ? (
            <>Your balance is ${balance.toLocaleString('de-DE')}</>
          ) : filter === "income" ? (
            <>Total income amount: ${totalAmount.toLocaleString('de-DE')}</>
          ) : filter === "expense" ? (
            <>Total expense amount: ${totalAmount.toLocaleString('de-DE')}</>
          ) : null}
        </div>

      <div className="transaction-history-container">
       
        <ul className="ul">
          {filteredHistory.length === 0 ? (
            <p>There are no transactions yet</p>
          ) : (
            filteredHistory.map((el) => {
              const originalIndex = history.findIndex(
                (item) =>
                  item.timestamp === el.timestamp &&
                  item.amount === el.amount &&
                  item.type === el.type
              );

              return (
                <li
                  key={el.timestamp}
                  className={`li ${
                    el.type === "income" ? "incomeStyle" : "expenseStyle"
                  }`}
                >
                  {el.type === "income"
                    ? `${el.amount.toLocaleString('de-DE')} income - remaining balance: $${el.currentBalance.toLocaleString('de-DE')}`
                    : `${el.amount.toLocaleString('de-DE')} expence - remaining balance: $${el.currentBalance.toLocaleString('de-DE')}`}
                  <span> — {new Date(el.timestamp).toLocaleString()}</span>
                  {originalIndex !== -1 && (
                    <button
                      className="btnRemove"
                      onClick={() =>
                        dispatch({ type: "deleted", index: originalIndex })
                      }
                    >
                      x
                    </button>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}

export default TransactionHistory;
