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
const displayMovements = function (movements) {
  //remove the before content
  containerMovements.innerHTML = "";
  //.textContent= 0;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    //create a string of HTML and insert in our index
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
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

displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements);

const user = "Steven Thomas Williams"; //stw

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
console.log(accounts);

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
console.log(movements);
//accumulator is like a SNOWBALL
//in each iteration we return a value and the acc has a new value, and we initialise the value for the accumulator at the end of the function
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Maximum value using reduce
//TO DO
