const board = document.getElementById('board');
const size = document.getElementById('size');
const reset = document.getElementById('reset');
const clean = document.getElementById('clean');
const overlap = document.getElementById('overlap');
const fade = document.getElementById('fade');

let grid = 0;
let row = 0;
let strokeType = null;

// board creation

function gridSize() {
    if (row === 0) {
        row = Number(prompt('Choose the size:'));
    }
    
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

function deleteGrid() {
    grid.forEach((cell) => board.removeChild(cell));
}

function createBoard() {
    if (grid === 0) {
        gridSize();
    }
    else if (grid !== 0) {
        deleteGrid();
        gridSize();
    }
}

function resetBoard() {
    if (grid !== 0) {
        deleteGrid();
        row = 0;
        grid = 0;
        createBoard();    
    } 
    else if (grid === 0) {
        createBoard();
    }
}

// drawing

function colorChange(event) {
    grid.forEach((cell) => cell.addEventListener('mouseover', function() {
        this.classList.add('color');
        strokeType = 'color';
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

function colorFade(event) {
    grid.forEach((cell) => cell.addEventListener('mouseout', function() {
        this.classList.remove('fade');
        void this.offsetWidth; // requesting element dimensions cause reflow and restarts the animation.
        this.classList.add('fade');
        strokeType = 'fade';
    }))
}

// button activation

overlap.addEventListener('click', () => {
    createBoard();
    colorChange();
    increaseOpacity();
})

fade.addEventListener('click', () => {
    createBoard();
    colorFade();
})

reset.addEventListener('click', resetBoard)

clean.addEventListener('click', () => {
    if (strokeType === 'fade') {
        grid.forEach((cell) => {
            createBoard();
            colorFade();
        })
    }
    else if (strokeType === 'color') {
        grid.forEach((cell) => {
            createBoard();
            colorChange();
            increaseOpacity();
        })
    }
})