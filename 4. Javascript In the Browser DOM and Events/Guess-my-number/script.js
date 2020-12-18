"use strict";

// //can read the textContent of the element
// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Correct Number!";
// console.log(document.querySelector(".message").textContent);

// //Need to selelect the content, because it may have some other elements as children
// // document.querySelector(".number") = 13;
// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 20;

// //With an input element we use .value property
// document.querySelector(".guess").value = 23;
// console.log(document.querySelector(".guess").value);

//-------------------------Click events
//-------------------------Manipulating the css styles of the elements
//-------------------------Refactoring the code - DRY(don't repeat yourself) principle

//event listeners
//adding the type of the event listener "click"
// const x = function () {
//   console.log(23);
// };

//Declaring the secret number globably
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// document.querySelector(".number").textContent = secretNumber;
document.querySelector(".guess").value = "";

//the function is an anonymous function
document.querySelector(".check").addEventListener("click", function () {
  //the function is called only when the event happen and it passed to the addEventListener() function
  const guess = Number(document.querySelector(".guess").value);
  console.log(typeof guess, guess);

  //If there is no input number entered by the user
  //falsy->true

  //When there is no input
  if (!guess) {
    // document.querySelector(".message").textContent = "No number!";
    //adding function to remove the duplicate code
    displayMessage("No number!");
    //When the player wins
  } else if (guess === secretNumber) {
    // document.querySelector(".message").textContent = "Correct Number!";
    displayMessage("Correct Number!");

    //adding style to the elements
    document.querySelector("body").style.backgroundColor = "#60b347";

    //Doom elements are saved in string… We need to convert them
    //the style property is added as an inline style
    //the property in css need to be with camel naming
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }

    //When the guess number is too high
  } else if (guess !== secretNumber) {
    if (score > 1) {
      //refactoring the code- using ternary operator
      // document.querySelector(".message").textContent =
      //   guess > secretNumber ? "Too high!" : "Too low!";
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "You lost the game!";
      displayMessage("You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }

  //   //When the guess number is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You lost the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  // document.querySelector(".message").textContent = "Start guessing...";
  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
});
