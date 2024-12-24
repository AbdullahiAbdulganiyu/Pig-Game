'use strict';

// delecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
// const score = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
let score, currentScore, activePlayer, playing;

const init = function () {
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rollng dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Genrate a rndom nunmber
    let dice = Number(Math.trunc(Math.random() * 6) + 1);
    // current0El.textContent = dice;

    // 2. display the dice with generated number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // diceEl.setAttribute('src', `./dice-${dice}.png`);

    // 3. check for a 1 clicked

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //  switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //  add the currentscore to  currentplayer score
    score[activePlayer] += currentScore;
    // e.g score[1] score[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
