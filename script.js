
// let js = 'amazing';
// console.log(40 + 8 + 23 - 10);

// //Values-the smallest unit in javascript
// console.log("Grig");
// console.log(5);

// //declaring a variable and assigning a value to it
// //creating a box with the label firstName and putting the value "Grig"
// let firstName = "Grigg"
// console.log(firstName);

// let years = 3;


//----------------------------------Data Types: Objects and Primitives
// console.log(true);
// let javascriptIsFun = true;
// console.log(":" + javascriptIsFun + typeof javascriptIsFun);
// console.log(typeof true)
// console.log(typeof 23)
// console.log(typeof "grig")

// //Dynamic typing
// javascriptIsFun = "YES!";
// console.log(":" + javascriptIsFun + typeof javascriptIsFun);

// let year;
// console.log(year);//undefined
// console.log(typeof year);//undefined

// year = 1992;
// console.log(year);//undefined
// console.log(typeof year);//undefined

// console.log(typeof null);//it is a bug because the null is not an object, it should be null, like undefined is undefined

// //-------------------------let const(ES6) and var
// console.log("-------------------------let const(ES6) and var");

// //mutable variable
// let age = 30;
// //mutating the variable
// age = 31;

// //immutable variable
// const birthYear = 1992;
// // birthYear = 1999;
// //need to be initialized
// // const job;

// //should use const for variables first and change after to let if needed

// //old way of declaring the variables
// var job = 'programmer';
// job = 'teacher';

// //if not declaring the variable it will be assigned to the global variable window
// lastName = 'Nath';
// console.log(lastName);

// //-------------------------operators in javascript
// console.log("-------------------------operators in javascript");

// //Math operators
// const now = 2036;
// const ageJonas = now - 234;
// const ageSara = now - 2364;
// console.log(ageJonas, ageSara)

// console.log(ageJonas * 2, ageSara / 2);
// //2 ** means 2 to the power of 3
// const firstName = "grig";
// const lastName = "nath";
// console.log(firstName + " " + lastName);

// //Assignment operators
// let x = 10 + 5;
// x += 10;
// console.log(x);

// //Comparison operators
// console.log(ageJonas > ageSara);
// const isFullAge = ageSara >= 18;

//-------------------------operators precedence
// console.log("-------------------------operators precedence");
// const now = 2036;
// const ageJonas = now - 1990;
// const ageSara = now - 2018;

// console.log(now - 1991 > now - 2018)

// let x, y;//undefined
// x = y = 25 - 10 - 5;
// console.log(x, y);

// const averageAge = (ageJonas + ageSara) / 2;
// console.log(averageAge);


// //--------------------------------Some challenge

// let weightMark = 78;
// let weightJohn = 92;

// let heightMark = 1.69;
// let heightJohn = 1.95;

// const bmiMark = weightMark / heightMark ** 2;
// const bmiJohn = weightJohn / (heightJohn * heightJohn);
// console.log(bmiMark);
// console.log(bmiJohn);

// const markHigherBMI = bmiMark > bmiJohn;
// console.log("Mark has higher BMI than John " + markHigherBMI);

//---------------------------------String and Template Literals
// const firstName = "Grigore";
// const job = 'freelencer';
// const birthYear = 1992;
// const year = 2020;
// const grig = "I'm " + firstName + ", and I am " + (year - birthYear) + " years old";
// console.log(grig);

// //Template strings--ES6
// const grigNew = `I'm ${firstName}, and I am ${year - birthYear} years old!`;
// console.log(grigNew);
// console.log(`Just a regular string...`);
// console.log("String with \n\
//  multiple \n\
//     lines");
// console.log(`String with
//  multiple 
//     lines  `);

//------------------------------------Taking decisions - IF...ELSE statements
// const age = 15;
// const isOldEnough = age >= 18;
// // if (isOldEnough) {
// if (age >= 18) {
//     console.log("SArah can start driving licence ");
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
// }

// const birthYear = 1992;
// let century;
// if (birthYear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }
// console.log(century);


//-----------second challenge

// let weightMark = 78;
// let heightMark = 1.69;
// let weightJohn = 92;
// let heightJohn = 1.95;

// const bmiMark = Math.round(weightMark / heightMark ** 2 * 10) / 10;
// const bmiJohn = Math.round(weightJohn / (heightJohn * heightJohn) * 10) / 10;
// console.log(bmiMark);
// console.log(bmiJohn);

// // const markHigherBMI = bmiMark > bmiJohn;
// // console.log("Mark has higher BMI than John " + markHigherBMI);

