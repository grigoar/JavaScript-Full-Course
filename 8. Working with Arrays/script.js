"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//arrays are objects that have multiple methods

//--------------------------------------Arrays methods
// let arr = ["a", "b", "c", "d", "e"];

// //----SLICE
// //slice method-take an slice of an array(extract)
// //slice from pos "start"
// console.log(arr.slice(2));
// //slice from pos "start" to end
// console.log(arr.slice(2, 4));
// //slice from end
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// //slice from start to end except last 2 elements
// console.log(arr.slice(1, -2));
// //make a shallow array
// console.log(arr.slice());
// console.log([...arr]);

// //----SPLICE
// //This method mutate the array
// //It extracts the elements out and the original array remains without the extracted part
// // console.log(arr.splice(2));
// //remove last element
// arr.splice(-1);
// console.log(arr);
// //remove elements starting at start and delete deleteCount elements
// arr.splice(1, 2);
// console.log(arr);

// //Reverse
// //This method mutate the array
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// //mutate the array
// console.log(arr2.reverse());
// console.log(arr2);

// //CONCAT method
// //does NOT mutate the original array
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //JOIN method
// console.log(letters.join(" - "));

//----------------------LOOPING ARRAYS: FOREACH
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// //how we can access the index
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("----------------FOREACH--------------------");
// //this is a higher-order function that requires a callback function
// //forEach function call the callback function to tell it what to do
// ///for each iteration we pass the element of the array
// //You can't break out from a forEach loop
// // movements.forEach(function (movement) {
// //The forEach method passing multiple arguments(currentElement, currentIndex and wholeArray)
// // movements.forEach(function (movement, index, array) {
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// //----------------------FOREACH with MAPS and SETS
// console.log("---------------FOREACH with MAPS and SETS--------------------");
// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// //Map foreach
// currencies.forEach(function (currentValue, key, map) {
//   console.log(`${key}: ${currentValue}`);
// });

// console.log("---------------FOREACH  SETS--------------------");
// //SET foreach
// //set doesn't have keys
// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// // currenciesUnique.forEach(function (value, key, set) {
// //throw away variable "_"
// currenciesUnique.forEach(function (value, _, set) {
//   // console.log(`${key}: ${value}`);
//   console.log(`${value}: ${value}`);
// });

// PROJECT: "BANKLST" APP
//add the data into the function instead of global
const displayMovements = function (movements, sort = false) {
  //remove the before content
  containerMovements.innerHTML = "";

  //make a copy in a chain slice()
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    //create a string of HTML and insert in our index
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

const user = "Steven Thomas Williams"; //stw

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + Math.abs(cur), 0);
  labelSumOut.textContent = `${out}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

//Event handler
let currentAccount;

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
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log("Login");
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    //so the input text value looses focus
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    //UpdateUI
    updateUI(currentAccount);
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
    //Update UI
    updateUI(currentAccount);
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

//---------------------------------------------Challenge on arrays
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];

// const juliaData2 = [9, 17, 6, 8];
// const kateData2 = [10, 5, 6, 1, 4];

// const checkDogs = function (arr1, arr2) {
//   const arr2Function = [...arr2];
//   //bad practice to mutate the parameters of the function
//   const onlyDogs = arr1.slice();
//   // const onlyDogs = arr1.slice(1, -2);
//   onlyDogs.splice(0, 1);
//   onlyDogs.splice(-2);

//   console.log(onlyDogs);
//   //function join add something extra
//   // console.log(onlyDogs.join(arr2Function));
//   const allDogs = onlyDogs.concat(arr2Function);
//   // const allDogs = [...onlyDogs, ...arr2Function];
//   console.log(allDogs);
//   allDogs.forEach(function (dogAge, i) {
//     dogAge >= 3
//       ? console.log(`Dog number ${i + 1} is an adult, and is ${dogAge} old`)
//       : console.log(`Dog number ${i + 1} is still a puppy :D`);
//   });
// };
// checkDogs(juliaData, kateData);
// checkDogs(juliaData2, kateData2);
// console.log(juliaData);
// console.log(kateData);

//--------------------------------------Data transformations for array: MAP, FILTER, Reduce methods
//Map method loop over arrays--create a new array based on the original array
//maps the original value to a new array

//Filter return a a new array containing the array elements that passed a specified test condition

//Reduce method reduce boils("reduces") all array elements down to one single value (adding all elements together)

//--------------------------------MAP method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUSD = 1.1;

// //modern javascript: is pushing into functional programming -> using a function
// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUSD;
// //   // return 23;
// // });
// const movementsUSD = movements.map((mov) => mov * eurToUSD);

// console.log(movements);
// console.log(movementsUSD);

// //for old javascript
// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUSD);
// }
// console.log(movementsUSDfor);

// //Map function call the callback function for each element of the array
// // const movementsDescriptions = movements.map((mov, i, arr) => {
// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
//       mov
//     )}`
//   //if is only one line of code to return we can't use the ";"

