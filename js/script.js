const container = document.querySelector('#container');
const buttonContainer = document.querySelector('.button-container');
const buttons = document.querySelectorAll('.button');

const squareIds = []; // where all the square objects go
const letters = ['a', 'b', 'c', 'd', 'e']; // columns
let currentLetterIndex = 0;
let squareNumberId = 0;
const columnHeights = {};
let currentPlayer = true;
const player1tokens = [];
const player2tokens = [];
let win = false;
const rows = ['a', 'b', 'c', 'd', 'e'];

function verticalWinMatt(array) {

  // return array.sort((a, b) => a > b).forEach((pos, index, arr) => {
  //   if(index > array.length - 4) return;
  //   if(parseInt(pos[1]) + 3 === parseInt(arr[index + 3][1])) {
  //     return win = true;
  //   }
  // });

  let verticalWinResult = false;

  const newArray = array.map(pos => {
    const letterNumber = rows.indexOf(pos[0]) + 1;
    return [letterNumber, parseInt(pos[1])];
  });

  const sortedAndFilteredVertically = newArray.sort((a, b) => a[0] > b[0]).filter((posArray, index, array) => {
    if(index === 0) return true;
    return posArray[0] !== array[index -1][0];
  });

  if(sortedAndFilteredVertically.length > 4) {
    const verticalOK = parseInt(sortedAndFilteredVertically[0][0]) + 3 === sortedAndFilteredVertically[3][0];
    verticalWinResult = verticalOK;
  }

  return verticalWinResult;
}

function horizontalWinMatt(array) {


  // return array.sort((a, b) => a[1] > b[1]).filter((pos, index, arr) => {
  //   if(index === 0) return true;
  //   return pos[1] === arr[index - 1][1];
  // }).length === 4;

  let horizontalWinResult = false;

  const newArray = array.map(pos => {
    const letterNumber = rows.indexOf(pos[0]) + 1;
    return [letterNumber, parseInt(pos[1])];
  });

  const sortedAndFilteredHorizontal = newArray.sort((a, b) => a[1] > b[1]).filter((posArray, index, array) => {
    if(index === 0) return true;
    return posArray[1] !== array[index -1][1];
  });

  if(sortedAndFilteredHorizontal.length > 4) {
    const horizontalOK = parseInt(sortedAndFilteredHorizontal[0][1]) + 3 === sortedAndFilteredHorizontal[3][1];
    horizontalWinResult = horizontalOK;
  }

  return horizontalWinResult;
}

function diagonalWinMatt(array) {
  let diagonalWinResult = false;

  const newArray = array.map(pos => {
    const letterNumber = rows.indexOf(pos[0]) + 1;
    return [letterNumber, parseInt(pos[1])];
  });

  const sortedAndFilteredVertically = newArray.sort((a, b) => a[0] > b[0]).filter((posArray, index, array) => {
    if(index === 0) return true;
    return posArray[0] !== array[index -1][0];
  });

  const sortedAndFilteredHorizontal = newArray.sort((a, b) => a[1] > b[1]).filter((posArray, index, array) => {
    if(index === 0) return true;
    return posArray[1] !== array[index -1][1];
  });

  if(sortedAndFilteredVertically.length > 4 || sortedAndFilteredHorizontal.length > 4) {
    const verticalOK = parseInt(sortedAndFilteredVertically[0][0]) + 3 === sortedAndFilteredVertically[3][0];
    const horizontalOK = parseInt(sortedAndFilteredHorizontal[0][1]) + 3 === sortedAndFilteredHorizontal[3][1];
    diagonalWinResult = verticalOK && horizontalOK;
  }

  return diagonalWinResult;
}


// creating buttons
function createButtons(numberOfColumns) {
  for (let i = 0; i < numberOfColumns; i++) {
    const button = document.createElement('div');
    button.classList.add('button');
    const letter = 'abcdefghijklmnopqrstuvwxyz'[i];
    button.id = letter;
    button.textContent = letter.toUpperCase();
    buttonContainer.appendChild(button);
    button.addEventListener('click', handleButtonClick);
  }
}
// }
const columnCount = 7;
const rowCount = 7;
createSquares(rowCount, columnCount);
createButtons(columnCount);

// squareLetterId = Columns (numberOfColumns)
// squareNumberId = Rows (numberOfRows)

function createSquares(numberOfRows, numberOfColumns) {
  // const numberOfSquares = numberOfRows * numberOfColumns;
  for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
    const columnDiv = document.createElement('div');
    columnDiv.classList = 'column';
    // TODO: Add click event handler to the column?
    const squareLetterId = 'abcdefghijklmnopqrstuvwxyz'[columnNumber];
    columnHeights[squareLetterId] = 1;
    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
      const newObject = {
        name: `${squareLetterId}${numberOfRows - rowNumber}`,
        row: rowNumber, column: columnNumber,
        isOccupied: null,
        domElement: document.createElement('div')
      };
      newObject.domElement.classList.add('square');
      newObject.domElement.setAttribute('id', newObject.name);
      newObject.domElement.setAttribute('row', rowNumber);
      newObject.domElement.setAttribute('column', columnNumber);
      newObject.domElement.innerHTML = newObject.name;
      squareIds.push(newObject);
      columnDiv.appendChild(newObject.domElement);
    }
    const container = document.getElementById('container');
    container.appendChild(columnDiv);
  }
}


// event listeners on the buttons and player interaction
function handleButtonClick(event) {
  const buttonsId = event.target.id;
  const id = buttonsId + columnHeights[buttonsId];
  const targetDiv = document.querySelector(`#${id}`);
  // console.log(targetDiv);
  columnHeights[buttonsId] ++;

  if (currentPlayer) {
    targetDiv.classList.add('square-clicked-player1');
    targetDiv.setAttribute('player', 1);
    squareIds.filter(square => square.name === id)[0].isOccupied = 'player1';
    player1tokens.push(id);
    currentPlayer = !currentPlayer;
    checkForWin();

  } else {
    targetDiv.classList.add('square-clicked-player2');
    targetDiv.setAttribute('player', 2);
    squareIds.filter(square => square.name === id)[0].isOccupied = 'player2';
    player2tokens.push(id);
    currentPlayer = !currentPlayer;
    checkForWin();
  }
}

// WIN LOGIC!

function checkForWin() {
  // console.log('has player 1 won diagonally?', diagonalWin(player1tokens));
  // console.log('has player 1 won vertically?', verticalWin(player1tokens));
  const winner = horizontalWin() || verticalWin();
  if(winner) {
    document.getElementById('log').textContent = 'Winner is player ' + winner;
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
