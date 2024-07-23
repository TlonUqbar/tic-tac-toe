import './style.css'
import _, { at, functionsIn, set } from 'lodash'
// const game = require("./game_engine.js")
import * as game from "./game_engine.js"

// DOM, ANIMATIONS, EVENTLISTENERS 


// The Board
// These are needed for setting the data-attributes and their values
const dataAttrsVals = [[0,0,0], [0,1,1], [0,2,2], [1,0,3], [1,1,4], 
                       [1,2,5], [2,0,6], [2,1,7], [2,2,8] ]

const dataAttrsKeys = ["data-row","data-col","data-loc"]

// This generates the board on the fly
function generateBoard(){
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");

  for(let i=0; i<9; i++){;
    let attrVals = dataAttrsVals.shift();
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell cell-hover cell-no-hover";
    boardDiv.appendChild(cellDiv);

    const cubeTainerDiv = document.createElement("div");
    cubeTainerDiv.className = "cubetainer";
    cellDiv.append(cubeTainerDiv);

    const cubeDiv = document.createElement("div");
    cubeDiv.className = "cube cube-hover cube-no-hover";
    dataAttrsKeys.forEach( (attr) => {
      cubeDiv.setAttribute(`${attr}`, attrVals.shift());
    })
    cubeTainerDiv.append(cubeDiv);

    let faceDiv = document.createElement("div");
    faceDiv.className = "face";

    const sides = ["front", "back", "top", "bottom", "left", "right"];
    sides.forEach( (side) => {
      let faceDiv = document.createElement("div");
      faceDiv.className = "face";
      cubeDiv.append(faceDiv);
      faceDiv.classList.add(`${side}`);
    })  

    const gridDiv = document.querySelector(".grid-item");
    gridDiv.append(boardDiv);
  }
}

generateBoard();


// cubes can't be declared before the board is generated
const cubes = document.querySelectorAll(".cube")
const p1 = game.Players.getPlayers()[0];


// GAME PLAY 
// This is the DOM Controller 
function gameLoop(move, player) {
  // First check that there are empty cells
  if(game.Status.movesLeft() > 0) {
    placeMove(move, player);
    // Check if the move is a winner
    switch(game.Status.winCheck()){
      case true:  winnerFound(); break;
      case false: 
        game.Active.changeActivePlayer();
        if(game.Active.getActivePlayer().type === "Computer"){
          getCPUMove(move, player)
        }
        break;
      default: break;
    }
  } else {
    // No move left and no winner. TIE!
    tieFound();
  }
}

// Human player move
const placeToken = (e) => {
  let move = []

  e.preventDefault();
  e.target.textContent = "O"
  e.target.classList.add("token-o")
  e.currentTarget.parentNode.parentNode.classList.add("cell-no-hover")
  e.currentTarget.classList.add("cube-no-hover");
  move.push(e.currentTarget.dataset.row);
  move.push(e.currentTarget.dataset.col);
  gameLoop(move,  p1);
}

cubes.forEach( (cube) => { cube.addEventListener("click", placeToken) })

// Wrapper for Game Engine API
function placeMove(move, player) {
  game.Board.addMove(...move, player)
}

// Computer plays a move
function getCPUMove() {
  const move = game.computerMove(); // result is array
  
  gameLoop(move[0], game.Players.getPlayers()[1])
  placeCPUToken(move[1]);
}


// This code here allows targeting the DOM after CPU moves
// This moves in the opposite direction.
// It gets a move from the game engine, 
// then it find the location for the move in the Board/DOM 
function placeCPUToken(move){
  cubes.forEach( (cube) => {
    if(cube.dataset.loc === `${move}`.toString()){
      cube.parentNode.parentNode.classList.add("cell-no-hover")
      cube.classList.add("cube-no-hover");
      let face = cube.querySelector(".front");
      face.classList.add("token-x");
      face.textContent = "X";
    }
  })
}

// 
async function winnerFound(){
  await sleep(5)
  // update scores
  game.Score.updateScore(game.Active.getActivePlayer())
  // save new scores in to message array
  let message = [ " ", " ", " ", `${game.Score.getScores()[0].points}`, "-", 
  `${game.Score.getScores()[1].points}`, " ", " ", " ",];
  let win = game.Status.getLine();
  await onlyLine(win)  // trigger animation for winning line
  displayScore(message); 
}


async function tieFound(){
  await sleep(1252)
  const message = ["", "", "", "T", "I", "E", "", "", "",];
  await fullBoard();  // trigger animation for no winner or tie
  game.gameReset();
  await sleep(2000);
  displayScore(message)  
}