//   // if (mov > 0) {
//   //   return `Movement ${i}: You deposited ${mov}`;
//   // } else {
//   //   return `Movement ${i}: You withdrew ${Math.abs(mov)}`;
//   // }
// );
// console.log(movementsDescriptions);

//----------------------------------------------------------------FILTER METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //we can chain the methods when using functional programming instead of for
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) depositsFor.push(mov);
// }
// console.log(depositsFor);

// const withdrawals = movements.filter((mov, i, arr) => mov < 0);
// // const withdrawals = movements.filter(function (mov) {
// //   return mov < 0;
// // });
// console.log(withdrawals);

//---------------------The reduced method
// console.log(movements);
// //accumulator is like a SNOWBALL
// //in each iteration we return a value and the acc has a new value, and we initialise the value for the accumulator at the end of the function
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);
// // const balance = movements.reduce(function (acc, cur, i, arr) {
// //   console.log(`Iteration ${i}: ${acc}`);
// //   return acc + cur;
// // }, 0);
// // console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// //Maximum value using reduce
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

//--------------------Challenge nr 2
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const juliaData = [5, 2, 4, 1, 14, 8, 3];
// const kateData = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (arr) {
//   // const mappedToHuman = arr.map(function (cur, i, arr) {
//   //   return cur > 2 ? 16 + cur * 4 : cur * 2;
//   // });
//   const mappedToHuman = arr.map((cur, i, arr) => (cur > 2 ? 16 + cur * 4 : cur * 2));
//   console.log(mappedToHuman);

//   const filteredMajorHuman = mappedToHuman.filter((cur, i) => cur > 18);
//   console.log(filteredMajorHuman);

//   // const accumulatedAverageMajorHumanAge =
//   //   filteredMajorHuman.reduce(function (acc, cur, i) {
//   //     return (acc += cur);
//   //   }, 0) / filteredMajorHuman.length;

//   //Average can be calculated like this
//   ////2 3. (2+3)/2 = 2.5
//   //= 2/2 +3/2
//   const accumulatedAverageMajorHumanAge = filteredMajorHuman.reduce(function (acc, cur, i, arr) {
//     return acc + cur / arr.length;
//   }, 0);
//   console.log(accumulatedAverageMajorHumanAge);
//   console.log(filteredMajorHuman.length);
//   console.log(accumulatedAverageMajorHumanAge);
// };
// calcAverageHumanAge(juliaData);
// calcAverageHumanAge(kateData);
// // console.log(juliaData);

// -----------------------------------The magic of chaining methods
// const eurToUsd = 1.1;
// console.log(movements);
// //PIPELINE
// //the sum of total deposits made
// //chaining the methods that return an array
// //if we want to see the array after the operation we can console log the array in the next method
// const totalDepositUSD = movements
//   .filter((mov) => mov > 0)
//   // .map((mov) => mov * eurToUsd)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUSD);

// //if the array are large it can became a problem of performance
// //try to reduce the methods and optimization

// //do not chain methods as splice or revers(for mutating problems)

// //-----------------------------Challenge 3
// const juliaData = [5, 2, 4, 1, 15, 8, 3];
// const kateData = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = (arr) =>
//   arr
//     .map((cur, i, arr) => (cur > 2 ? 16 + cur * 4 : cur * 2))
//     .filter((cur, i) => cur > 18)
//     //need to calculate the average in the new formula, because we can't access the length of the array when chaining, only if we split it in 2 parts
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// // const mappedToHuman = arr.map((cur, i, arr) => (cur > 2 ? 16 + cur * 4 : cur * 2));
// // console.log(mappedToHuman);

