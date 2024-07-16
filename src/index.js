import './style.css'
import _, { functionsIn, set } from 'lodash'
const game = require("./game_engine.js")
// import {GameController} from "./game_engine.js"

const cubes = document.querySelectorAll(".cube")


const placeToken = (e) => {
  // displays content on the front face
  // e.preventDefault();
  e.stopPropagation();
  let baseTime = 1000;
  
  e.target.textContent = "O"
  e.target.classList.add("token-o")
  // e.target.style = "background-color: grey";
  e.currentTarget.parentNode.parentNode.style = "pointer-events: none;"
  e.currentTarget.style = "pointer-events: ;"
  
}


const start = (e) => {
  // displays content on the back face
  e.preventDefault();
  let baseTime = 1000;
  let message = ["T", "I", "C", "T", "A", "C", "T", "O", "E",];

  cubes.forEach( (cube) => {
    baseTime += 250;
      // clear content all other faces except the one facing fowards
      cube.querySelector(".top").textContent = "";
      cube.querySelector(".bottom").textContent = "";
      cube.querySelector(".left").textContent = "";
      cube.querySelector(".right").textContent = "";
      cube.querySelector(".front").textContent = "";
      cube.style = "pointer-events: none;"
      cube.parentNode.parentNode.style = "pointer-events: none;"
    setTimeout(() => {
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
      // cube.style.animation = "startAnimation 2s 1 ease-in-out forwards";
      cube.classList.add("intro");
      setTimeout(() => {
        cube.classList.add("front-face");
        // cube.querySelector(".back").style = "background-color: blueviolet;"    
        cube.classList.remove("intro");
      }, baseTime + 250 );
    }, baseTime );
    window.removeEventListener("load", start);
  })
}

window.addEventListener("load", start)



const scoresAnimation = (e) => {
  // displays content on the bottom face
  // e.preventDefault();
  let baseTime = 1000;
  let message = [" ", " ", " ", "2", "-", "2", " ", " ", " ",];

  cubes.forEach( (cube) => {
    baseTime += 250;
    // clear content all other faces except the one facing fowards
    cube.querySelector(".top").textContent = "";
    cube.querySelector(".bottom").textContent = "";
    cube.querySelector(".left").textContent = "";
    cube.querySelector(".right").textContent = "";
    cube.querySelector(".front").textContent = "";
    cube.querySelector(".back").textContent = "";
    setTimeout(() => {
      cube.classList = ["cube cube_hover score"]
      cube.style = "pointer-events: none;"
      cube.parentNode.parentNode.style = "pointer-events: none;"
      cube.querySelector(".bottom").textContent = message.shift();
      cube.classList.add("spin7");
      setTimeout(() => {
        cube.classList = ["cube cube_hover front-face"];
        // cube.style = "pointer-events: all;"
      }, baseTime * 1.3 );
    }, baseTime) 
  })
  cubes[cubes.length - 1].addEventListener("animationend", () => {
    setTimeout(() => {
      cubes.forEach( (cube) => { 
        cube.addEventListener("click", placeToken);
        cube.style = "pointer-events: all;" 
        cube.parentNode.parentNode.style = "pointer-events: all;"
      })

    }, 9500)
  })
  
}


setTimeout(() => {
  scoresAnimation();
}, 8000)
// const game = GameController()







game.gameController()