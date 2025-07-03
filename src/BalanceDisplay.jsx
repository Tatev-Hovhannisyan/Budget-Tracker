import { useTransaction } from './TransactionsContext';

function BalanceDisplay() {
  const { balance } = useTransaction();
  return (
  <div className="balance">
  <h3>Your available balance is</h3>
  <h2>{`${balance.toLocaleString('de-DE')} $`}</h2>

</div>

 );
}

export default BalanceDisplay;