// // const filteredMajorHuman = mappedToHuman.filter((cur, i) => cur > 18);
// // console.log(filteredMajorHuman);

// // // const accumulatedAverageMajorHumanAge =
// // //   filteredMajorHuman.reduce(function (acc, cur, i) {
// // //     return (acc += cur);
// // //   }, 0) / filteredMajorHuman.length;

// // //Average can be calculated like this
// // ////2 3. (2+3)/2 = 2.5
// // //= 2/2 +3/2
// // const accumulatedAverageMajorHumanAge = filteredMajorHuman.reduce(function (acc, cur, i, arr) {
// //   return acc + cur / arr.length;
// // }, 0);
// // console.log(accumulatedAverageMajorHumanAge);
// // console.log(filteredMajorHuman.length);
// // console.log(accumulatedAverageMajorHumanAge);

// console.log(calcAverageHumanAge(juliaData));
// console.log(calcAverageHumanAge(kateData));

// //--------------------------------------The FIND method
// //return only first element that satisfy the condition
// const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// //searching an element that has a property meeting a condition
// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);
// let accountJessica = {};
// for (const account of accounts) {
//   if (account.owner === "Jessica Davis") Object.assign(accountJessica, account);
// }
// console.log(accountJessica);

//----------------------------------------FINDINDEX method--in ES6
//return the index where the condition is met
// const index = accounts.findIndex((acc) => acc.username === currentAccount.username);

//-----------------------------SOME and EVERY methods
// console.log(movements);
// //EQUALITY
// console.log(movements.includes(-130));

// //SOME is like include, but we can compute an complex condition with the help of an callback function
// //CONDITION
// // const anyDeposits = movements.some((mov) => mov > 5000);
// const anyDeposits = movements.some((mov) => mov > 1500);
// // const anyDeposits = movements.some((mov) => mov === -1500);
// console.log(anyDeposits);

// //EVERY- return true if all the elements pass the condition, if not it returns false

// console.log(movements.every((mov) => mov > 0));
// //all mov>0
// console.log(account4.movements.every((mov) => mov > 0));

// // Separate callback
// // const deposit = (mov) => mov > 0;
// const deposit = (mov) => mov < 0;
// console.log(movements.every(deposit));
// console.log(movements.some(deposit));
// console.log(movements.filter(deposit));

// //-------------------------------FLAT and FLATMAP methods(2019)
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// //only one level deep
// //flat method
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(1));
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// const overalBalance2 = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

// //---------flatMap method
// //only 1 level deep
// const overalBalanceMap = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalanceMap);
// // let arrFlat = [1, 2, 3, 4];

// // arrFlat.flatMap((x) => [x, x * 2]);
// // console.log(arrFlat);

// //------------------------------------SORTING Arrays
// //The sort sort everything based on string
// const owners = ["Grig", "Zach", "Adam", "Martha"];
// //This mutate the array
// console.log(owners.sort());
// console.log(owners);

// //Numbers
// console.log(movements);
// //doesn't word
// // console.log(movements.sort());

// //return < 0, A,B(keep order)
// //return > 0 B,A(switch order)
// //ascending order
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// movements.sort((a, b) => a - b);

// //descending order
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

//-------------------------------More ways of creating and filling arrays
//Creating arrays programmatically
// console.log([1, 2, 34, 5, 6, 7]);
const arr = [1, 2, 34, 5, 6, 7];
console.log(new Array(1, 23, 4, 5, 6, 7, 8));

//Empty array + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

//--------Fill method
// x.fill(1);
// x.fill(1, 3);
x.fill(1, 3, -1);
x.fill(1, 3, 6);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

//Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

//is like map method on an empty array
// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//1000 random array
const random = Array.from({ length: 100 }, (_, i) => (i = Math.trunc(Math.random() * 6)));
console.log(random);

labelBalance.addEventListener("click", function () {
  //need to transform an array of nodes to an array
  //it wouldn't work if we would selected the nodes only
  //we can map directly here
  const movementsUI = Array.from(document.querySelectorAll(".movements__value"), (el) => Number(el.textContent.replace("€", "")));
  console.log(movementsUI);
  // console.log(movementsUI.map((el) => Number(el.textContent.replace("€", ""))));
  //this also transform the node list(array like list) into an array
  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
  console.log(movementsUI2);
});
