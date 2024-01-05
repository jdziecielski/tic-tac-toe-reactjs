export default function ScoreboardComponent({ gamesHistory }) {
  return (
    <div className="scoreboard">
      <h2 className="score">Player X: {gamesHistory.winsX}</h2>
      <h2 className="score">Ties: {gamesHistory.ties}</h2>
      <h2 className="score">Player O: {gamesHistory.winsO}</h2>
    </div>
  );
}
