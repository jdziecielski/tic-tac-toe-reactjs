export default function InfoComponent({
  isGameEnded,
  wasLastGameTie,
  lastPlayer,
  playerTurn,
}) {
  if (isGameEnded === false)
    return <h1 className="info">Turn: {playerTurn}</h1>;
  else {
    if (wasLastGameTie) {
      return (
        <h1 className="info">Tie! Click Restart Button to play again...</h1>
      );
    } else {
      return (
        <h1 className="info">
          {lastPlayer} wins! Click Restart Button to play again...
        </h1>
      );
    }
  }
}
