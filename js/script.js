const container = document.querySelector('#container');
const columns = 4;
const rows = 4;

for (let i = 0; i < columns; i++) {
  for (let i = 0; i < rows; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}
