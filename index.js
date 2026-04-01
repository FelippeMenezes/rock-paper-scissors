// /home/dell/Felippe/top/rock-paper-scissors/index.js

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
let humanScore = 0;
let computerScore = 0;
let messageResult = '';

const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1);

function getComputerChoice() {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        messageResult = `It's a tie! You both chose ${capitalize(humanChoice)}. Play again! `;
    } else if (humanChoice === ROCK && computerChoice === PAPER) {
        computerScore++;
        messageResult = `Computer chose ${capitalize(computerChoice)}. You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
    } else if (humanChoice === ROCK && computerChoice === SCISSORS) {
        humanScore++;
        messageResult = `Computer chose ${capitalize(computerChoice)}. You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
    } else if (humanChoice === PAPER && computerChoice === SCISSORS) {
        computerScore++;
        messageResult = `Computer chose ${capitalize(computerChoice)}. You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
    } else if (humanChoice === PAPER && computerChoice === ROCK) {
        humanScore++;
        messageResult = `Computer chose ${capitalize(computerChoice)}. You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
    } else if (humanChoice === SCISSORS && computerChoice === ROCK) {
        computerScore++;
        messageResult = `Computer chose ${capitalize(computerChoice)}. You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
    } else if (humanChoice === SCISSORS && computerChoice === PAPER) {
        humanScore++;
        messageResult = `Computer chose ${capitalize(computerChoice)}. You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
    }
}

function checkGameOver() {
    if (humanScore === 5 || computerScore === 5) {
        rockButton.remove();
        paperButton.remove();
        scissorsButton.remove();
        greeting.remove();

        if (humanScore === 5) {
            const winner = document.createElement("h2");
            winner.textContent = "Game over! You win!";
            document.body.appendChild(winner);
        } else if (computerScore === 5) {
            const loser = document.createElement("h2");
            loser.textContent = "Game over! You lose!";
            document.body.appendChild(loser);
        }

        const playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play again?";
        div.appendChild(playAgainButton);
        playAgainButton.style = "background: red; color: white; font-weight: bold; padding: 10px; border-radius: 5px;";

        playAgainButton.addEventListener("click", () => {
            if (confirm("Are you sure?")) {
                location.reload();
            };
        });
    };
};

function playGame(humanChoice) {
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);

    score.textContent = `Score: You:${humanScore} x ${computerScore} Computer.`;

    const message = document.createElement("p");
    const li = document.createElement("li");
    const p = document.createElement("p");

    message.textContent = messageResult;

    ol.appendChild(li);
    li.appendChild(message);

    checkGameOver();
}

const gameTitle = document.createElement("h1");
gameTitle.textContent = "Rock, Paper, Scissors!";

const score = document.createElement("h2");
score.textContent = `Score: You:${humanScore} x ${computerScore} Computer.`;

const greeting = document.createElement("h3");
greeting.textContent = "Let's play! Make your choice!";

const rockButton = document.createElement("button");
rockButton.textContent = "✊ Rock";

const paperButton = document.createElement("button");
paperButton.textContent = "🤚 Paper";

const scissorsButton = document.createElement("button");
scissorsButton.textContent = "✌ Scissors";

const div = document.createElement("div");

const ol = document.createElement("ol");

document.body.appendChild(gameTitle);
document.body.appendChild(score);
document.body.appendChild(greeting);
document.body.appendChild(div);
document.body.appendChild(ol);

div.appendChild(rockButton);
div.appendChild(paperButton);
div.appendChild(scissorsButton);

buttonsStyles = " font-weight: bold; padding: 10px; border-radius: 5px;"
div.style = "display: flex; justify-content: space-around; max-width: 300px;";
rockButton.style = `background: blue; color: white; ${buttonsStyles}`;
paperButton.style = `background: green; color: white; ${buttonsStyles}`;
scissorsButton.style = `background: yellow; color: black; ${buttonsStyles}`;

rockButton.addEventListener("click", () => playGame(ROCK));
paperButton.addEventListener("click", () => playGame(PAPER));
scissorsButton.addEventListener("click", () => playGame(SCISSORS));
