const board = document.getElementById('board');
const size = document.getElementById('size');
const reset = document.getElementById('reset');
const clean = document.getElementById('clean');
const pencil = document.getElementById('pencil-color');
const modal = document.getElementById('modal');
const overlap = document.getElementById('overlap');
const fade = document.getElementById('fade');

let grid = 0;
let row = 0;
let strokeType = null;
let color = 'black';

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
        rows.style.width = (750/row) + 'px';
        rows.style.height = (750/row) + 'px';
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
    strokeType = null;
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

function colorChange() {
    grid.forEach((cell) => cell.addEventListener('mouseover', function() {
        this.classList.add('color');
        strokeType = 'color';
    }))
}

function increaseOpacity() {
    grid.forEach((cell) => cell.addEventListener('mouseover', function() {
        let style = getComputedStyle(this);
        let opacity = parseFloat(style.opacity);
        let newOpacity = opacity + 0.2;
        this.style.opacity = newOpacity;
    }))
}

function colorFade() {
    grid.forEach((cell) => cell.addEventListener('mouseout', function() {
        this.classList.remove('fade');
        void this.offsetWidth; // requesting element dimensions cause reflow and restarts the animation.
        this.classList.add('fade');
        strokeType = 'fade';
    }))
}

// modal

function colorPencilModal() {
    let color = 'black';
    let root = document.querySelector(':root');
    if (modal.classList.contains('hidden')) { // si esta oculto
        modal.classList.toggle('hidden');
    }
    else if (!modal.classList.contains('hidden')) {
        let input = document.getElementsByName('pencil-color');
        input.forEach((item) => {
            if (item.checked) {
                color = item.value;
            }
        })
        root.style.setProperty('--stroke-color', color);
        modal.classList.toggle('hidden');
    }
}


// button activation

overlap.addEventListener('click', () => {
    if (strokeType === null || strokeType === 'fade') {
        createBoard();
        colorChange();
        increaseOpacity();
    }

})

fade.addEventListener('click', () => {
    if (strokeType === null || strokeType === 'color') {
        createBoard();
        colorFade();
    }
})

reset.addEventListener('click', resetBoard)

clean.addEventListener('click', () => {
    if (strokeType === 'fade') {
        createBoard();
        colorFade();
    }
    else if (strokeType === 'color') {
        createBoard();
        colorChange();
        increaseOpacity();
    }
})

pencil.addEventListener('click', colorPencilModal)