"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// // Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-01-01T14:43:26.374Z",
    "2021-01-02T18:49:59.371Z",
    "2021-01-04T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2021-01-01T14:43:26.374Z",
    "2021-01-02T18:49:59.371Z",
    "2021-01-04T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // if (daysPassed >7) return "days";
  // console.log(daysPassed);

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  //Formatting the date for the transactions with the country-personalized date
  return new Intl.DateTimeFormat(locale).format(date);
};

// PROJECT: "BANKLST" APP
//add the data into the function instead of global
const displayMovements = function (acc, sort = false) {
  //remove the before content
  containerMovements.innerHTML = "";

  // console.log(acc.movements);

  //make a copy in a chain slice()
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    //using the looping on an array to get data on other array
    //we create a new Date because we can then deconstruct the date
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    //create a string of HTML and insert in our index
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `;
    //insertAdjacentHTML()
    // <!-- beforebegin -->
    // <p>
    //   <!-- afterbegin -->
    //   foo
    //   <!-- beforeend -->
    // </p>
    // <!-- afterend -->
    //the string we want to insert
    //containerMovements is the container for the transactions and it is selected before based on class
    containerMovements.insertAdjacentHTML("afterbegin", html);
    // containerMovements.insertAdjacentHTML("beforeend", html);
  });
};

// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (acc) {
  //creating a new property for the current account
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // acc.balance = balance;
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};
// calcDisplayBalance(account1.movements);

const user = "Steven Thomas Williams"; //stw

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + Math.abs(cur), 0);
  labelSumOut.textContent = `${out.toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// calcDisplaySummary(account1.movements);

// const createUsernames = function (user) {
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    //create a new property for the accounts
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0]) //arrow function -> return is hidden
      .join("");
  });
};
// console.log(createUsernames("Steven Thomas Williams"));
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

//function for logging out the user after a timer
const startLogOutTimer = function () {
  //to fix the problem with displaying the timer wrong we need to call it directly and after that we call the interval timer
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, 0);
    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    //Decrese 1s
    time--;
  };
  //Set time to 5 minutes
  let time = 300;

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

//Event handler
let currentAccount;
let timer;

//FAKE always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//------------------------------------------------Experimenting with international API
// //http://www.lingoes.net/en/translator/langcode.htm
// const now = new Date();
// const options = {
//   hour: "numeric",
//   minute: "numeric",
//   day: "numeric",
//   month: "long",
//   // month: "2-digit",
//   // year: "long",
//   year: "2-digit",
//   weekday: "short",
//   // weekday: "long",
// };

// const locale = navigator.language;
// console.log(locale);

// //using Intl with the method DateTime format with the language-Country and than format and the date we want to format
// // labelDate.textContent = new Intl.DateTimeFormat("en-US").format(now);
// // labelDate.textContent = new Intl.DateTimeFormat("en-GB").format(now);
// // labelDate.textContent = new Intl.DateTimeFormat("en-GB", options).format(now);
// // labelDate.textContent = new Intl.DateTimeFormat("ar-SY").format(now);
// // labelDate.textContent = new Intl.DateTimeFormat("pt-PT", options).format(now);
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

