'use strict'

const words = ["argentina", "brasil", "canada", "dinamarca", "egipto", "francia", "grecia", "hungria", "italia", "jamaica", "kenia", "luxemburgo", "mexico", "nigeria", "portugal", "qatar", "rusia", "suiza", "turquia", "uruguay", "vietnam"];
let selectedWord;
let guessedLetters;
let wrongGuesses;
let wrongLetters;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    wrongLetters = [];
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    document.getElementById('word-container').innerHTML = '_ '.repeat(selectedWord.length);
    document.getElementById('wrong-letters').innerHTML = '';
    drawHangman();
}

function drawHangman() {
    const canvas = document.getElementById('hangman-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    
    if (wrongGuesses > 0) {
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
        ctx.stroke();
    }
    
    if (wrongGuesses > 1) {
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 10);
        ctx.lineTo(150, 10);
        ctx.lineTo(150, 30);
        ctx.stroke();
    }
    
    if (wrongGuesses > 2) {
        ctx.beginPath();
        ctx.arc(150, 50, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    if (wrongGuesses > 3) {
        ctx.beginPath();
        ctx.moveTo(150, 70);
        ctx.lineTo(150, 130);
        ctx.stroke();
    }

    if (wrongGuesses > 4) {
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(130, 110);
        ctx.moveTo(150, 90);
        ctx.lineTo(170, 110);
        ctx.stroke();
    }
   
    if (wrongGuesses > 5) {
        ctx.beginPath();
        ctx.moveTo(150, 130);
        ctx.lineTo(130, 160);
        ctx.moveTo(150, 130);
        ctx.lineTo(170, 160);
        ctx.stroke();
    }
}

document.getElementById('guess').addEventListener('input', (event) => {
    const guess = event.target.value.toLowerCase();
    event.target.value = '';

    if (guess && !guessedLetters.includes(guess) && !wrongLetters.includes(guess)) {
        guessedLetters.push(guess);

        if (selectedWord.includes(guess)) {
            updateWordContainer();
        } else {
            wrongGuesses++;
            wrongLetters.push(guess);
            document.getElementById('wrong-letters').innerText = wrongLetters.join(', ');
            drawHangman();
        }

        if (wrongGuesses >= 6) {
            alert('¡Perdiste! La palabra era: ' + selectedWord);
            document.getElementById('guess').disabled = true;
        } else if (document.getElementById('word-container').innerText.replace(/\s/g, '') === selectedWord) {
            alert('¡Ganaste! La palabra es: ' + selectedWord);
            document.getElementById('guess').disabled = true;
        }
    }
});

function updateWordContainer() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = selectedWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
}
const music = document.getElementById('background-music');
window.onload = () => music.play();

startGame();