// if (bmiMark > bmiJohn) {
//     console.log(`Mark's BMI(${bmiMark}) is higher than John's BMI (${bmiJohn})`);
// } else if (bmiJohn < bmiMark) {
//     console.log(`John's BMI(${bmiJohn}) is higher than Mark's BMI (${bmiMark})`);
// } else {
//     console.log(`Both, John and Mark have the same BMI(${bmiMark})`);
// }

//===================Type conversion(we do it explicitly) and coercion(when the java convert the data to another type for us)

// //type conversion
// const inputYear = "1992";
// console.log(Number(inputYear) + 18)
// console.log(inputYear + 18);

// console.log(Number("grig"));
// console.log(typeof NaN);//invalid number NaN
// console.log(String(23));

// //type coercion
// // ONLY "+" triggers conversion from number to string
// console.log("I am " + 23 + " years old")
// console.log("I am " + "23" + " years old");

// //"- * / >" triggers the opposite conversion=> from string to number
// console.log("23" - "10" - 2);
// console.log("23" + "10" + 2);
// console.log("23" * "2");//works
// console.log("23" / "2");//works
// console.log("23" > "2");//works

// let n = "1" + 1;
// n = n - 1;
// console.log(n);

//--------------------------Truthy and falsy values
// console.log(Boolean(0));
// console.log(Boolean(undefined));
// console.log(Boolean("grig"));
// console.log(Boolean(""));
// console.log(Boolean({}));//empty object->true

// const money = 0;
// if (money) {
//     console.log("Don't spend it all;");

// } else {
//     console.log("You should get a job!");
// }

// // let height;
// let height = 0;//same=> some bug
// if (height) {
//     console.log("Yay! Height is defined");
// } else {
//     console.log("Height is UNDEFINED");
// }


//------------------------------Equality operators

// const age = 18;
// //Strict equality operator and it doesn't do the type coercion
// if (age === 18) {
//     console.log(`the age is ${age} is LEGAL...for driving :))`);

// }

// // Loose equality does type coercion
// if ("18" == 18) console.log("using LOOSE equality and JS using type coercion")
// if ("18" === 18) console.log("using STRICT equality and JS NOT using type coercion");

// // const favourite = prompt("What's your favourite number?");
// const favourite = Number(prompt("What's your favourite number?"));

// console.log(favourite);
// console.log(typeof favourite);

// // if (favourite == 23) {
// if (favourite === 23) {
//     console.log("Cool! 23 is an amazing nubmer!");
// } else if (favourite === 7) {
//     console.log("7 is a cool number, too!");
// } else {
//     console.log("number is not 7 nor 23!");
// }

// //diferent operator
// if (favourite !== 23) console.log("Why not 23?");


//----------------------------------Boolean logic &&, ||, !
//----------------------------------Switch statement

// const day = "monday";
const day = "monday";

switch (day) {
    case "monday":
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "tuesday":
        console.log("prepare for wednesday");
        break;
    case "wednesday":
    case "thursday":
        console.log("Write code examples");
        break;
    case "friday":
        console.log("Record videos");
        break;
    case "saturday":
    case "sunday":
        console.log("enjoy the weekend");
        break;
    default:
        console.log("not a valid day");
}


//Statements and expresions

//Expression
//instruction that produce an value
2 + 4
true
1991
true && true || false

//Statement does not produce a value and is larger
//the statements are like a collection of actions and the action will perform something
if (23 > 10) {
    const str = "23 is bigger"; // this is a statement, ending with ";"
}
//the literal template does accept only expressions
console.log(`I'm ${2028 - 1992} years old`);
// console.log(`I'm ${const str = "23 is bigger"} years old`);

// The statements produce an expression => and the expression produce a value
const me = "Grig";//this is a statement that produce an expression " me" and that is a string value "me"

//---------------------------The conditional operator
//An operator is an expression
//Ternary operator
// const age = 13;
// age >= 18 ? console.log("I like to drink beer") : console.log("I like to drink juice");

// //usually used like this
// const drink = age >= 18 ? "wine" : "water";
// console.log(drink);

// //much better than this
// let drink2;
// if (age >= 18) {
//     drink = "wine";
// } else {
//     drink2 = "water";
// }
// console.log(drink2);

// //because it is an expression it can be used on string literals
// console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);


//------------------------another challenge -ternary operation

const bill = 275
const tip = (bill > 50 && bill < 300) ? 15 / 100 : 20 / 100;

console.log(`The bill was ${bill}, the tip was ${tip} and the total value was ${bill + bill * tip}`);

//-----------------------ES5(ECMA Script 5) , ES6, ES6+...... and ES Next




































