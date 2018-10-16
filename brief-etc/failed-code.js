// matt's win logic
function verticalWin(array) {
  return array.sort((a, b) => a > b).forEach((pos, index, arr) => {
    if(index > array.length - 4) return;
    if(parseInt(pos[1]) + 3 === parseInt(arr[index + 3][1])) {
      return win = true;
    }
  });
}

function horizontalWin(array) {
  return array.sort((a, b) => a[1] > b[1]).filter((pos, index, arr) => {
    if(index === 0) return true;
    return pos[1] === arr[index - 1][1];
  }).length === 4;
}



// creating buttons
for (let i = 0; i < 4; i++) {
  const button = document.createElement('div');
  button.classList.add('button');
  container.appendChild(button);
}

// trying to add ids to all the squares (doesn't work; i = undefined)
const squares = document.querySelectorAll('.square');
squares.map(function(square) {
  square.setAttribute('id', squareIds[i]);
})
;

// and again
const squares = document.querySelectorAll('.square');
for (let i = 0; i < squares.length; i++) {
  squares.setAttribute('id', squareIds[i]);
}

const squares = document.querySelectorAll('.square');
squares.forEach(function(square) {
  squares.setAttribute('id', squareIds[i]);
});

for (let i = 0; i < squares.length; i++) {
  for (let i = 0; i < squareIds.length; i++) {
    squares.setAttribute('id', squareIds[i]);
  }
}

// creating grid items
let square;
for (let i = 15; i >= 0; i--) {
  // for (let i = 0; i < rows; i++) {
  square = document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
  square.setAttribute('id', squareIds[i]);
  square.innerHTML = squareIds[i];
}



// 13th & 14th Oct

// console.log('we are on');

// const columnA = [1, 2, 3, 4];
// const columnB = [1, 2, 3, 4];
// const columnC = [1, 2, 3, 4];
// const columnD = [1, 2, 3, 4];
// const columns = [columnA, columnB, columnC, columnD];
// // console.log(columns);

columns = [ [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4] ];

const container = document.getElementById('container');
let rows = columns[0];

// function createGrid() {
//   columns.forEach(function(column) {
//     rows.forEach(function(row) {
//       const rowSquare = document.createElement('div');
//       rowSquare.classList.add('row');
//       const columnSquare = document.createElement('div');
//       columnSquare.classList.add('column');
//       container.appendChild(columnSquare);
//       // console.log(columns);
//       columnSquare.appendChild(rowSquare);
//     });
//   });
// }
//
// createGrid();
