const buttonContainer = document.querySelector('.button-container');

const squareIds = []; // where all the square objects go
const columnHeights = {};
let currentPlayer = true;

// creating buttons
function createButtons(numberOfColumns) {
  for (let i = 0; i < numberOfColumns; i++) {
    const button = document.createElement('div');
    button.classList.add('button');
    const letter = 'abcdefghijklmnopqrstuvwxyz'[i];
    button.id = letter;
    // button.textContent = letter.toUpperCase();
    buttonContainer.appendChild(button);
    button.addEventListener('click', handleButtonClick);
  }
}

const columnCount = 7;
const rowCount = 7;
createSquares(rowCount, columnCount);
createButtons(columnCount);

function createSquares(numberOfRows, numberOfColumns) {
  for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
    const columnDiv = document.createElement('div');
    columnDiv.classList = 'column';
    // TODO: Add click event handler to the column?
    const squareLetterId = 'abcdefghijklmnopqrstuvwxyz'[columnNumber];
    columnHeights[squareLetterId] = 1;
    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
      const newObject = {
        name: `${squareLetterId}${numberOfRows - rowNumber}`,
        row: rowNumber,
        column: columnNumber,
        isOccupied: null,
        domElement: document.createElement('div')
      };
      newObject.domElement.classList.add('square');
      newObject.domElement.setAttribute('id', newObject.name);
      newObject.domElement.setAttribute('row', rowNumber);
      newObject.domElement.setAttribute('column', columnNumber);
      squareIds.push(newObject);
      columnDiv.appendChild(newObject.domElement);
    }
    const container = document.getElementById('container');
    container.appendChild(columnDiv);
  }
}

// if (currentPlayer) {
//   const buttons = document.querySelectorAll('.button');
//   buttons.forEach(button => {
//     button.classList.toggle('.button-player2');
//   });
// }

// event listeners on the buttons and player interaction
function handleButtonClick(event) {
  const buttonsId = event.target.id;
  const id = buttonsId + columnHeights[buttonsId];
  const targetDiv = document.querySelector(`#${id}`);
  columnHeights[buttonsId] ++;

  if (currentPlayer) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.classList.remove('button-player1');
      button.classList.add('button-player2');
    });
    targetDiv.classList.add('clicked-player1');
    targetDiv.setAttribute('player', 1);
    squareIds.filter(square => square.name === id)[0].isOccupied = 'player1';
    currentPlayer = !currentPlayer;
    checkForWin();

  } else {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.classList.remove('button-player2');
      button.classList.add('button-player1');
    });
    targetDiv.classList.add('clicked-player2');
    targetDiv.setAttribute('player', 2);
    squareIds.filter(square => square.name === id)[0].isOccupied = 'player2';
    currentPlayer = !currentPlayer;
    checkForWin();
  }
}

// WIN CONDITIONS:

function checkForWin() {
  const winner = horizontalWin() || verticalWin();
  if(winner) {
    const logBox = document.getElementById('log');
    logBox.classList.remove('hide-on-start');
    logBox.textContent = 'Winner is player ' + winner;
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.removeEventListener('click', handleButtonClick);
    });
    // showModal();
  }
}

function horizontalWin() {
  const winStreakLength = 4;
  // Check every row
  for (let rowNumber = 0; rowNumber < rowCount; rowNumber++) {
    // Offset the checking position
    for (let offset = 0; offset < (columnCount - winStreakLength + 1); offset++) {
      const elementsToCheck = [];
      // Check for the length of the win streak
      for (let columnNumber = 0; columnNumber < winStreakLength; columnNumber++) {
        elementsToCheck.push(getElementAt(rowNumber, columnNumber + offset));
      }
      const winner = elementsAreAllOwnedByPlayer(elementsToCheck);
      if (winner) {
        return winner;
      }
    }
  }
}

function verticalWin() {
  const winStreakLength = 4;
  // Check every column
  for (let columnNumber = 0; columnNumber < columnCount; columnNumber++) {
    // Offset the checking position
    for (let offset = 0; offset < (rowCount - winStreakLength + 1); offset++) {
      const elementsToCheck = [];
      // Check for the length of the win streak
      for (let rowNumber = 0; rowNumber < winStreakLength; rowNumber++) {
        const checkElement = getElementAt(rowNumber + offset, columnNumber);
        elementsToCheck.push(checkElement);
      }
      const winner = elementsAreAllOwnedByPlayer(elementsToCheck);
      if (winner) {
        return winner;
      }
    }
  }
}

function elementsAreAllOwnedByPlayer(elements) {
  const owners = {
    player1: 0,
    player2: 0
  };
  elements.forEach(element => {
    const elementOwner = element.getAttribute('player');
    if (elementOwner === '1') {
      owners.player1++;
    } else if (elementOwner === '2') {
      owners.player2++;
    }
  });
  if (owners.player1 === elements.length) {
    return 1;
  }
  if (owners.player2 === elements.length) {
    return 2;
  }
  return 0;
}

function getElementAt(row, column) {
  return document.querySelector(`[row="${row}"][column="${column}"]`);
}

// function showModal() {
//
// }
