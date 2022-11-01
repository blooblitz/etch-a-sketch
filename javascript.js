let currentRows = 32;
let currentColumns = 32;
const grid = document.querySelector(".grid-draw-container");
let darkMode = false;
const btnDarkMode = document.querySelector(".header > #dark-mode ");
let slider = document.getElementById("myRange");
let output = document.getElementById("size");
output.innerHTML = currentRows;
slider.value = currentRows;


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
    //updateGrid(this.value, this.value);
    deleteGrid();
    createGrid(this.value, this.value);
}

/*
    CREATE MAP
*/
/*
let gridMap = new Map();
function fillMap(column, row) {
    for (let x = 0; x < column; x++) {
        for (let y = 0; y < row; y++) {
            let gridElement = document.createElement('div');
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            gridElement.className = "grid-element"
            gridElement.id = `${x}-${y}`;
            gridElement.style = `background-color: #${randomColor}; border: 1px solid black; border-right: 1px; border-top: 1px`;
            gridElement.style.gridColumn = x + 1;
            gridElement.style.gridRow = y + 1;
            gridMap.set(`${x}-${y}`, gridElement);
            grid.appendChild(gridElement);
        }
    }
}*/

//fillMap(100, 100);
createGrid(currentColumns, currentRows);


/*
function updateGrid(column, row) {
    if (column > currentColumns) {
        for (let x = currentColumns; x < column; x++) {
            for (let y = currentRows; y < row; y++) {
                let gridElement = gridMap.get(`${x}-${y}`);
                grid.appendChild(gridElement);
            }
        }
    }
    else if (column < currentColumns) {
        for (let x = 0; x < currentColumns; x++) {
            for (let y = currentRows - 1; y > row; y--) {
            
                let selector = `${x}-${y}`;
            }
        }
    }
    currentColumns = column;
    currentRows = row;
}*/


/*
    Takes two numbers as input, the number of columns and rows desired. It then dynamically
    creates a grid inside of a container by adding the specified grid elements of class grid-element, 
    each of which has a unique ID, 'x-y', where x is the column position, and y is the row position.
*/
function createGrid(column, row) {
    let gridElement;
    let randomColor;
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    grid.addEventListener('mouseover', function(e){
        if(e.target.className !== "grid-draw-container") { //There's probably a better way to do this. The event listener for the draw container must be disabled, otherwise the whole thing occasionally gets filled in.
            e.target.style = 'background-color: gray; border: 1px solid black; border-right: 1px; border-top: 1px';
        }
        //e.target.style = `gridElement.style = background-color: black; border: 1px solid black; border-right: 1px; border-top: 1px`;
    });
    
    for (let x = 0; x < column; x++) {
        for (let y = 0; y < row; y++) {
            gridElement = document.createElement('div');
            gridElement.className = "grid-element"
            gridElement.id = `${x}-${y}`;
            gridElement.style = "border: 1px solid black; border-right: 1px; border-top: 1px";
            gridElement.style.gridColumn = x + 1;
            gridElement.style.gridRow = y + 1;
            grid.appendChild(gridElement);
            //debug
            //console.log(gridElement.getAttribute("class"));
            //console.log(gridElement.getAttribute("id"));
        }
    }
}

function deleteGrid() {
    while (grid.lastChild) {
        grid.removeChild(grid.lastChild);
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

