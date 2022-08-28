const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const gameBoard = [];
const board = document.getElementById('board');
let turn = 0; // 0 -> player X, 1 -> player O
const turnDiv = document.getElementById('turn');
const cells = document.getElementsByClassName('cell');
const winningPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [1, 5, 9],
    [3, 5, 7]
];

const insertChoice = (cell, symbol) => {
    gameBoard.push({
        position: cell.id,
        symbol
    });

    cell.textContent = gameBoard[gameBoard.length - 1].symbol;
}

const restart = () => {
    turn = 0;

    for (const cell of cells) {
        cell.textContent = 'N'
        cell.style.color = 'transparent';
        turnDiv.innerHTML = `Player X's turn`;
    }

    gameBoard.length = 0;
}

const Player = (symbol) => {
    let msg;

    const insert = cell => {
        if (gameBoard.filter(choice => choice.position === cell.id).length) {
            msg = 'Position already exists';
            return;
        }

        insertChoice(cell, symbol);

        turn === 0 ? turn = 1 : turn = 0;

        cell.style.color = 'black'
    };

    const checkGameStatus = currentPlayer => {
        if (gameBoard.length === 9) {
            turnDiv.innerHTML = `Draw!`;
            turnDiv.classList.add('win');
        }

        winningPositions.forEach(pos => {
            if (document.getElementById(pos[0]).textContent === currentPlayer.symbol && document.getElementById(pos[1]).textContent === currentPlayer.symbol && document.getElementById(pos[2]).textContent === currentPlayer.symbol) {
                turnDiv.innerHTML = `Plater ${currentPlayer.symbol} wins!`;
                turnDiv.classList.add('win');
            }
        });
    }

    return { symbol, insert, checkGameStatus, msg }
};

const xPlayer = Player('X');
const oPlayer = Player('O');

positions.forEach(pos => {
    const cell = document.createElement('div');
    cell.id = pos;
    cell.textContent = 'N';
    cell.classList.add('cell');

    cell.addEventListener('click', () => {
        const currentPlayer = turn === 0 ? xPlayer : oPlayer;
        currentPlayer.insert(cell);

        turnDiv.innerHTML = `Player ${currentPlayer.symbol === 'X' ? 'O' : 'X'}'s turn`

        currentPlayer.checkGameStatus(currentPlayer);
    });

    board.appendChild(cell);
});
