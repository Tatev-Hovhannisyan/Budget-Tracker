import React, { useState } from "react";
import { TransactionProvider } from "./TransactionsContext";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";
import BalanceDisplay from "./BalanceDisplay";
import Diagramma from "./Diagramma";
import "./App.css"


function App() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <TransactionProvider>
      <div className="app-layout">
        <h2 className="main-heading">Budget Tracker</h2>

        <Diagramma />

        <div className="right-panel">
          {!showHistory ? (
            <>
              <BalanceDisplay />
              <TransactionForm />
              <button
                className="historyBtn"
                onClick={() => setShowHistory(true)}
              >
                View Transaction History
              </button>
            </>
          ) : (
            <>
              <button className="backBtn" onClick={() => setShowHistory(false)}>
                ⬅ Back
              </button>
              <TransactionHistory />
            </>
          )}
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
