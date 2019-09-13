document.oncontextmenu = function() {
  return false;
};

let cells = [];
let amountClicked = 0;
let columns = document.getElementById("columns").value;
let rows = document.getElementById("rows").value;
let bombs = document.getElementById("bombs").value;

gameStart = () => {
  cells = [];
  amountClicked = 0;
  document.getElementById("board").innerHTML = "";
  document.getElementById("clicks").innerHTML = 0;
  columns = document.getElementById("columns").value;
  rows = document.getElementById("rows").value;
  bombs = document.getElementById("bombs").value;
  if (columns < document.getElementById("columns").min) {
    columns = document.getElementById("columns").min;
  }
  if (rows < document.getElementById("rows").min) {
    rows = document.getElementById("rows").min;
  }
  if (bombs < document.getElementById("bombs").min) {
    bombs = document.getElementById("bombs").min;
  }
  createCells();
  addBombs();
  checkHowManyBombsAround();
  board();
};

createCells = () => {
  for (let row = 0; row < rows; row++) {
    let columnsArray = [];
    for (let column = 0; column < columns; column++) {
      columnsArray.push(0);
    }
    cells.push(columnsArray);
  }
};

random = highest => {
  return Math.floor(Math.random() * highest);
};

addBombs = () => {
  randomNum1 = random(rows);
  randomNum2 = random(columns);
  for (let bomb = 0; bomb < bombs; bomb++) {
    cells[random(rows)][random(columns)] = "B";
  }
};

checkHowManyBombsAround = () => {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let bombCount = 0;
      if (cells[row][column] != "B") {
        if (row - 1 >= 0 && cells[row - 1][column] == "B") {
          bombCount += 1;
        }
        if (
          row - 1 >= 0 &&
          column + 1 < columns &&
          cells[row - 1][column + 1] == "B"
        ) {
          bombCount += 1;
        }
        if (
          row - 1 >= 0 &&
          column - 1 >= 0 &&
          cells[row - 1][column - 1] == "B"
        ) {
          bombCount += 1;
        }
        if (column - 1 >= 0 && cells[row][column - 1] == "B") {
          bombCount += 1;
        }
        if (column + 1 < columns && cells[row][column + 1] == "B") {
          bombCount += 1;
        }
        if (
          row + 1 < rows &&
          column - 1 >= 0 &&
          cells[row + 1][column - 1] == "B"
        ) {
          bombCount += 1;
        }
        if (row + 1 < rows && cells[row + 1][column] == "B") {
          bombCount += 1;
        }
        if (
          row + 1 < rows &&
          column + 1 < columns &&
          cells[row + 1][column + 1] == "B"
        ) {
          bombCount += 1;
        }
      }
      if (bombCount > 0 && cells[row][column] != "B") {
        cells[row][column] = bombCount;
      }
    }
  }
};

gameOver = () => {
  document.getElementById("board").innerHTML = "GAME OVER";
};

gameWin = () => {
  document.getElementById("board").innerHTML = "YOU WIN";
};

reveal = () => {
  event.target.classList.remove("hidden");
  if (event.target.innerHTML == "B") {
    gameOver();
  }
  if (event.target.innerHTML != "B") {
    amountClicked += 1;
  }
  document.getElementById("clicks").innerHTML = amountClicked;
  if (amountClicked == columns * rows - bombs) {
    gameWin();
    document.getElementById("board").innerHTML = "YOU WIN";
  }
  event.target.removeAttribute("onclick");
};

board = () => {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      document.getElementById("board").innerHTML +=
        "<div class='cell'>" +
        "<p onclick='reveal(event)' class='character hidden'>" +
        cells[row][column] +
        "</p> </div>";
    }
    document.getElementById("board").innerHTML += "<br/>";
  }
};

gameStart();
