import React from "react";
import { useTransaction } from "./TransactionsContext";
import "./Diagramma.css";

function Diagramma() {
  const { history, balance } = useTransaction();

  const income = history
    .filter((el) => el.type === "income")
    .reduce((sum, el) => sum + el.amount, 0);

  const expense = history
    .filter((el) => el.type === "expense")
    .reduce((sum, el) => sum + el.amount, 0);

  const max = Math.max(income, expense, 1); // защищает от деления на 0

  const incomeHeight = (income / max) * 150; // 150px — максимальная высота
  const expenseHeight = (expense / max) * 150;

  return (
    <div className="diagramma-container">
      <div className="totals">
        <p>Total Incomes: ${income.toLocaleString("de-DE")}</p>
        <p>Total Expenses: ${expense.toLocaleString("de-DE")}</p>
        <p>Current Balance: ${balance.toLocaleString("de-DE")}</p>
      </div>

      <div className="bar-chart">
        <div className="bar-wrapper">
          <span className="amount-label">${income.toLocaleString()}</span>
          <div
            className="bar income-bar"
            style={{ height: `${incomeHeight}px` }}
          ></div>
          <span>Income</span>
        </div>

        <div className="bar-wrapper">
          <span className="amount-label">${expense.toLocaleString()}</span>
          <div
            className="bar expense-bar"
            style={{ height: `${expenseHeight}px` }}
          ></div>
          <span>Expense</span>
        </div>
      </div>
    </div>
  );
}

export default Diagramma;
