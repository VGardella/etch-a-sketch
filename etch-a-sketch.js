const board = document.getElementById('board');
const button = document.getElementById('btn');
let grid = 0;

function gridSize(event) {
    let row = Number(prompt('Choose the size:'));
    if (row > 100) {
        alert('Choose a number between 1 and 100!');
    }
    else if (row <= 0) {
        alert('You can use numbers lower than 1...')
    }
    else if (row <= 100) {
        for (let i = 0; i < row*row; i++) {
        rows = document.createElement('div');
        rows.setAttribute('class', 'square');
        rows.style.width = (850/row) + 'px';
        rows.style.height = (850/row) + 'px';
        board.appendChild(rows);
        };
    }
    grid = document.querySelectorAll('.square');
}

function deleteGrid(event) {
    grid.forEach((cell) => board.removeChild(cell));
}

function colorChange(event) {
    grid.forEach((cell) => cell.addEventListener('mouseover', function() {
        this.classList.add('color');
    }))
}

function increaseOpacity(event) {
    grid.forEach((cell) => cell.addEventListener('mouseover', function() {
        let style = getComputedStyle(this);
        let opacity = parseFloat(style.opacity);
        let newOpacity = opacity + 0.2;
        this.style.opacity = newOpacity;
    }))
}

let createBoard = function(event) {
    if (grid === 0) {
        gridSize();
    }
    else if (grid !== 0) {
        deleteGrid();
        gridSize();
    }
    colorChange();
    increaseOpacity();
}

button.addEventListener('click', createBoard);