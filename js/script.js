const container = document.querySelector('#container');
const buttons = document.querySelectorAll('.button');

const columns = 4;
const rows = 4;
const squareIds = [];
const letters = ['a', 'b', 'c', 'd'];
let currentLetterIndex = 0;
let currentNumber = 0;

function createSquares(numberOfSquares) {
  for(let i = 1; i <= numberOfSquares; i++){
    currentNumber ++;
    if(currentNumber > 4) {
      currentNumber = 1;
    }
    const number = currentNumber;
    const letter = letters[currentLetterIndex];
    const newObject = {
      name: letter + number,
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




const board = {
  a: 1,
  b: 1,
  c: 1,
  d: 1
};

// creating grid items
// let square;
// for (let i = 15; i >= 0; i--) {
//   // for (let i = 0; i < rows; i++) {
//   square = document.createElement('div');
//   square.classList.add('square');
//   container.appendChild(square);
//   square.setAttribute('id', squareIds[i]);
//   square.innerHTML = squareIds[i];
// }
// }

// event listeners on the buttons
for (let i = 0; i < buttons.length; i++)
  buttons[i].addEventListener('click', function() {
    const buttonsId = event.target.id;
    const id = buttonsId + board[buttonsId];
    console.log('the button id is...', id);
    const targetDiv = document.querySelector(`#${id}`);
    console.log(targetDiv);
    board[buttonsId] ++;

  });
