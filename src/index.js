import './style.css'
import _, { functionsIn } from 'lodash'


const cubes = document.querySelectorAll(".cube")


const start = (e) => {
  e.preventDefault();
  let baseTime = 1000;
  let message = ["T", "I", "C", "T", "A", "C", "T", "O", "E",];

  cubes.forEach( (cube) => {
    baseTime += 250;

    setTimeout(() => {
      cube.querySelector(".top").textContent = "";
      cube.querySelector(".bottom").textContent = "";
      cube.querySelector(".left").textContent = "";
      cube.querySelector(".right").textContent = "";
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
      cube.style.animation = "startAnimation 2s 1 ease-in-out forwards";
      
    }, baseTime )

    
    window.removeEventListener("load", start)
  })
}


window.addEventListener("load", start)



const game = (function(){} )();