// ANIMATIONS 
async function gameIntro() {
  await toggleOverlay("on")
  let baseTime = 1000;
  const message = ["T", "I", "C", "T", "A", "C", "T", "O", "E",];

  cubes.forEach( (cube) => {
    baseTime += 250;
    cube.classList = ["cube cube-no-hover"]
    cube.parentNode.parentNode.classList = ["cell cell-no-hover"];

    setTimeout(() => {
      // clear content all other faces except front
      if(message[0] === "T") {
        cube.querySelector(".back").classList.add("winner");
      } else {
        if(message.length % 2 === 0 ) {
          cube.querySelector(".back").classList.add("token-o");
        } else {
          cube.querySelector(".back").classList.add("token-x");
        }
      }
      cube.querySelector(".back").textContent = message.shift();
      cube.classList.add("intro");
    }, baseTime);

    window.removeEventListener("load", gameIntro);
  })

  cubes.forEach( (cube) => {
    cube.classList.remove("cube-no-hover");
    cube.parentNode.parentNode.classList.remove("cell-no-hover");
  });

  await toggleOverlay("off", 6001);
  boardReset();
}

window.addEventListener("load", gameIntro);

// Animate only the Winning Line
async function onlyLine(win) {
  await toggleOverlay("on");
  await sleep(502);

  cubes.forEach( (cube) => {
    cube.classList = ["cube cube-no-hover"];
    cube.parentNode.parentNode.classList = ["cell cell-no-hover"];

    for( let el of win){
      if(cube.dataset.loc === `${el}`.toString() ){
        cube.classList.add("left-face") ;
        let face = cube.querySelector(".front");
        setTimeout( ()=>{
          face.classList = ["face front winner"];
        }, 500);
      }
    }

  });
  await sleep(2002);
  await toggleOverlay("off", 5);
}

// Animate whole board on TIE!
async function fullBoard() {
  await sleep(1003);

  cubes.forEach( (cube) => {
    cube.classList = ["cube cube-no-hover left-face"];
    cube.parentNode.parentNode.classList = ["cell cell-no-hover"];
    setTimeout( ()=>{
      cube.querySelector(".front").classList = ["face front no-winner"];
    }, 250);
  })
}

// Anime whole board during score annoncement
async function displayScore(message){
  await sleep(250);
  await toggleOverlay("on");

  cubes.forEach( (cube) => {
    cube.classList = ["cube cube-no-hover"];
    cube.parentNode.parentNode.classList = ["cell cell-hover cell-no-hover"];
    cube.querySelector(".back").classList.add("scored");
    cube.querySelector(".back").textContent = message.shift();
    cube.classList.add("scores");
  });
  await sleep(1002);
  setTimeout(() => {
    cubes.forEach( (cube) => {
      cube.parentNode.parentNode.classList = ["cell cell-hover"];
      cube.classList = ["cube cube-hover back-to-front"];
      cube.querySelector(".front").textContent = "";
    })
  }, 2002 );

  game.gameReset();
  await toggleOverlay("off", 1);
  boardReset();
}


// Animate whole board during board reset
async function boardReset(){
  let baseTime = 1000;

  await toggleOverlay("on");
  await sleep(2001);

  cubes.forEach( (cube) => {
    baseTime += 150;
    cube.querySelector(".front").textContent = "";
    cube.classList.add("back-to-front"); 

    setTimeout( ()=> {
      const faces = cube.querySelectorAll(".face");
      const sides = ["front", "back", "top", "bottom", "left", "right"];
      cube.classList = ["cube cube-hover cube-no-hover"]
      cube.parentNode.parentNode.classList = ["cell cell-hover cell-no-hover"];
      cube.querySelector(".back").textContent = "";

      setTimeout( () => {
        faces.forEach( (face) => {
          let side = sides.shift();
          face.classList = [`face ${side}`];
        });
        cube.classList = ["cube cube-hover front-face"];
        cube.parentNode.parentNode.classList = ["cell cell-hover"];
      }, 500);

    }, baseTime);

  });
  await sleep(1001);
  await toggleOverlay("off", 3051);
}

// This function is a helper to assist in synchronizing execution thread 
// with the animations by simulating a delay or pause in the execution
async function sleep(milliseconds){
  return new Promise( (resolve) => setTimeout(resolve, milliseconds));
}

// adds an overlay to prevent unwanted input during animation phase
// removes the overlay when ready for input
async function toggleOverlay(state, delay=0){
  const overlay = document.querySelector(".main-container");
  if (state === "on") {
    overlay.classList.toggle("overlay", true);
  } else {
    await sleep(delay);
    overlay.classList.toggle("overlay", false);
  }
}



