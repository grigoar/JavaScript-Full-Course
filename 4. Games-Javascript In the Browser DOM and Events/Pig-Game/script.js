'use strict';

//----------------------------------------------PIG-GAME---------------------------------
//Selecting elements to not use too much the selectors
//select element universally
const score0El = document.querySelector('#score--0');
//another way to select the element by ID(probably faster)
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// //Starting conditions--moved into init
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// //Globally variables--moved into init
// let currentScore = 0;
// const scores = [0, 0]; //holds the scores for player 1 at pos0, and score for player 2 at pos1
// let activePlayer = 0;
// //current state of the game
// let playing = true;
//Globally variables--moved into init
let currentScore;
let scores; //holds the scores for player 1 at pos0, and score for player 2 at pos1
let activePlayer;
//current state of the game
let playing;

//Initialize the values when hitting the new button or when the page was loaded
const init = function () {
  //Assigning a value for our variables
  currentScore = 0;
  scores = [0, 0]; //holds the scores for player 1 at pos0, and score for player 2 at pos1
  activePlayer = 0;
  //current state of the game
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  //if we remove a class and it is not there javascript will not generate an error
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //NICE
  //toggle the active player class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    //------------------------------------changing the src of the image dynamically and with the generated number------------------------------
    diceEl.src = `dice-${dice}.png`;
    //   console.log(dice);

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score

      currentScore += dice;
      //selecting dynamically the active player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; //Change Later from an active player to another
    } else if (dice === 1) {
      //switch to next player
      switchPlayer();

      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0; //NICE
      // //toggle the active player class
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    //Smart declaration so now if the active player is 0 or 1 it adds the current score to that array
    scores[activePlayer] += currentScore;
    //   scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player the same as before so we create a new function
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click', function () {
//   init();
// });
btnNew.addEventListener('click', init);

//------------------------------My poor implementation-----------
// btnNew.addEventListener('click', function () {
//   //   scores[0] = scores[1] = 0;
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;

//   //removing the winner class and adding the active class

//   document.querySelector(`.player--0`).classList.add('player--active');
//   for (let i = 0; i < scores.length; i++) {
//     scores[i] = 0;
//     //resetting the current score text for both players
//     document.getElementById(`current--${i}`).textContent = 0;
//     //removing the player winner class
//     document.getElementById(`score--${i}`).textContent = 0;
//     if (
//       document
//         .querySelector(`.player--${i}`)
//         .classList.contains('player--winner')
//     ) {
//       document
//         .querySelector(`.player--${i}`)
//         .classList.remove('player--winner');
//     }
//   }
// });

///------------------------My implementation---------------
// //Globally variables
// let currentScorePlayer0 = 0;
// let currentScorePlayer1 = 0;

// //Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// //Rolling dice functionality
// btnRoll.addEventListener('click', function () {
//   //1.Generating a random dice roll
//   const dice = Math.trunc(Math.random() * 6) + 1;

//   //2.Display dice
//   diceEl.classList.remove('hidden');
//   //------------------------------------changing the src of the image dynamically and with the generated number------------------------------
//   diceEl.src = `dice-${dice}.png`;
//   console.log(dice);

//   //3. Check for rolled 1: if true, switch to next player
//   if (dice !== 1) {
//     //Add dice to current score
//     if (player0.classList.contains('player--active')) {
//       currentScorePlayer0 += dice;
//       current0El.textContent = currentScorePlayer0;
//     } else if (player1.classList.contains('player--active')) {
//       currentScorePlayer1 += dice;
//       current1El.textContent = currentScorePlayer1;
//     }
//     // currentScore += dice;
//     // current0El.textContent = currentScore; //Change Later from an active player to another
//   } else if (dice === 1) {
//     //switch to next player
//     if (player0.classList.contains('player--active')) {
//       player0.classList.remove('player--active');
//       player1.classList.add('player--active');
//       currentScorePlayer0 = 0;
//       current0El.textContent = currentScorePlayer0;
//     } else if (player1.classList.contains('player--active')) {
//       player0.classList.add('player--active');
//       player1.classList.remove('player--active');
//       currentScorePlayer1 = 0;
//       current1El.textContent = currentScorePlayer1;
//     }
//   }
// });
