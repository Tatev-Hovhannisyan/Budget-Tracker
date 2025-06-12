import { createContext, useContext, useReducer } from "react";

const TransactionContext = createContext(null);
const TransactionDispatchContext = createContext(null);

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return (
    <TransactionContext.Provider value={state}>
      <TransactionDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionDispatchContext.Provider>
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  return useContext(TransactionContext);
}

export function useTransactionDispatch() {
  return useContext(TransactionDispatchContext);
}

const initialState = {
  balance: 0,
  history: [],
};

function transactionReducer(state, action) {
  switch (action.type) {
    case "income": {
      const amount = Number(action.amount);
      if (isNaN(amount) || amount <= 0) return state;

      const newBalance = Number((state.balance + amount).toFixed(2));

      return {
        balance: newBalance,
        history: [
          ...state.history,
          {
            type: "income",
            amount,
            currentBalance: newBalance,
            timestamp: Date.now(),
          },
        ],
      };
    }

    case "expense": {
      const amount = Number(action.amount);
      if (isNaN(amount) || amount <= 0) return state;

      if (amount > state.balance) {
        return state;
      }

      const newBalance = Number((state.balance - amount).toFixed(2));

      return {
        balance: newBalance,
        history: [
          ...state.history,
          {
            type: "expense",
            amount,
            currentBalance: newBalance,
            timestamp: Date.now(),
          },
        ],
      };
    }

    case "deleted": {
      const item = state.history[action.index];
      if (!item) return state;

      const updatedHistory = state.history.filter((_, i) => i !== action.index);

      const newBalance =
        item.type === "income"
          ? Number((state.balance - item.amount).toFixed(2))
          : Number((state.balance + item.amount).toFixed(2));

      return {
        balance: newBalance,
        history: updatedHistory,
      };
    }

    default:
      return state;
  }
}

