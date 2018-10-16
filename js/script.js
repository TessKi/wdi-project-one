const container = document.querySelector('#container');
// const buttonContainer = document.querySelector('.button-container');
const buttons = document.querySelectorAll('.button');

const squareIds = []; // where all the square objects go
const letters = ['a', 'b', 'c', 'd', 'e']; // columns
let currentLetterIndex = 0;
let squareNumberId = 0;
const board = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  e: 1
};
let currentPlayer = true;
const player1tokens = [];
const player2tokens = [];

// creating buttons
// function createButtons(numberOfColumns) {
//   for (let i = 0; i < numberOfColumns; i++) {
//     const button = document.createElement('div');
//     button.classList.add('button');
//     buttonContainer.appendChild(button);
//     for (let i = 0; i < numberOfColumns; i++) {
//       button.setAttribute('id', letters[i]);
//       // console.log(`this is the new buttons ${button}`);
//     }
//   }
// }
// createButtons(4);

// squareLetterId = Columns (numberOfColumns)
// squareNumberId = Rows (numberOfRows)

function createSquares(numberOfRows, numberOfColumns) {
  const numberOfSquares = numberOfRows * numberOfColumns;
  for (let i = 1; i <= numberOfSquares; i++) {
    squareNumberId ++;
    if (squareNumberId > numberOfRows) {
      squareNumberId = 1;
    }
    const squareLetterId = letters[currentLetterIndex];
    const newObject = {
      name: squareLetterId + squareNumberId,
      isOccupied: null,
      domElement: document.createElement('div')
    };
    newObject.domElement.classList.add('square');
    container.appendChild(newObject.domElement);
    newObject.domElement.setAttribute('id', newObject.name);
    newObject.domElement.innerHTML = newObject.name;
    if(i % numberOfColumns === 0) {
      currentLetterIndex ++;
    }
    squareIds.push(newObject);
  }
}

createSquares(4, 4);

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

// WIN LOGIC, whaaaaa!
