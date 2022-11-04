const btnDarkMode = document.querySelector(".header > #dark-mode ");
const btnReset = document.querySelector(".reset");
const btnColor = document.querySelector("#select-color");
const btnErase = document.querySelector(".erase");
const btnShade = document.querySelector(".shade");
const btnLighten = document.querySelector(".lighten");
const grid = document.querySelector(".grid-draw-container");

let darkMode = false;
let currentRows = 32;
let currentColumns = 32;
let drawColor = "#000000";
let slider = document.getElementById("myRange");
let output = document.getElementById("size");
let mouseDown = false;


/*
    Takes two numbers as input, the number of columns and rows desired. It then dynamically
    creates a grid inside of a container by adding the specified grid elements of class grid-element, 
    each of which has a unique ID, 'x-y', where x is the column position, and y is the row position.
*/
function createGrid(column, row) {
    let gridElement;
    for (let x = 0; x < column; x++) {
        for (let y = 0; y < row; y++) {
            gridElement = document.createElement('div');
            gridElement.className = "grid-element"
            //gridElement.id = `${x}-${y}`;
            gridElement.style = "background-color: white; border: 1px solid black; border-right: 1px; border-top: 1px";
            gridElement.style.gridRow = y + 1;
            gridElement.style.gridColumn = x + 1;
            gridElement.addEventListener('mouseover', draw);
            gridElement.addEventListener('mousedown', draw);
            grid.appendChild(gridElement);
        }
    }
}

/*
    Deletes the entire grid by remove every single child <div> from the container.
*/
function deleteGrid() {
    while (grid.lastChild) {
        grid.removeChild(grid.lastChild);
    }
}

function reset() {
    let elems = document.querySelectorAll(".grid-element");
    for (let i = 0; i < elems.length; i++){
        elems[i].style.backgroundColor = "white";
    }
}

/*
    Helper function to validate input. Only accepts whole integer numbers
    between 1-100
*/
function validateInput(input) {
    if (isNaN(input)) return "Not a number";
    if (input < 1 || input > 100) return "Out of range. Please enter a number between 1-100.";
    return ~~input; //Eliminates decimals
}

function changeColor(e) {
    drawColor = e.target.value;
}

function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = drawColor;
    
}

function shade() {

}

function lighten() {

}

function erase() {
    drawColor = "white";
}

function toggleGrid() {
    //swap out classs for grid and gridelements
}

function setup() {
    //Initializes a grid on site load.
    createGrid(currentColumns, currentRows);
    output.innerHTML = currentRows;
    slider.value = currentRows;
    grid.addEventListener("mousedown", () => mouseDown = true);
    grid.addEventListener("mouseup", () => mouseDown = false);
    btnReset.addEventListener("click", reset);
    btnColor.addEventListener("change", changeColor, false);
    btnErase.addEventListener("click", erase);
    btnDarkMode.addEventListener("click", () => {
        if (darkMode) {
            document.querySelector(".main-flex-wrapper").style = "background-color: rgb(229, 231, 235)";
            darkMode = false;
        } else {
            document.querySelector(".main-flex-wrapper").style = "background-color: rgb(2, 7, 17)";
            darkMode = true;
        }
    });

    // Using oninput to get immediate feedback of grid size.
    slider.oninput = function() {
        output.innerHTML = this.value;
    }

    // Using onchange to only change the grid size when the focus is lost on the slider.
    slider.onchange = function() {
        deleteGrid();
        createGrid(this.value, this.value);
    }    
}

window.onload = () => {
    setup();
}