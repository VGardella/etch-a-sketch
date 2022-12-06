const board = document.getElementById('board');
const size = document.getElementById('size');
const reset = document.getElementById('reset');
const overlap = document.getElementById('overlap');
const fade = document.getElementById('fade');

let grid = 0;
let row = 0;


// board creation

function gridSize(event) {
    row = Number(prompt('Choose the size:'));
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

function createBoard(event) {
    if (grid === 0) {
        gridSize();
    }
    else if (grid !== 0) {
        deleteGrid();
        gridSize();
    }
}

function resetBoard(event) {
    grid.forEach((cell) => {
        cell.style.cssText = 'background-color: transparent;';
    })
}

// drawing

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

function colorFade(event) {
    grid.forEach((cell) => cell.addEventListener('mouseout', function() {
        this.classList.remove('fade');
        void this.offsetWidth; // requesting element dimensions cause reflow and restarts the animation.
        this.classList.add('fade');
    }))
}

// reset drawing functions

function resetFade(event) {
    grid.forEach((cell) => cell.removeEventListener('mouseout', function() {
        this.classList.remove('fade');
        void this.offsetWidth; // requesting element dimensions cause reflow and restarts the animation.
        this.classList.add('fade');
    }))
}

function resetOpacity(event) {
    grid.forEach((cell) => cell.removeEventListener('mouseover', function() {
        let style = getComputedStyle(this);
        let opacity = parseFloat(style.opacity);
        let newOpacity = opacity + 0.2;
        this.style.opacity = newOpacity;
    }))
    grid.forEach((cell) => cell.removeEventListener('mouseover', function() {
        this.classList.add('color');
    }))
}


// button activation

size.addEventListener('click', () => {
    createBoard();
});

overlap.addEventListener('click', () => {
    resetBoard();
    colorChange();
    increaseOpacity();
})

reset.addEventListener('click', () => {
    resetBoard();
})

fade.addEventListener('click', () => {
    resetBoard();
    resetOpacity();
    colorFade();
})