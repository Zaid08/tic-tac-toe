import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning_Combination";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X:'Player 1',
  O:'Player 2',
}

//const initialGameBoard = [
const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function driveGameboard(gameTurns){
  //let gameBoard = initialGameBoard;
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=> [...array])];

    for (const turn of gameTurns){
        const {square, player} = turn;
        const {row,col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function driveWinner(gameBoard,players){
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      // winner = firstSquareSymbol;
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}


function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
 
  // const [players,setPlayers] = useState({
  //   'X':"Player 1",
  //   'O': 'Player 2'
  // });
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  //const [hasWinner, setHasWinner] = useState(false);
  

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = driveGameboard(gameTurns);
  // //let gameBoard = initialGameBoard;
  // let gameBoard = [...initialGameBoard.map(array=> [...array])];

  //   for (const turn of gameTurns){
  //       const {square, player} = turn;
  //       const {row,col} = square;

  //       gameBoard[row][col] = player;
  //   }

  const winner = driveWinner(gameBoard,players);

  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex,colIndex){

    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      // let currentPlayer = 'X';
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //   currentPlayer = '0';
      // }
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square : {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPalyers => {
      return {
        ...prevPalyers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player 
         //initialName='Player 1' 
         initialName={PLAYERS.X}
         symbol='X' 
         isActive={activePlayer === 'X'}
         onChangeName={handlePlayerNameChange}
         />

         <Player 
         initialName={PLAYERS.O}
         symbol='O' 
         isActive={activePlayer === 'O'}
         onChangeName={handlePlayerNameChange}
         />

        </ol>
        {(winner || hasDraw)&& <GameOver winner={winner} restart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board = {gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
