const x = "X";
const o = "O";
let gameState = "p1";
const modal = document.querySelector("dialog")
const modalText = modal.querySelector("h2")

const cells = Array.from(document.querySelectorAll(".cell"));

cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
        if (gameState === "end") return;
        if (cell.textContent !== "") return;
        cell.innerText = gameState === "p1" ? x : o;
        const winnerPosition = winner();
        if (typeof winnerPosition === "object") {
            win(winnerPosition)
            return
        }
        if (winnerPosition === "Tie") {
            showModal("Tie")
        }
        gameState = gameState === "p1" ? "p2" : "p1";
    });
});


const winner = () => {
    const board = cells.map(cell => cell.innerText);
    console.log(board)


    //revisar horizontales
    for (let i = 0; i <= 9; i += 3) {
        if (board[i] &&
            board[i] === board[i + 1] &&
            board[i] === board[i + 2]) {
            return [i, i + 1, i + 2]
        };

    };

    //revisar verticales
    for (let i = 0; i <= 3; i++) {
        if (board[i] &&
            board[i] === board[i + 3] &&
            board[i] === board[i + 6]) {
            return [i, i + 3, i + 6]
        };

    };

    //revisar crusadas 
    if (board[0] &&
        board[0] === board[4] &&
        board[0] === board[8]) {
        return [0, 4, 8]
    };
    if (board[2] &&
        board[2] === board[4] &&
        board[2] === board[6]) {
        return [2, 4, 6]
    };

    if (board.includes("")) return false;
    return "Tie"
};

const win = (winnerPosition) => {
    winnerPosition.forEach(position => {
        cells[position].classList.toggle("win", true)
    });
    showModal(`The Winner Is: ${gameState}`)
    gameState = "end";
};


const showModal = (text) => {
    modalText.innerText = text
    modal.showModal()
}


modal.querySelector("button").addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = ""
        cell.classList.toggle("win", false)
        modal.close()
        gameState = "p1"
    });
})