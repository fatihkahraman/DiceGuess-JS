const choices = document.querySelectorAll('.choices');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const score = document.getElementById('score');
const modal = document.querySelector('.modal');
let playerChoice;
const guesses = {
    total: 0,
    right: 0
}

//Start game
function play(e) {
    restart.style.display = 'block';
    playerChoice = e.target.id;
    playTurn(playerChoice);
}

//Play a turn
function playTurn(p) {
    const diceRoll = getDiceRoll();
    const turn = getTurn(p, diceRoll);
    showModal(turn, diceRoll);
}

//Show modal
function showModal(turn, d) {
    if(turn == 'win') {
        guesses.total++;
        guesses.right++;
        result.innerHTML = `
            <h1 class="text-win">You Win</h1>
            <img src="images/${d}.png" alt="${d}">
            <div>
                <button id="retry">Retry</button>
                <button id="retry-change">New Number</button>
            </div>
        `;
    } else {
        guesses.total++;
        result.innerHTML = `
            <h1 class="text-lose">You Lose</h1>
            <img src="images/${d}.png" alt="${d}">
            <div>
                <button id="retry">Retry</button>
                <button id="retry-change">New Number</button>
            </div>
        `;
    }

    score.innerHTML = `
        <p>Total Guesses: ${guesses.total}</p>
        <p>Right Guesses: ${guesses.right}</p>
    `;

    modal.style.display = 'block';

    const retry = document.getElementById('retry');
    retry.addEventListener('click', retryGame);

    const change = document.getElementById('retry-change');
    change.addEventListener('click', changeGame);
}

//New turn with new number
function changeGame() {
    modal.style.display = 'none';
}

//Get turn
function getTurn(p, d) {
    if(p == d) {
        return 'win'
    } else {
        return 'lose';
    }
}

//Get computer choice
function getDiceRoll() {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

//Try again with same number
function retryGame() {
    playTurn(playerChoice);
}

//Resets counts
function restartGame() {
    guesses.total = 0;
    guesses.right = 0;

    score.innerHTML = `
        <p>Total Guesses: 0</p>
        <p>Right Guesses: 0</p>
    `;

    restart.style.display = 'none';
}

//Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
restart.addEventListener('click', restartGame);