const container = document.querySelector('#container');
const buttons = document.querySelectorAll('.button');
let currentPlayer = true;

const squareIds = [];
const letters = ['a', 'b', 'c', 'd'];
let currentLetterIndex = 0;
let currentNumber = 0;
const board = {
  a: 1,
  b: 1,
  c: 1,
  d: 1
};

function createSquares(numberOfSquares) {
  for (let i = 1; i <= numberOfSquares; i++) {
    currentNumber ++;
    if (currentNumber > 4) {
      currentNumber = 1;
    }
    const letter = letters[currentLetterIndex];
    const newObject = {
      name: letter + currentNumber,
      isOccupied: null,
      domElement: document.createElement('div')
    };
    newObject.domElement.classList.add('square');
    container.appendChild(newObject.domElement);
    newObject.domElement.setAttribute('id', newObject.name);
    newObject.domElement.innerHTML = newObject.name;
    if(i % 4 === 0) {
      currentLetterIndex ++;
    }
    squareIds.push(newObject);
  }
}

createSquares(16);

const player1tokens = [];
const player2tokens = [];

// event listeners on the buttons and player interaction
for (let i = 0; i < buttons.length; i++)
  buttons[i].addEventListener('click', function() {
    const buttonsId = event.target.id;
    const id = buttonsId + board[buttonsId];
    console.log('the button id is', id);
    const targetDiv = document.querySelector(`#${id}`);
    // console.log(targetDiv);
    board[buttonsId] ++;

    if (currentPlayer) {
      targetDiv.classList.add('square-clicked-player1');
      squareIds.isOccupied = 'player1';
      player1tokens.push(id);
      // console.log('targetDiv id', targetDiv.id);
      // console.log('isOccupied is', squareIds.isOccupied);
      console.log('player 1 has', player1tokens);
      currentPlayer = !currentPlayer;
    } else {
      targetDiv.classList.add('square-clicked-player2');
      squareIds.isOccupied = 'player2';
      player2tokens.push(id);
      // console.log('targetDiv id', targetDiv.id);
      // console.log('isOccupied is', squareIds.isOccupied);
      console.log('player 2 has', player2tokens);
      currentPlayer = !currentPlayer;
    }
  });
