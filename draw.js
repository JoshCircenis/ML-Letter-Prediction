const grid = document.getElementById("grid");
const clear = document.getElementById('clear');
clear.addEventListener('click', resetGrid);
const cells = [];

var inputLayer = [];

for (let i = 0; i < 3600; i++) {
   inputLayer[i] = 0; 
}

var x = "test";

// Create grid cells
for (let i = 0; i < 3600; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cells.push(cell);
  grid.appendChild(cell);
}

let isDrawing = false;

// Mouse event handlers
grid.addEventListener("mousedown", (event) => {
  isDrawing = true;
  const cell = event.target;
  cell.style.backgroundColor = "#000";
  logState(cell);
  const neighboringCells = getNeighboringCells(cell);
  neighboringCells.forEach((neighboringCell) => {
    neighboringCell.style.backgroundColor = "#000";
    logState(neighboringCell);
  });
});

grid.addEventListener("mouseup", () => {
  isDrawing = false;
});

grid.addEventListener("mouseleave", () => {
  isDrawing = false;
});

grid.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const cell = event.target;
    cell.style.backgroundColor = "#000";
    logState(cell);
    const neighboringCells = getNeighboringCells(cell);
    neighboringCells.forEach((neighboringCell) => {
      neighboringCell.style.backgroundColor = "#000";
      logState(neighboringCell);
    });
  }
});

function logState(cell){
  const index = cells.indexOf(cell);
  inputLayer[index] = 1;
}

function getNeighboringCells(cell) {
  const neighboringCells = [];
  const index = cells.indexOf(cell);
  const row = Math.floor(index / 60);
  const col = index % 60;

  if (row > 0) {
    neighboringCells.push(cells[index - 60]); // Top
  }
  if (row < 59) {
    neighboringCells.push(cells[index + 60]); // Bottom
  }
  if (col > 0) {
    neighboringCells.push(cells[index - 1]); // Left
  }
  if (col < 59) {
    neighboringCells.push(cells[index + 1]); // Right
  }
  if((row > 0)&&(col >0)){
    neighboringCells.push(cells[index - 61]); // Top left
    neighboringCells.push(cells[index + 59]); // Bottom left
  }
  if((row < 59)&&(col < 59)){
    neighboringCells.push(cells[index - 59]); // Top right
    neighboringCells.push(cells[index + 61]); // Bottom Right
  } 

  return neighboringCells;
}

function resetGrid() {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#fff";
  });
  for (let i = 0; i < 3600; i++) {
    inputLayer[i] = 0;
  }
}
