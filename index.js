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
        messageResult = `Empate! Ambos escolheram ${capitalize(humanChoice)}.`;
    } else if (humanChoice === ROCK && computerChoice === PAPER) {
        computerScore++;
        messageResult = `Você perdeu! ${capitalize(computerChoice)} ganha de ${capitalize(humanChoice)}.`;
    } else if (humanChoice === ROCK && computerChoice === SCISSORS) {
        humanScore++;
        messageResult = `Você ganhou! ${capitalize(humanChoice)} ganha de ${capitalize(computerChoice)}.`;
    } else if (humanChoice === PAPER && computerChoice === SCISSORS) {
        computerScore++;
        messageResult = `Você perdeu! ${capitalize(computerChoice)} ganha de ${capitalize(humanChoice)}.`;
    } else if (humanChoice === PAPER && computerChoice === ROCK) {
        humanScore++;
        messageResult = `Você ganhou! ${capitalize(humanChoice)} ganha de ${capitalize(computerChoice)}.`;
    } else if (humanChoice === SCISSORS && computerChoice === ROCK) {
        computerScore++;
        messageResult = `Você perdeu! ${capitalize(computerChoice)} ganha de ${capitalize(humanChoice)}.`;
    } else if (humanChoice === SCISSORS && computerChoice === PAPER) {
        humanScore++;
        messageResult = `Você ganhou! ${capitalize(humanChoice)} ganha de ${capitalize(computerChoice)}.`;
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
        delay += 35; // Aumenta o delay para reduzir a velocidade

        // Para quando estiver lento o suficiente E na opção correta
        if (delay < 500 || current !== finalChoice) {
            setTimeout(tick, delay);
        } else {
            callback();
        }
    }
    tick();
}

function checkGameOver() {
    if (humanScore === 5 || computerScore === 5) {
        const finalMsg = humanScore === 5 ? "PARABÉNS! Você venceu o jogo!" : "GAME OVER! O computador venceu.";
        alert(finalMsg);
        location.reload();
    }
}

function playGame() {
    if (!selectedChoice) return;

    playButton.disabled = true;
    const computerChoice = getComputerChoice();
    messageArea.textContent = "Computador escolhendo...";

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

// Event Listeners
document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove seleção anterior
        document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.remove('selected'));

        // Seleciona novo
        button.classList.add('selected');
        selectedChoice = button.dataset.choice;
        playButton.disabled = false;
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    // Muda o ícone: se estiver no light, mostra lua para voltar pro dark.
    themeToggle.textContent = isLight ? '🌙' : '☀️';
});

playButton.addEventListener('click', playGame);
