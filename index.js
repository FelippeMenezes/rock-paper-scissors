const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
let humanScore = 0;
let computerScore = 0;
let messageResult = '';
let selectedChoice = null;

const emojis = {
    [ROCK]: '✊',
    [PAPER]: '🤚',
    [SCISSORS]: '✌'
};

const computerDisplay = document.getElementById('computer-display');
const playButton = document.getElementById('play-button');
const messageArea = document.getElementById('message-result');
const themeToggle = document.getElementById('theme-toggle');

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

function updateUI() {
    document.getElementById('human-score').textContent = humanScore;
    document.getElementById('computer-score').textContent = computerScore;
    messageArea.textContent = messageResult;
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        messageResult = `It's a tie! Both chose ${capitalize(humanChoice)}.`;
    } else if (humanChoice === ROCK && computerChoice === PAPER) {
        computerScore++;
        messageResult = `You lost! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
    } else if (humanChoice === ROCK && computerChoice === SCISSORS) {
        humanScore++;
        messageResult = `You won! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
    } else if (humanChoice === PAPER && computerChoice === SCISSORS) {
        computerScore++;
        messageResult = `You lost! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
    } else if (humanChoice === PAPER && computerChoice === ROCK) {
        humanScore++;
        messageResult = `You won! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
    } else if (humanChoice === SCISSORS && computerChoice === ROCK) {
        computerScore++;
        messageResult = `You lost! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
    } else if (humanChoice === SCISSORS && computerChoice === PAPER) {
        humanScore++;
        messageResult = `You won! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
    }
}

function animateComputerChoice(finalChoice, callback) {
    const options = [ROCK, PAPER, SCISSORS];
    let currentIdx = 0;
    let delay = 70;

    function tick() {
        const current = options[currentIdx % 3];
        computerDisplay.textContent = emojis[current];
        currentIdx++;
        delay += 10;

        if (delay < 250 || current !== finalChoice) {
            setTimeout(tick, delay);
        } else {
            callback();
        }
    }
    tick();
}

function checkGameOver() {
    if (humanScore === 5 || computerScore === 5) {
        const finalMsg = humanScore === 5 ? "CONGRATULATIONS! You won the game!" : "GAME OVER! The computer won.";
        alert(finalMsg);
        location.reload();
    }
}

function playGame() {
    if (!selectedChoice) return;

    playButton.disabled = true;
    const computerChoice = getComputerChoice();
    messageArea.textContent = "Computer choosing...";

    animateComputerChoice(computerChoice, () => {
        playRound(selectedChoice, computerChoice);
        updateUI();

        const li = document.createElement("li");
        li.textContent = messageResult;
        document.getElementById('history').appendChild(li);

        playButton.disabled = false;
        setTimeout(checkGameOver, 500);
    });
}

document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.remove('selected'));

        button.classList.add('selected');
        selectedChoice = button.dataset.choice;
        playButton.disabled = false;
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
});

playButton.addEventListener('click', playGame);

playButton.addEventListener('mouseenter', () => {
    if (!selectedChoice) {
        messageArea.textContent = "Make your choice above";
    }
});

playButton.addEventListener('mouseleave', () => {
    if (!selectedChoice) {
        messageArea.textContent = "Select an option to start!";
    }
});
