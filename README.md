# Tic-Tac-Toe
Tic-Tac-Toe Game - This project is part of The Odin Project foundation's JavaScript curriculum.



## Goal:
Create a Tic-Tac-Toe game that you can play in the browser.

### Raw Instructions / Requirements


1. Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.

2. You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

  1.Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

  2. In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

  3. If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example both of how you might approach tackling this project as well as how you might organize and structure your code.

3. Focus on getting a working game in the console first. Make sure you include logic that checks for when the game is over! You should be checking for all winning 3-in-a-rows and ties. Try to avoid thinking about the DOM and your HTML/CSS until your game is working.

4. Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).

5. Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken!

6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!

### Parsed Requirements and Tasks
- [X] Setup project with Boiler plate HTML, CSS and JavaScript.
- [X] Create git repo and make first commit.
- [X] Have a little as possible global code.  Use Factories and IIFEs to achieve this. 
- [X] The board is an array of type GameBoard. The Cells are going to store Player objects.
- [X] Try to fit as much functionality into the GameBoard, Players, Game objects.  
- [X] Read "Building a House from the Inside" for inspiration.
- [X] Make a console version first.
- [X] Make sure that your game is decoupled from the front-end or webpage.
- [X] Interact with the DOM to place "O"'s and "X"'s on the board.
- [X] Player should be able to click on a board square/cell and place their token there if it is empty.
- [X] Prevent players from placing a move in a square that is already taken.
- [X] Add interface to change the players names.
- [X] Add a restart button.
- [X] Show the scores

#### Non-requirement Extras
- [X] Animated board and cells using cubes
- [X] Simple interface using the board only
- [X] Display scores and messages on the board using animations
- [X] Asynchronous functions to assist with animation timing synchronization 
- [X] Abstracted all the game logic into a Game Engine module.


### Running the code

##### Running on Github Pages:
This project uses Webpack, so you can't just push your commits to github and expect it to deploy flawlessly to github pages.  You have to jump through some extra hoops for that to work, basically you have to remember to run some scripts before you are reday to make your commit.

Yes, this is annoying. 

I still forget to do it sometimes, and I have to add another commit with just the `dist` files.


Googling revealed that there is already an npm package to help with this, but I still have doubts as to how much it helps.  Anyway, the package is called `gh-pages`.

Install it via `npm install gh-pages --save-dev` and then add the following script commands to the package.json file `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`

The package.json file script section should look something like this.
```json
    "build": "webpack --mode production",
    "dev": "webpack serve",
    "watch": "webpack --watch",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
```

This basically runs both the production and github deploy scripts together.  Once it is done building you may have to stop the production server.

Go to your github repo and do a `git status` and the add all the newly modified files with `git add <file>` and then do your commit `git commit` and then finally push your commit to github `git push`. 






