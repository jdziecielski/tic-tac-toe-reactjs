import InfoComponent from "./InfoComponent";
import ScoreboardComponent from "./ScoreboardComponent";
import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [lastPositionPlaced, setLastPositionPlaced] = useState();
  const [lastPlayer, setLastPlayer] = useState("");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [spotsOccupied, setSpotsOccupied] = useState(0);
  const [wasLastGameTie, setWasLastGameTie] = useState(false);
  const [gamesHistory, setGamesHistory] = useState({
    winsX: 0,
    winsO: 0,
    ties: 0,
  });
  const [board, setBoard] = useState([
    { player: "", id: crypto.randomUUID(), position: 1 },
    { player: "", id: crypto.randomUUID(), position: 2 },
    { player: "", id: crypto.randomUUID(), position: 3 },
    { player: "", id: crypto.randomUUID(), position: 4 },
    { player: "", id: crypto.randomUUID(), position: 5 },
    { player: "", id: crypto.randomUUID(), position: 6 },
    { player: "", id: crypto.randomUUID(), position: 7 },
    { player: "", id: crypto.randomUUID(), position: 8 },
    { player: "", id: crypto.randomUUID(), position: 9 },
  ]);

  useEffect(() => {
    checkIfEnd(lastPlayer, lastPositionPlaced);
  }, [board]);

  function addScore(lastPlayer, isTie) {
    if (!isTie) {
      if (lastPlayer == "X") {
        setGamesHistory((currentGamesHistory) => {
          return {
            ...currentGamesHistory,
            winsX: currentGamesHistory.winsX + 1,
          };
        });
      } else {
        setGamesHistory((currentGamesHistory) => {
          return {
            ...currentGamesHistory,
            winsO: currentGamesHistory.winsO + 1,
          };
        });
      }
    } else {
      setGamesHistory((currentGamesHistory) => {
        return {
          ...currentGamesHistory,
          ties: currentGamesHistory.ties + 1,
        };
      });
    }
  }

  function checkIfEnd(lastPlayer, lastPosition) {
    if (lastPlayer === "") return false;

    let isWinInRow = checkWinInRow(lastPlayer, lastPosition);
    let isWinInCol = checkWinInColumn(lastPlayer, lastPosition);
    let isWinInDiag = checkWinInDiagonal(lastPlayer);
    let isWinInAntiDiag = checkWinInAntiDiagonal(lastPlayer);
    let isWin = false;
    let isTie = false;

    if (isWinInCol || isWinInRow || isWinInDiag || isWinInAntiDiag)
      isWin = true;

    if (spotsOccupied === 9 && !isWin) isTie = true;

    if (isTie && !isWin) {
      setWasLastGameTie(true);
    }

    if (isWin || isTie) {
      addScore(lastPlayer, isTie);
      setIsGameEnded(true);
    }
  }

  function checkWinInRow(lastPlayer, lastPosition) {
    let lowBound = 1;
    let upBound = 9;

    if (lastPosition >= 1 && lastPosition <= 3) {
      lowBound = 1;
      upBound = 3;
    } else if (lastPosition >= 4 && lastPosition <= 6) {
      lowBound = 4;
      upBound = 6;
    } else if (lastPosition >= 7 && lastPosition <= 9) {
      lowBound = 7;
      upBound = 9;
    }

    let ifWin = true;
    for (let i = lowBound; i <= upBound; i++) {
      if (board[i - 1].player != lastPlayer) ifWin = false;
    }

    return ifWin;
  }

  function checkWinInColumn(lastPlayer, lastPosition) {
    let lowBound = 1;
    let upBound = 9;

    if (lastPosition === 1 || lastPosition === 4 || lastPosition === 7) {
      lowBound = 1;
      upBound = 7;
    } else if (lastPosition === 2 || lastPosition === 5 || lastPosition === 8) {
      lowBound = 2;
      upBound = 8;
    } else if (lastPosition === 3 || lastPosition === 6 || lastPosition === 9) {
      lowBound = 3;
      upBound = 9;
    }

    let ifWin = true;
    for (let i = lowBound; i <= upBound; i += 3) {
      if (board[i - 1].player != lastPlayer) ifWin = false;
    }

    return ifWin;
  }

  function checkWinInDiagonal(lastPlayer) {
    let lowBound = 1;
    let upBound = 9;

    let ifWin = true;
    for (let i = lowBound; i <= upBound; i += 4) {
      if (board[i - 1].player != lastPlayer) ifWin = false;
    }

    return ifWin;
  }

  function checkWinInAntiDiagonal(lastPlayer) {
    let lowBound = 3;
    let upBound = 7;

    let ifWin = true;
    for (let i = lowBound; i <= upBound; i += 2) {
      if (board[i - 1].player != lastPlayer) ifWin = false;
    }

    return ifWin;
  }

  function handleClick(id, player, position) {
    if (!isGameEnded) {
      setBoard((currentBoard) => {
        return currentBoard.map((spot) => {
          if (spot.id === id && spot.player === "") {
            if (playerTurn === "X") {
              setPlayerTurn("O");
            } else {
              setPlayerTurn("X");
            }

            setLastPositionPlaced(position);
            setLastPlayer(player);
            setSpotsOccupied(spotsOccupied + 1);

            return { ...spot, player: player };
          }

          return spot;
        });
      });
    } else {
      console.log("game has ended!");
    }
  }

  function findValue(id) {
    return board.map((spot) => {
      if (spot.id === id) return spot.player;
    });
  }

  function restartGame() {
    setBoard((currentBoard) => {
      return currentBoard.map((spot) => {
        return { ...spot, player: "" };
      });
    });
    setPlayerTurn("X");
    setSpotsOccupied(0);
    setIsGameEnded(false);
    setLastPlayer("");
    setLastPositionPlaced(0);
    setWasLastGameTie(false);
  }

  function restartButton() {
    return (
      <div className="restartButtonDiv">
        <button className="restartButton" onClick={() => restartGame()}>
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <>
      <InfoComponent
        isGameEnded={isGameEnded}
        wasLastGameTie={wasLastGameTie}
        lastPlayer={lastPlayer}
        playerTurn={playerTurn}
      ></InfoComponent>
      <div className="board">
        {board.map((spot) => {
          return (
            <button
              className="spot"
              key={spot.id}
              onClick={() => handleClick(spot.id, playerTurn, spot.position)}
            >
              {findValue(spot.id)}
            </button>
          );
        })}
      </div>
      <ScoreboardComponent gamesHistory={gamesHistory}></ScoreboardComponent>
      {restartButton()}
    </>
  );
}
