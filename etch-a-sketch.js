const board = document.getElementById('board');
const create = document.getElementById('create');
const erase = document.getElementById('erase');
const overlap = document.getElementById('overlap');
const fade = document.getElementById('fade');
const reset = document.getElementById('reset');

let grid = 0;


// board creation

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

function createBoard(event) {
    if (grid === 0) {
        gridSize();
    }
    else if (grid !== 0) {
        deleteGrid();
        gridSize();
    }
}

// add event listeners

function addColorClass(event) {
    this.classList.add('color');
}

function addFadeClass(event) {
    this.classList.remove('fade');
    void this.offsetWidth; // requesting element dimensions cause reflow and restarts the animation.
    this.classList.add('fade');
}

function defineOpacity(event) {
        let style = getComputedStyle(this);
        let opacity = parseFloat(style.opacity);
        let newOpacity = opacity + 0.2;
        this.style.opacity = newOpacity;
}

// drawing

function colorChange(event) {
    grid.forEach((cell) => cell.addEventListener('mouseover', addColorClass));
}

function increaseOpacity(event) {
    grid.forEach((cell) => cell.addEventListener('mouseover', defineOpacity));
}

function colorFade(event) {
    grid.forEach((cell) => cell.addEventListener('mouseout', addFadeClass));
}


 // erase and reset

 function eraseBoard(event) {
    grid.forEach((cell) => cell.addEventListener('mouseover', function() {
        this.classList.remove('fade');
        this.classList.remove('color');
    }))
 }

 function resetBoard(event) {
    grid.forEach((cell) => {
        cell.classList.remove('fade');
        cell.classList.remove('color');


    });
};

// button activation

overlap.addEventListener('click', () => {
    resetBoard();
    colorChange();
    increaseOpacity();
})

fade.addEventListener('click', () => {
    resetBoard();
    colorFade();
})

create.addEventListener('click', () => {
    createBoard();
})

erase.addEventListener('click', () => {
    eraseBoard();
})

reset.addEventListener('click', () => {
    resetBoard();

})