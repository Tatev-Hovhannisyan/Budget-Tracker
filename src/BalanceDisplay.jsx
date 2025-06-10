import { useTransaction } from './TransactionsContext';

function BalanceDisplay() {
  const { balance } = useTransaction();
  return <h3 className="balance">Your Current Balance is ${balance}</h3>;
}

export default BalanceDisplay;