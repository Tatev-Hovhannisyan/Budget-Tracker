
import { createContext, useContext, useReducer } from 'react';

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
  history: []
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'income': {
      const newBalance = state.balance + action.amount;
      return {
        balance: newBalance,
        history: [
          ...state.history,
          {
            type: 'income',
            amount: action.amount,
            currentBalance: newBalance,
            timestamp: Date.now()
          }
        ]
      };
    }

    case 'expense': {
      const newBalance = state.balance - action.amount;
      return {
        balance: newBalance,
        history: [
          ...state.history,
          {
            type: 'expense',
            amount: action.amount,
            currentBalance: newBalance,
            timestamp: Date.now()
          }
        ]
      };
    }

    case 'deleted': {
      const item = state.history[action.index];
      const updatedHistory = state.history.filter((_, i) => i !== action.index);
      const newBalance =
        item.type === 'income'
          ? state.balance - item.amount
          : state.balance + item.amount;

      return {
        balance: newBalance,
        history: updatedHistory
      };
    }

    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