//Login functionality
btnLogin.addEventListener("click", function (e) {
  //Prevent form from submitting
  e.preventDefault();
  // console.log("LOGIN");
  //searching accounts based on the username added in the input value
  //find return undefined if it does not exxist
  currentAccount = accounts.find((acc) => acc.username == inputLoginUsername.value);
  console.log(currentAccount);

  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
  //no more error
  // if (currentAccount?.pin === Number(inputLoginPin.value)) {
  if (currentAccount?.pin === +inputLoginPin.value) {
    // console.log("Login");
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    //Create current date and time when login into the account
    // const now = new Date(); //As of Tue Jan 05 2021 08:36:00 GMT+0200 (Eastern European Standard Time)
    // //adding 0 before date if is only one digit
    // const day = `${now.getDate()}`.padStart(2, 0);
    // // const month = now.getMonth() + 1;
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // // labelDate.textContent = now;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      // month: "2-digit",
      // year: "long",
      year: "numeric",
      // weekday: "short",
      // weekday: "long",
    };

    // const locale = navigator.language;
    // console.log(locale);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    //day/month/year

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    //so the input text value looses focus
    inputLoginPin.blur();

    //Timer--if there is already a timer for other user we need to clear the timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  // const amount = Number(inputLoanAmount.value);
  const amount = Math.floor(inputLoanAmount.value);
  //approving the loan after some time to process the loan numbers
  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //UpdateUI
      updateUI(currentAccount);

      //Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }

  inputLoanAmount.value = "";
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (amount > 0 && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username && receiverAcc) {
    //&&receiver instead of optional
    // console.log("transfer valid");
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("delete");

  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    // accounts.splice(1, 1);
    //return the index where the condition is met
    //we can compute a condition to meet instead of just searching for a value like indexOF(value)
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    console.log(index);

    //Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
  inputCloseUsername.blur();
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  //don't let the browser page when introducing data to refresh
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//-------------------------Converting and checking numbers
//numbers are always represented as floating point numbers
//numbers are stored in base 64 binary format

// console.log(23 === 23.0);

// // Base 10 - 0 to 9 1/10 = 0.1. 3/10 =3.3333333
// //Binary base 2 - 0 1
// //hard to display the fraction in base 2
// //don't make fun of javaScript for this🤣....same as php and ruby
// //can't show the truncated number
// console.log(0.1 + 0.2); //very weird->0.30000000000000004
// //can't do financial operations
// console.log(0.1 + 0.2 === 0.3); //false 😢😢

// //convert a string to number
// console.log(Number("23"));
// console.log(+"23");

// //Parsing a number from a string
// console.log(Number.parseInt("30px")); ///work if numbers are first
// console.log(Number.parseInt("e30px")); //don't work
// console.log(Number.parseInt("30px", 10)); //base radix,in base 2 or 10
// // console.log(Number.parseInt("30px", 2)); //base radix,in base 2 or 10

// //global functions
// console.log(Number.parseInt("                  2.5rem "));
// console.log(Number.parseFloat("2.5rem  "));
// console.log(parseFloat("2.5rem  "));

// //check if a value is not a number(NaN)
// console.log(Number.isNaN(20));
// console.log(Number.isNaN("20"));
// console.log(Number.isNaN(+"20X"));
// console.log(Number.isNaN(23 / 0));

// //check if a value is a number
// console.log("------------isFinite------------");
// console.log(Number.isFinite(20));
// console.log(Number.isFinite("20"));
// console.log(Number.isFinite(+"20"));
// console.log(Number.isFinite(23 / 0));

// //check if a value is a integer number
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));

//---------------------------------------------------Math and rounding
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// //it performs type coercion(from string to number)
// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, "23", 11, 2));
// console.log(Math.max(5, 18, "23ps", 11, 2)); //don't work

// console.log(Math.min(5, 18, "23", 11, 2));

// console.log(Math.PI * Number.parseFloat("10px") ** 2);

// console.log(Math.trunc(Math.random() * 6) + 1);

// //random between min and max
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
// //0...1 => 0...(max-min) => min...(max-min+min) => min...max
// console.log(randomInt(10, 20));

// console.log("Rounding");
// //Rounding integers-do type coercion
// console.log(Math.trunc(23.3));
// console.log(Math.trunc(23.9));

// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// //round to the nearest integer number
// //floor works better even with negative numbers
// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.9));

// //Rounding decimals
// console.log((2.7).toFixed(0)); //return a string
// console.log((2.7).toFixed(3)); //return a string
// console.log((2.345).toFixed(2)); //return a string
// console.log(+(2.345).toFixed(2)); //return a number

//--------------------------------------The remainder operator - %
// console.log(5 % 2);
// console.log(5 / 2); //5=2*2+1

// console.log(8 % 3);
// console.log(8 / 3); //8=2*3+2

// console.log(6 % 2); //even number
// console.log(6 / 3);

// console.log(7 / 2); //odd number
// console.log(7 % 2);

// const isEven = (n) => n % 2 === 0;
// const isEvenLoop = (n) => (n % 2 === 0 ? console.log("The number is even") : console.log("The number is odd"));
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(523));
// const arr = [1, 23, 4, 5, 6, 7, 8, 78];
// // arr.forEach(function (n) {
// //   if (n % 2 === 0) console.log("The number is even");
// //   if (n % 2 === 1) console.log("The number is odd");
// // });
// arr.forEach(isEvenLoop);

