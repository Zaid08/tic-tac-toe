// import { useState } from "react";

// const initialGameBoard = [
//     [null,null,null],
//     [null,null,null],
//     [null,null,null],
// ];

// export default function GameBoard({onSelectSquare,activePlayerSymbol}) {
// export default function GameBoard({onSelectSquare,turns}) {
export default function GameBoard({onSelectSquare,board}) {
    // let gameBoard = initialGameBoard;

    // for (const turn of turns){
    //     const {square, player} = turn;
    //     const {row,col} = square;

    //     gameBoard[row][col] = player;
    // }

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

  return (
    <ol id='game-board'>
        {board.map((row,rowIndex)=> <li key={rowIndex}>
            <ol>
               {row.map((playerSymbol,colIndex)=> 
               <li key={colIndex}>
                {/* <button onClick={() => handleSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button></li>)}  */}
                    <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>
                        {playerSymbol}
                    </button>
                </li>)} 
            </ol>   
        </li>)}
    </ol>
  )
}
