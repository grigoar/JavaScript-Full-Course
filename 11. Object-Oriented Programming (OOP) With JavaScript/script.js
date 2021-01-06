"use strict";
//-----------------------OOP in JavaScript
//------------------------Constructor functions and the new Operator

//Constructor function
//only function expression(this) and function declarations can be used, because arrow functions don't have "this" keyword
const Person = function (firstName, birthYear) {
  //   console.log(this);
  //setting the properties to the arguments passed
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never create a method into the constructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };

  //will use prototypes and prototypal inheritance instead of methods
  //if we define here because of the fact that the functions declared in constructor function are copied for each object, there would be a performance issue
};

//grig is an instance of a Person
const grig = new Person("Grig", 1992);
console.log(grig);

//4 steps behind the scene when creating a new object with the word "new"
//1. New  object{} is created
//2. Function is called and the "this" keyword points the the previous created object this ={}
//3. {} The object created is linked to prototype
//4. function automatically return  the empty object in the beginning{}(not necessarily empty)

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);

const jay = "Jay";
console.log(grig instanceof Person);
console.log(jay instanceof Person);

//-------------------Prototypes
// all the objects created using the "Person" will have access to the methods defined in the Person.prototype
console.log(Person.prototype);
//only one copy of the function and each of the created object can call the method
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

grig.calcAge();
matilda.calcAge();

//the prototype of grig object is the same of the Person.prototype
// the prototype in Person.prototype is not the prototype of the Person, it is the prototype of all the the object that are created using that Person
console.log(grig.__proto__);
console.log(grig.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(grig));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

//can set properties in the prototypes also
Person.prototype.species = "Homo Sapiens";
//this properties are not stored in its object, but in the prototype
console.log(grig.species, matilda.species);

console.log(grig.hasOwnProperty("firstName"));
console.log(grig.hasOwnProperty("species"));

//prototypal inheritance and prototypal chain

//-------------------------Prototypal inheritance on built-in objects
console.log(grig.__proto__);
console.log(grig.__proto__.__proto__); //Object prototype(top of the prototype chain)
console.log(grig.__proto__.__proto__.__proto__); //null

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [2, 3, 66, 7, 87, 8, 6, 6, 6, 9]; //new Array === []
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

//creating a new function into the array prototype
//and we can use the method after that
//not a good idea
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

//this have a large prototype chain
const h1 = document.querySelector("h1");
console.dir(h1);

console.dir((x) => x + 1);

//---------------------------------Coding challenge #1
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
  console.log(`'${brand}' car is going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  //this is referring to the object that will call the method
  this.speed += 10;
  console.log(`Accelerating. New speed is now ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`Brake activated. New speed in now ${this.speed}`);
};

const carBMV = new Car("BMV", 120);
const carMercedes = new Car("Mercedes", 95);

carBMV.accelerate();
carBMV.accelerate();
carBMV.brake();
carMercedes.accelerate();
carMercedes.accelerate();
carMercedes.accelerate();
carMercedes.brake();
carMercedes.brake();

//---------------------------------------ES6 CLASSES
//Modern syntax
//class are still function(just a special type)

//class expression
// const PersonCl = class {};

//class declaration
class PersonCl {
  //   constructor(firstName, birthYear) {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //methods
  //the methods are automatically added to the prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  //   greet() {
  //     console.log(`Hey ${this.firstName}`);
  //   }
  get age() {
    return 2037 - this.birthYear;
  }

  //Set a property that already exist
  set fullName(name1) {
    console.log(name1);
    //we need to create a new property
    if (name1.includes(" ")) this._fullName = name1;
    else alert(`${name1} is not a full name`);
  }

  //we need to call the get to set the new property to the existing property
  get fullName() {
    return this._fullName;
  }
}

// const jessica = new PersonCl("Jessica", 1993);
const jessicaFullName = new PersonCl("Jessica Davis", 1993);

// console.log(jessica);
console.log(jessicaFullName);
// jessica.calcAge();

// console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
// jessica.greet();

//1. Classes are NOT hoisted like function declaration
//2. Class are first-class citizes(we can pass to another function and can return from the function)-just a special kind of function
//3. Classes are executed in strict mode always.

//---------------------------------Setters and getters

const walter = new PersonCl("Walter White", 1953);
console.log(walter.firstName);

const account = {
  owner: "grig",
  movements: [20, 5, 212, 500],

  //this are treated like a property
  //we don't call like methods
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
  get age() {
    // return 2037 - this.birthYear;
    return 2037 - 1992;
  },
};
//we call the setters and getters as methods
console.log(account.latest);

account.latest = 50;
console.log(account.latest);
// console.log(account.age);

// console.log(jessica.age);
//Getters and setters are very good when we want to do data validation