// labelBalance.addEventListener("click", function () {
//   [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
//     //Nth time
//     if (i % 2 === 0) row.style.backgroundColor = "orangered";
//     if (i % 3 === 0) row.style.backgroundColor = "blue";
//   });
// });

// //------------------------------------Working with BigInt(ES2020)
// //biggest safe number
// console.log(2 ** 53 - 1);
// //not safe numbers
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);

// console.log(Number.MAX_SAFE_INTEGER);

// //n transform the number in big number with precision
// console.log(2343425324645675483965476894376344n);
// console.log(BigInt(2343425324645675483965476894376344)); //not ok
// console.log(BigInt(23434253246)); //ok for small numbers

// //Operations
// console.log(10000n + 10000n);
// console.log(111111111111111111111111111111111111111111n * 100n);

// // console.log(Math.sqrt(16n));//math operation doesn't work

// const huge = 222222222222222222222222222222222222n;
// const num = 100;
// // console.log(huge * num); //error, must be converted
// console.log(huge * BigInt(num));

// //Exceptions
// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == 20);
// console.log(20n == "20");

// console.log(huge + "is realyy big");

// //Divisions
// console.log(10n / 3n); //closest big int
// console.log(10 / 3);

//----------------------------------------------Creating DATES and TIMES
//Create a DATE
//JavaScript parse the data even if we throw different formats and wrong dates
// const now = new Date();
// console.log(now);

// console.log(new Date("Sun Jan 03 2021 20:21:52"));
// console.log(new Date("December 24, 2021"));

// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 14, 23, 5));
// console.log(new Date(2037, 10, 33));

// console.log(new Date(0));
// //3 days * 24 hours * 60 min * 60 sec * 1000 ms(this is timestamp)
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

//Working with Date methods
// const future = new Date(2037, 10, 19, 14, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getMilliseconds());
// //international date and time
// console.log(future.toISOString());
// console.log(future.getTime());

// //timestamps
// console.log(new Date(2142246180000));

// console.log(Date.now());

// //setting a new date
// future.setFullYear(2040);
// console.log(future);

//---------------------Operation with dates
// const future = new Date(2037, 10, 19, 14, 23);
// console.log(future);
// //transform the date to timestamp
// console.log(+future);

// //calculating the days between two dates
// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// // const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24, 10, 8)); //need to use Math.round
// console.log(days1);
// //moment.js library for edge cases

//------------------------------------------Internationalizing dates

//------------------------------------------Timers: SETTIMEOUT AND SETINTERVAL

//calling an callback function after a number of milliseconds
//don't wait to finish to continue the code, it register the callback function and move on
// setTimeout(() => console.log("Here is your pizza🍕"), 3000);

// //--setTimeout() function
// const ingredients = ["olives", "spinac"];
// // setTimeout((ing1, ing2) => console.log(`Here is your pizza🍕 with ${ing1} and ${ing2}`), 3000, "olives", "spinach");
// const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza🍕 with ${ing1} and ${ing2}`), 3000, ...ingredients);

// if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

// console.log("Waiting ...");

// //----setTimeout()
// setInterval(function () {
//   const now = new Date();
//   const nowHours = `${now.getHours()}`.padStart(2, 0);
//   const nowMinutes = `${now.getMinutes()}`.padStart(2, 0);
//   const nowSeconds = `${now.getSeconds()}`.padStart(2, 0);
//   console.log(`${nowHours}:${nowMinutes}:${nowSeconds}`);
// }, 1000);
