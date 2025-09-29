const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const whackSound = document.getElementById('whack-sound-effect');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            whackSound.currentTime = 0;
            whackSound.play();
            square.style.backgroundImage = 'url("mole-whacked.jpg")';
            square.style.backgroundSize = 'cover';
            result++;
            score.textContent = result;
            hitPosition = null;
            setTimeout(() => {
                square.style.backgroundImage = null;
            }, 500);
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

let countDownTimerId = setInterval(countDown, 1000);
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
    }
}
