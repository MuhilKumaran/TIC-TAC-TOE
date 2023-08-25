let player1 = window.prompt("ENTER (X) PLAYER 1 NAME");
let player2 = window.prompt("ENTER (O) PLAYER 2 NAME");
player1 = player1.toUpperCase();
player2 = player2.toUpperCase();

let cells = document.querySelectorAll(".cell");
let info = document.querySelector("#statusText");
let restart = document.querySelector("#resetBtn");

let winPossible = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let boxChoices = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = false;


window.onload = () => {
    cells.forEach(cell => cell.addEventListener("click", cellSelection));
    restart.addEventListener("click", gameRestart);
    info.textContent = `${currentPlayer}'s Turn`;
    gameRunning = true;
}

function cellSelection(){
    let index = this.getAttribute("cellIndex");
    if (boxChoices[index] != "" || !gameRunning) {
        return;
    }
    cellUpdate(this, index);
    winCheck();
}

function cellUpdate(cell, index) {
    boxChoices[index] = currentPlayer;
    currentPlayer === "X" ? cell.innerHTML = `<span style="color:red">${currentPlayer}</span>` : cell.innerHTML = `<span style="color:blue">${currentPlayer}</span>`;
    

}

function playerChange() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    info.textContent = `${currentPlayer}'s Turn`;
}

function winCheck() {
    let roundWon = false;
    for (let i = 0; i < winPossible.length; i++) {
        let check = winPossible[i];
        let cellA = boxChoices[check[0]];
        let cellB = boxChoices[check[1]];
        let cellC = boxChoices[check[2]];

        //if any cell = 0 not possible to win
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        else if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }

    }
    if (roundWon) {
        // info.textContent = `${currentPlayer}  Won The Game`;
        currentPlayer==="X" ? info.innerHTML = `<span  style="color:red">${player1} Won The Match</span>` : info.innerHTML = `<span  style="color:blue">${player2} Won The Match</span>`;
        gameRunning = false;
    }
    //draw condition
    else if (!boxChoices.includes("")) {
        info.textContent = `Match Draw`;
        gameRunning = false;
    }
    else {
        playerChange();
    }
}

function gameRestart() {
    currentPlayer = "X";
    boxChoices = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    info.textContent = `${currentPlayer}'s Turn`;
    gameRunning = true;
}
