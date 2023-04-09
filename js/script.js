var gameStarted = false;

var results = {
    circle: 0,
    cross: 0,
    draw: 0,
};

var numberOfSpaces = 9;

var titleMessage = document.getElementById("title-message");
var restartBtn = document.getElementById("restart-icon");
var reloadBtn = document.getElementById("reload-icon");

document.addEventListener("DOMContentLoaded", function () {
    let spacesToChoose = document.querySelectorAll(".box");

    spacesToChoose.forEach((element) => {
        element.addEventListener("click", clickBox.bind(this, element));
    });
});

function restartGame() {
    return gameStart();
}

function gameStart() {
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("switch-container").classList.remove("hidden");
    document.getElementById("status-container").classList.remove("hidden");
    document.getElementById("reload-container").classList.remove("hidden");

    titleMessage.innerText = "Game started!";
    document.getElementById("switch").checked = false;
    restartBtn.classList.remove("unclickable");
    reloadBtn.classList.remove("unclickable");

    let spacesToChoose = Array.from(document.getElementsByClassName("box"));
    spacesToChoose.forEach((element) => {
        if (element.classList.contains("green"))
            element.classList.remove("green");
        if (element.classList.contains("red")) element.classList.remove("red");
        if (element.classList.contains("win")) element.classList.remove("win");
    });
    gameStarted = true;
    updateStatus();
}

function clickBox(element) {
    if (gameStarted == false) return;
    if (element.classList.contains("green")) return;
    if (element.classList.contains("red")) return;

    let switchBtn = document.getElementById("switch");

    if (switchBtn.checked) element.classList.add("red");
    else element.classList.add("green");

    switchBtn.checked = !switchBtn.checked;
    checkWinner();
}

function reloadGame() {
    return location.reload();
}

let winStates = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function updateStatus() {
    document.getElementById(
        "circle-score"
    ).innerHTML = `O<br>${results.circle} wins`;
    document.getElementById(
        "cross-score"
    ).innerHTML = `X<br>${results.cross} wins`;
    document.getElementById(
        "draw-score"
    ).innerHTML = `-<br>${results.draw} draws`;
}

function checkWinner() {
    const spacesToChoose = [];

    for (let i = 0; i < numberOfSpaces; i++)
        spacesToChoose.push(document.getElementById((i + 1).toString()));

    for (let i = 0; i < winStates.length; i++) {
        if (
            spacesToChoose[winStates[i][0] - 1].classList.contains("green") &&
            spacesToChoose[winStates[i][1] - 1].classList.contains("green") &&
            spacesToChoose[winStates[i][2] - 1].classList.contains("green")
        ) {
            spacesToChoose[winStates[i][0] - 1].classList.add("win");
            spacesToChoose[winStates[i][1] - 1].classList.add("win");
            spacesToChoose[winStates[i][2] - 1].classList.add("win");
            gameStarted = false;
            restartBtn.classList.add("unclickable");
            reloadBtn.classList.add("unclickable");
            titleMessage.innerText = "O wins!";
            results.circle++;
            setTimeout(() => {
                restartGame();
            }, 3000);
            break;
        } else if (
            spacesToChoose[winStates[i][0] - 1].classList.contains("red") &&
            spacesToChoose[winStates[i][1] - 1].classList.contains("red") &&
            spacesToChoose[winStates[i][2] - 1].classList.contains("red")
        ) {
            spacesToChoose[winStates[i][0] - 1].classList.add("win");
            spacesToChoose[winStates[i][1] - 1].classList.add("win");
            spacesToChoose[winStates[i][2] - 1].classList.add("win");
            gameStarted = false;
            restartBtn.classList.add("unclickable");
            reloadBtn.classList.add("unclickable");
            titleMessage.innerText = "X wins!";
            results.cross++;
            setTimeout(() => {
                restartGame();
            }, 3000);
            break;
        } else {
            let draw = true;
            for (let i = 0; i < numberOfSpaces; i++) {
                if (
                    !spacesToChoose[i].classList.contains("green") &&
                    !spacesToChoose[i].classList.contains("red")
                ) {
                    draw = false;
                    break;
                }
            }
            if (draw) {
                gameStarted = false;
                restartBtn.classList.add("unclickable");
                reloadBtn.classList.add("unclickable");
                results.draw++;
                titleMessage.innerText = "Draw!";
                setTimeout(() => {
                    restartGame();
                }, 3000);
                break;
            }
        }
    }
    updateStatus();
}
