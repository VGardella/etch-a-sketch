const board = document.getElementById('board');
const button = document.getElementById('btn');

let gridSize = function (event) {
    let row = Number(prompt('Choose the size:'));
    for (let i = 0; i < row*row; i++) {
        rows = document.createElement('div');
        rows.setAttribute('class', 'square');
        rows.style.width = (850/row) + 'px';
        rows.style.height = (850/row) + 'px';
        board.appendChild(rows);
    }
}

button.addEventListener('click', gridSize);