const board = document.getElementById('board');
const button = document.getElementById('btn');

let gridSize = function (event) {
    let row = Number(prompt('Choose the size:'));
    for (let i = 0; i < row*row; i++) {
        rows = document.createElement('div');
        rows.setAttribute('class', 'square');
        board.appendChild(rows);
    }
}

button.addEventListener('click', gridSize);