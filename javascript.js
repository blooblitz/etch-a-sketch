const RANGE = 255;
const btnDarkMode = document.querySelector(".header > #dark-mode ");
const btnReset = document.querySelector(".reset");
const btnColor = document.querySelector(".color");
const btnShade = document.querySelector(".shade");
const btnLighten = document.querySelector(".lighten");
const btnErase = document.querySelector(".erase");
const btnToggleGrid = document.querySelector(".toggle-grid");
const grid = document.querySelector(".grid-draw-container");

let darkMode = false;
let currentRows = 32;
let currentColumns = 32;
let drawColor = "#000000";
let slider = document.getElementById("myRange");
let output = document.getElementById("size");
let mouseDown = false;

// Map to track which button is active.
const modeMap = new Map([
    ["draw", true],
    ["erase", false],
    ["lighten", false],
    ["shade", false]
    ]);

/*
    Resets the button styling to the default state.
*/
function resetBtnStyles (){
    btnErase.style.backgroundColor ="rgb(233, 233, 237)";
    btnLighten.style.backgroundColor ="rgb(233, 233, 237)";
    btnShade.style.backgroundColor ="rgb(233, 233, 237)";
}

/* 
    Function that tracks which button was just pressed and sets the current
    draw function accordingly.
*/
const updateMode = (e) => {
    let tempValue = modeMap.get(e.target.className);
    for (const [key, value] of modeMap) {
        modeMap.set(key, false);
    }
    
    resetBtnStyles();

    let changeButtonBackground = (btn) => {
        if (tempValue) {
            btn.style.backgroundColor = "rgb(233, 233, 237)";
        } else {
            btn.style.backgroundColor = "white";
        }
    }

    switch (e.target.className) {
        case "erase":
            modeMap.set(e.target.className, !tempValue);
            changeButtonBackground(btnErase);
            //!tempValue ? drawColor = "white": drawColor = "black";
            break;
        case "lighten":
            modeMap.set(e.target.className, !tempValue);
            changeButtonBackground(btnLighten);
            //!tempValue ? drawColor = "gray": drawColor = "black";
            break;
        case "shade":
            modeMap.set(e.target.className, !tempValue);
            changeButtonBackground(btnShade);
            //!tempValue ? drawColor = "red": drawColor = "black";
            break;
    }
    if (tempValue) modeMap.set("draw", true); // Set default draw to be true if disabling another draw function
}



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
            //gridElement.style = "background-color: white; border: 1px solid black; border-right: 1px; border-top: 1px";
            gridElement.style.gridRow = y + 1;
            gridElement.style.gridColumn = x + 1;
            gridElement.style.backgroundColor = "#FFFFFF";
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

/*
    Resets grid element colors and button states
*/
function reset() {
    let elems = document.querySelectorAll(".grid-element");
    for (let i = 0; i < elems.length; i++){
        elems[i].style.backgroundColor = "#FFFFFF";
    }
    for (const [key, value] of modeMap) {
        modeMap.set(key, false);
        modeMap.set("draw", true);
    }
    drawColor = "black";
    resetBtnStyles();
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

/*
    Changes grid element color based on selected mode.
*/
function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (modeMap.get("draw")) e.target.style.backgroundColor = drawColor;
    else if (modeMap.get("erase")) e.target.style.backgroundColor = "#FFFFFF";
    else if (modeMap.get("shade")) e.target.style.backgroundColor = adjustColor(e.target.style.backgroundColor, -5);
    else if (modeMap.get("lighten")) e.target.style.backgroundColor = adjustColor(e.target.style.backgroundColor, 5);
}

/*
    Adds/removes CSS class to grid elements in order to show or not show black borders around each element.
*/
function toggleGrid() {
    let elems = document.getElementsByClassName("grid-element");
    for (let i = 0; i < elems.length; i++){
        elems[i].classList.toggle('grid-element-borderless');
    }
}

/*
    Sets CSS to give buttons an expanding transition effect when clicked.
*/
function animateButton() {
    let id = null;
    const button = document.querySelector(".reset");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            button.style.backgroundColor = "red";
        }
    }
}

/*
    Lightens or darkens a given color based on the adjustment amount.
*/
function adjustColor(color, adjustment){
    let rgb = color.match(/\d+/g);
    let hsl = RGBToHSL(rgb[0], rgb[1], rgb[2]);
    rgb = HSLToRGB(hsl[0], hsl[1], hsl[2] += adjustment);
    return "rgb(" + rgb.join(", ") + ")";
}

/*
    Converts RGB to HSL
    https://www.30secondsofcode.org/js/s/rgb-to-hsl
*/
const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  /*
    Converts HSL to RGB
    Credit to https://www.30secondsofcode.org/js/s/hsl-to-rgb
  */
  const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };

function setup() {
    //Initializes a grid on site load.
    createGrid(currentColumns, currentRows);
    output.innerHTML = currentRows;
    slider.value = currentRows;
    grid.addEventListener("mousedown", () => mouseDown = true);
    grid.addEventListener("mouseup", () => mouseDown = false);
    btnReset.addEventListener("click", reset);
    btnColor.addEventListener("change", changeColor, false);
    btnErase.addEventListener("click", updateMode);
    btnLighten.addEventListener("click", updateMode);
    btnShade.addEventListener("click", updateMode);
    btnToggleGrid.addEventListener("click", toggleGrid);
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