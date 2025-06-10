import "./App.css";
import { TransactionProvider } from "./TransactionsContext";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";
import BalanceDisplay from "./BalanceDisplay";


function App() {
  return (
    <>
      <TransactionProvider>
        <h1>Budget Tracker</h1>
        <TransactionForm />
          <BalanceDisplay />
        <TransactionHistory />
      
      </TransactionProvider>
    </>
  );
}

export default App;
