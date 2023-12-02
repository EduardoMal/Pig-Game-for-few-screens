'use strict';

//select elements
const getPlayer0 = document.getElementById('player-name--0');
const getPlayer1 = document.getElementById('player-name--1');
const getScore0 = document.querySelector('.current--0');
const getScore1 = document.querySelector('.current--1');
const newGameBtn = document.querySelector('.new-game');
const rollBtn = document.querySelector('.roll-dice');
const holdBtn = document.querySelector('.hold');

//get name function
const getName = function (n) {
  let theName = prompt(
    `${document.getElementById(`player-name--${n}`).textContent} Name:`
  );
  let answer = '';
  for (let i = 0; i < theName.length; i++) {
    let each = theName.slice(i, i + 1);
    answer += each;
    if (each === ' ') break;
    if (answer.length >= 12) break;
  }
  return answer;
};

//delare variables
let score, totals, isStillOn, activePlayer;

//initialize
const init = function () {
  score = 0;
  totals = [0, 0];
  activePlayer = 0;
  isStillOn = true;
  getScore0.textContent = 0;
  getScore1.textContent = 0;
  document.querySelector('.total--0').textContent = 0;
  document.querySelector('.total--1').textContent = 0;
  document.querySelector('.image').classList.add('hidden');
  document.querySelector('.player--0').classList.add('player--active');
  document
    .querySelector('.player--1')
    .classList.remove('player--active', 'winner');
  document.querySelector('.player--0').classList.remove('winner');
  getPlayer0.textContent = 'Player 1';
  getPlayer1.textContent = 'Player 2';
  getPlayer0.textContent = getName(0) /*prompt('Name of Player 1:')*/;
  getPlayer1.textContent = getName(1) /*prompt('Name of Player 2:')*/;
};

init();

//switch player function
const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

//roll dice
const rollDice = function () {
  if (isStillOn) {
    //generate a random number 1-6
    const diceOutcome = Math.trunc(Math.random() * 6) + 1;
    // console.log(diceOutcome);

    //assign the number to the dice image
    document.querySelector('.image').src = `Image/dice--${diceOutcome}.png`;

    //display the dice
    document.querySelector('.image').classList.remove('hidden');

    //check if a '1' was rolled
    if (diceOutcome === 1) {
      //true
      score = 0;
      document.querySelector(`.current--${activePlayer}`).textContent = score;
      switchPlayer();
    } else {
      //false
      score += diceOutcome;
      document.querySelector(`.current--${activePlayer}`).textContent = score;
    }
  }
};

//hold score
const holdScore = function () {
  if (isStillOn) {
    //store total score
    totals[activePlayer] += score;

    //display total score
    document.querySelector(`.total--${activePlayer}`).textContent =
      totals[activePlayer];

    //restore the score storage to 0
    score = 0;

    //display '0' as current score
    document.querySelector(`.current--${activePlayer}`).textContent = score;

    //check for a win
    if (totals[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('winner');
      document.querySelector(
        `#player-name--${activePlayer}`
      ).textContent = `Winner: ${
        document.querySelector(`#player-name--${activePlayer}`).textContent
      } 🏆`;
      switchPlayer();
      document.querySelector('.image').classList.add('hidden');
      isStillOn = false;
    } else {
      switchPlayer();
    }
  }
};

//listen to the buttons
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);

//refresh: new game
newGameBtn.addEventListener('click', init);
