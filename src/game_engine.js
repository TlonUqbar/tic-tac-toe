

// Cell Factory
function Cell() {
  let token = "_";

  const setToken = (player) => {
    token = player.token
  };

  const getToken = () => token;

  return {
    setToken,
    getToken
  };
}


// GameBoard Factory wrapped in IIFE
const Board = ( function GameBoard() {
    let rows = 3;
    let cols = 3;
    let board = [];

    for( let i = 0; i < rows; i++ ){
      board[i] = [];
      for( let j = 0; j < cols; j++ ) {
        board[i].push( Cell() );
      }
    }

    const getBoard = () => board;

    const addMove = (row, column, player) => {
      if (board[row][column].getToken() === "_") {
        board[row][column].setToken(player);
      } else {
        return;
      }
    }; 

    // Prints a flat version of the board
    const displayBoardFlat = () => {
      return board.map( (row) => row.map( (cell) =>  cell.getToken())).flat(1);
    };

    // Prints a 2d version of the board
    const displayBoard = () => {
      return board.map( (row) => row.map( (cell) =>  cell.getToken()));
    };


    const resetBoard = () => {
      for( let i = 0; i < rows; i++ ){
        board[i] = [];
        for( let j = 0; j < cols; j++ ) {
          board[i].push( Cell() );
        }
      }
    }
      
    return {
      addMove,
      getBoard,
      displayBoard,
      displayBoardFlat,
      resetBoard
    };

  }
)()


// Players Factory wrapped in IIFE
const Players = (function Players() {
  const players = [{name: "Player 1", token: "O", type: "Computer"}, {name: "Player 2", token: "X", type: "Computer"}]
  
  const getPlayers = () => players;
  
  return{
    getPlayers
  }

})()



// ActivePlayer Factory wrapped in IIFE
const Active = (function ActivePlayer() {
  const p1 = Players.getPlayers()[0];
  const p2 = Players.getPlayers()[1];
  let activePlayer = p1;

  const changeActivePlayer = () => {
    activePlayer = activePlayer === p1 ? p2 : p1;
  }

  const getActivePlayer = () => { return activePlayer }
  const setActivePlayer = (player) => { activePlayer = player }
  
  return {
    getActivePlayer,
    changeActivePlayer,
    setActivePlayer
  }
})()


// Players Factory wrapped in IIFE
const Score = ( function ScoreBoard() {  
  const scores = [{name: Players.getPlayers()[0].name, points: 0}, {name: Players.getPlayers()[1].name, points: 0}]
  const globalScore = [ 0, 0]
  let winner = '';

  const updateScore = (player) => {
    if( player.name === scores[0].name ) {
      scores[0].points = scores[0].points + 1; 
      globalScore[0] = ( scores[0].points )

    } else {
      scores[1].points = scores[1].points + 1;
      globalScore[1] = ( scores[1].points )
    }
    winner = player
  }

  const getGlobalScore = () => { return globalScore }
  const getScores = () => { return scores }
  const showScore = () => { console.log(globalScore)   }
  const getWinner = () => { return winner } 

  return{
    updateScore,
    showScore,
    getScores,
    getGlobalScore,
    getWinner
  }
})()


// GameStatus Factory wrapped in IIFE
const Status = ( function GameStatus(){
  let gameOver = false;
  let state = "playing";
  let tie = false;

  const getStatus = () => { return gameOver }
  const restart = () => {  gameOver = false; state = "playing" }
  const isTie = () => { tie = true }


  const winCombos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], 
                      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], ];


  const winCheck = () => {
    const emptyCells = Board.displayBoardFlat().filter( el => el === "_").length;

    winCombos.forEach( (line) => {
      let count = 0;
      line.filter( (token) => {
        if(Board.displayBoardFlat()[token]  === Active.getActivePlayer().token){
          count++;
          if( count === 3 ) {
            gameOver = true;
            state = "over"
          }
        }
      })
    })

    if( emptyCells === 0 && !gameOver ){
      gameOver = true;
      state = "tie"
      gameReset()
    } 

    return gameOver
  }

  return{
    winCheck,
    getStatus,
    restart,
    isTie
  }
})()



// GameStatus Factory wrapped in IIFE
const Controller = (function GameController() {
  console.log("Game Contorller initiated")
  let count = 0
  console.table( Board.displayBoard() )
  while( !Status.getStatus() && count < 10 ) {

    playerMoves()

    if( Status.winCheck() ){
      count++;
      console.log(`***** WINNER!! ${Score.getWinner().name} - "${Score.getWinner().token}" *****`);   
      console.table(Board.displayBoard())
      Score.updateScore(Active.getActivePlayer() )
      console.log("Score", Score.getGlobalScore())
      gameReset()
    } else {
      Active.changeActivePlayer();
    }
  }
})()


function playerMoves() {
  if( Active.getActivePlayer().type === "Computer" ) {  
    computerPlayer()
  } else {
    promptUser()
  }
}

// This resets the board, sets player1 to active, and resets gameOver value
function gameReset(){
  Board.resetBoard()
  Board.displayBoard()
  Active.setActivePlayer(Players.getPlayers()[0])
  Status.restart()
  console.log("\nGame Over!\nResetting game.")
}



// Computer plays a move
function computerPlayer() {
  const currentBoard = Board.displayBoardFlat();
  const availableMoves = [];
  const translateMoves = { 0: [0,0], 1: [0,1], 2: [0,2], 3: [1,0], 4: [1,1], 5: [1,2], 6: [2,0], 7: [2,1], 8: [2,2]}

  currentBoard.forEach( (elem, index, array) => {
    if( elem === "_" ){ availableMoves.push(index) }
  } )

  const randomElement = availableMoves[Math.floor(Math.random() * availableMoves.length)]

  Board.addMove(...translateMoves[randomElement], Active.getActivePlayer())
}



