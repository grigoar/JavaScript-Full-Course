"use strict";
//-----------------------OOP in JavaScript
//------------------------Constructor functions and the new Operator

//Constructor function
//only function expression(this) and function declarations can be used, because arrow functions don't have "this" keyword
// const Person = function (firstName, birthYear) {
//   //   console.log(this);
//   //setting the properties to the arguments passed
//   //Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   //Never create a method into the constructor function
//   //   this.calcAge = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };

//   //will use prototypes and prototypal inheritance instead of methods
//   //if we define here because of the fact that the functions declared in constructor function are copied for each object, there would be a performance issue
// };

// //grig is an instance of a Person
// const grig = new Person("Grig", 1992);
// console.log(grig);

// //4 steps behind the scene when creating a new object with the word "new"
// //1. New  object{} is created
// //2. Function is called and the "this" keyword points the the previous created object this ={}
// //3. {} The object created is linked to prototype
// //4. function automatically return  the empty object in the beginning{}(not necessarily empty)

// const matilda = new Person("Matilda", 2017);
// const jack = new Person("Jack", 1975);
// console.log(matilda, jack);

// const jay = "Jay";
// console.log(grig instanceof Person);
// console.log(jay instanceof Person);

// //-------------------Prototypes
// // all the objects created using the "Person" will have access to the methods defined in the Person.prototype
// console.log(Person.prototype);
// //only one copy of the function and each of the created object can call the method
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// grig.calcAge();
// matilda.calcAge();

// //the prototype of grig object is the same of the Person.prototype
// // the prototype in Person.prototype is not the prototype of the Person, it is the prototype of all the the object that are created using that Person
// console.log(grig.__proto__);
// console.log(grig.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(grig));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// //can set properties in the prototypes also
// Person.prototype.species = "Homo Sapiens";
// //this properties are not stored in its object, but in the prototype
// console.log(grig.species, matilda.species);

// console.log(grig.hasOwnProperty("firstName"));
// console.log(grig.hasOwnProperty("species"));

// //prototypal inheritance and prototypal chain

// //-------------------------Prototypal inheritance on built-in objects
// console.log(grig.__proto__);
// console.log(grig.__proto__.__proto__); //Object prototype(top of the prototype chain)
// console.log(grig.__proto__.__proto__.__proto__); //null

// console.log(Person.prototype.constructor);
// console.dir(Person.prototype.constructor);

// const arr = [2, 3, 66, 7, 87, 8, 6, 6, 6, 9]; //new Array === []
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// //creating a new function into the array prototype
// //and we can use the method after that
// //not a good idea
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// //this have a large prototype chain
// const h1 = document.querySelector("h1");
// // console.dir(h1);

// // console.dir((x) => x + 1);

// //---------------------------------Coding challenge #1
// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// const Car = function (brand, speed) {
//   this.brand = brand;
//   this.speed = speed;
//   console.log(`'${brand}' car is going at ${this.speed} km/h`);
// };

// Car.prototype.accelerate = function () {
//   //this is referring to the object that will call the method
//   this.speed += 10;
//   console.log(`Accelerating. New speed is now ${this.speed}`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`Brake activated. New speed in now ${this.speed}`);
// };

// const carBMV = new Car("BMV", 120);
// const carMercedes = new Car("Mercedes", 95);

// carBMV.accelerate();
// carBMV.accelerate();
// carBMV.brake();
// carMercedes.accelerate();
// carMercedes.accelerate();
// carMercedes.accelerate();
// carMercedes.brake();
// carMercedes.brake();
// ////////////////////////////////////////////////////////////////////////////
// //---------------------------------------ES6 CLASSES
// //Modern syntax
// //class are still function(just a special type)

// //class expression
// // const PersonCl = class {};

// //class declaration
// class PersonCl {
//   //   constructor(firstName, birthYear) {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   //Instance methods and all objects have access to them
//   //methods
//   //the methods are automatically added to the .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   //   greet() {
//   //     console.log(`Hey ${this.firstName}`);
//   //   }
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   //Set a property that already exist
//   set fullName(name1) {
//     console.log(name1);
//     //we need to create a new property
//     if (name1.includes(" ")) this._fullName = name1;
//     else alert(`${name1} is not a full name`);
//   }

//   //we need to call the get to set the new property to the existing property
//   get fullName() {
//     return this._fullName;
//   }

//   //Static methods like helpers
//   //only PersonCl has access to them, not the instances
//   static hey() {
//     console.log("Hey there 🤗");
//     //this is the constructor function that call the function
//     console.log(this);
//   }
// }

// // const jessica = new PersonCl("Jessica", 1993);
// const jessicaFullName = new PersonCl("Jessica Davis", 1993);

// // console.log(jessica);
// console.log(jessicaFullName);
// // jessica.calcAge();

// // console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
// // jessica.greet();

// //1. Classes are NOT hoisted like function declaration
// //2. Class are first-class citizes(we can pass to another function and can return from the function)-just a special kind of function
// //3. Classes are executed in strict mode always.

// //---------------------------------Setters and getters

// const walter = new PersonCl("Walter White", 1953);
// console.log(walter.firstName);

// const account = {
//   owner: "grig",
//   movements: [20, 5, 212, 500],

//   //this are treated like a property
//   //we don't call like methods
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
//   get age() {
//     // return 2037 - this.birthYear;
//     return 2037 - 1992;
//   },
// };
// //we call the setters and getters as methods
// console.log(account.latest);

// account.latest = 50;
// console.log(account.latest);
// // console.log(account.age);

// // console.log(jessica.age);
// //Getters and setters are very good when we want to do data validation

// //...................................Static methods
// //the static function are attached to the Array constructor
// //like helpers
// Array.from(document.querySelectorAll("h1"));
// //we can't use arr.from()

// Person.hey = function () {
//   console.log("Hey there 🤗");
//   //this is the constructor function that call the function
//   console.log(this);
// };
// Person.hey();
// // grig.hey();

// PersonCl.hey();

// //-------------------------------Object.create()
// //we can set the prototype of an object to any object do we want

// //When we create a new object with the Object.create() we link the new object to the parent Object prototype
// //When we create a new object with the Object.create the prototype of the new object will be the same with the prototype of the object we passed in
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   //this is not a constructor, it is just a normal method, we don't initialize the objects with new keyword
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };
// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = "Steven";
// steven.birthYear = 1992;
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init("Sarah", 1979);
// sarah.calcAge();
// console.log(sarah);

//Coding Challenge #2
///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(brand, speed) {
//     this.brand = brand;
//     this.speed = speed;
//     console.log(`We have a ${this.brand} going ${this.speed} km/h`);
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`The ${this.brand} accelerated and now is going ${this.speed} km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`The ${this.brand} braked and now is going ${this.speed} km/h`);
//   }

//   get speedUS() {
//     // return console.log(`In US this speed is ${this.speed / 1.6} mil/h`);
//     return this.speed / 1.6;
//   }

//   set speedUS(speedMiles) {
//     this.speed = speedMiles * 1.6;
//     console.log(`The new speed is set to ${this.speed}`);
//   }
// }

// const ford = new Car("Ford", 120);
// // console.log(ford);
// console.log(`In US this speed is ${ford.speedUS} mil/h`);
// ford.accelerate();
// ford.accelerate();
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.brake();
// // ford.speedUs;
// console.log(`In US this speed is ${ford.speedUS} mil/h`);
// // console.log(ford.speedUS);
// ford.speedUS = 180;
// ford.accelerate();

//------------------------INheritance between "Classes": constructor functions
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   // this.firstName = firstName;
//   // this.birthYear = birthYear;
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// //the student.prototype is now an object that inherits from Person.prototype
// //this is empty and we need to create it before adding new method because it will overwrite them
// //Linking prototype
// Student.prototype = Object.create(Person.prototype);

// // Student.prototype = Person.prototype;//bad code

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I studied ${this.course}`);
// };

// const mike = new Student("Mike", 2020, "Computer Science");
// console.log(mike);
// mike.introduce();
// // mike.calcAge(); //finding the methods in the prototype chain
// // mike.introduce();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

// //we need to set manually the constructor if we want to use it
// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (brand, speed) {
//   this.brand = brand;
//   this.speed = speed;
//   // console.log(`'${brand}' car is going at ${this.speed} km/h`);
// };

// Car.prototype.accelerate = function () {
//   //this is referring to the object that will call the method
//   this.speed += 10;
//   console.log(`Accelerating. New speed is now ${this.speed}`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`Brake activated. New speed in now ${this.speed}`);
// };

// //constructor function
// const EV = function (brand, speed, charge) {
//   Car.call(this, brand, speed);
//   this.charge = charge;
//   console.log(`${this.brand} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
// };

// //Linking the prototypes to inherits the methods
// EV.prototype = Object.create(Car.prototype);

// const tesla = new EV("Tesla", 120, 23);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`The ${this.brand} is now charged at ${this.charge}%`);
// };

// //This is taken from the Car methods
// tesla.accelerate();

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(`The ${this.brand} accelerated and its speed is now ${this.speed} km/h, with a remaining charge of ${this.charge}`);
// };
// //This is taken when overriding accelerate method
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(50);
// console.log(tesla);

//-----------------------------Inheritance between "classes":ES6 Classes
//class declaration
// class PersonCl {
//   //   constructor(firstName, birthYear) {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   //Instance methods and all objects have access to them
//   //methods
//   //the methods are automatically added to the .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   //   greet() {
//   //     console.log(`Hey ${this.firstName}`);
//   //   }
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   //Set a property that already exist
//   set fullName(name1) {
//     console.log(name1);
//     //we need to create a new property
//     if (name1.includes(" ")) this._fullName = name1;
//     else alert(`${name1} is not a full name`);
//   }

//   //we need to call the get to set the new property to the existing property
//   get fullName() {
//     return this._fullName;
//   }

//   //Static methods like helpers
//   //only PersonCl has access to them, not the instances
//   static hey() {
//     console.log("Hey there 🤗");
//     //this is the constructor function that call the function
//     console.log(this);
//   }
// }

// class StudentCl extends PersonCl {
//   //If we don't need to declare new properties we can not even write a constructor method
//   constructor(fullName, birthYear, course) {
//     // PersonCl.call(this,)
//     // Always needs to happen first
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I studied ${this.course}`);
//   }

//   //overriding the method from Person
//   calcAge() {
//     console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
//   }
// }

// // const martha = new StudentCl("Martha Jones", 2012);
// const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
// console.log(martha);
// martha.introduce();
// martha.calcAge();

//-----------------------------Inheritance between "classes": Object.create()
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  //this is not a constructor, it is just a normal method, we don't initialize the objects with new keyword
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

// in this way the StudentProto inherits the prototype from PersonProto
// is not StudentProto = PersonProto because we don't want to reference the prototype of the StudentProto to point to the PersonProto
const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
// console.log(jay);
jay.introduce();
jay.calcAge();

//-----------------------------------Another Class example

//Class fields types:4/8, this are in stage 3 need to be in stage 4 to be available(each have static version)
//1)Public fields
//2)Private fields
//3)Public methods
//4)Private methods
//(there is also the static version for each)
class Account {
  //1)Public fields(instances)-they are not added to the prototype
  //cn access them with this
  locale = navigator.language;
  // _movements = [];

  //2) Private fields(instances)
  #movements = [];
  //defined here and redefined in constructor
  #pin;

  // constructor(owner, currency, pin, movements) {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // this._pin = pin;
    this.#pin = pin;
    // this.movements = movements;
    //protected property, still can be modified but you know this should not be changed from outside
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  //3)Public methods
  //Create a public interface
  getMovements() {
    return this.#movements;
  }

  //this is an Public interface of our objects
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // _approveLoan(val) {
  //   return true;
  // }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }
  static helper() {
    console.log("This is a helper method for class");
  }

  //4)Private methods
  // #approveLoan(val) {//not working yet
  _approveLoan(val) {
    return true;
  }
}
const acc1 = new Account("Grig", "EUR", 1111);

//not a good idea, need a method for this
// acc1.movements.push(250);
// acc1.movements.push(-150);
// acc1._movements.push(250);
// acc1._movements.push(-150);

acc1.deposit(250);
//small abstraction
acc1.withdraw(150);

acc1.requestLoan(1000);
//should not be allowed to do this
acc1._approveLoan(1000);
// acc1.#approveLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1.pin);
// acc1.helper();
Account.helper();
// console.log(acc1.#pin);

// console.log(acc1.#movements); //not available is private

//-----------------Encapsulation: Protected properties and methods
//Encapsulation simply means to keep data private inside a class so that they are  not accessible outside of the class

//JS doesn't have private and privacy data
//using a convention to use it

//--------------Encapsulation: private class fields and methods

//--------------------------------Chaining methods
acc1.deposit(300).deposit(500).withdraw(25).requestLoan(25000).withdraw(5000);
console.log(acc1.getMovements());

//------------------------------ES6 classes summary
///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class CarCl {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
    console.log(`We have a ${this.brand} going ${this.speed} km/h`);
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.brand} accelerated and now is going ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`The ${this.brand} braked and now is going ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    // return console.log(`In US this speed is ${this.speed / 1.6} mil/h`);
    return this.speed / 1.6;
  }

  set speedUS(speedMiles) {
    this.speed = speedMiles * 1.6;
    console.log(`The new speed is set to ${this.speed} mil/h`);
  }
}

// const EV = function (brand, speed, charge) {
//   Car.call(this, brand, speed);
//   this.charge = charge;
//   console.log(`${this.brand} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
// };

// //Linking the prototypes to inherits the methods
// EV.prototype = Object.create(Car.prototype);

// const tesla = new EV("Tesla", 120, 23);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`The ${this.brand} is now charged at ${this.charge}%`);
// };

// //This is taken from the Car methods
// tesla.accelerate();

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(`The ${this.brand} accelerated and its speed is now ${this.speed} km/h, with a remaining charge of ${this.charge}`);
// };
class EVCl extends CarCl {
  //making the charge property private
  #charge;
  constructor(brand, speed, charge) {
    super(brand, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`The ${this.brand} is now charged at ${this.#charge}%`);
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(`The ${this.brand} accelerated and its speed is now ${this.speed} km/h, with a remaining charge of ${this.#charge}%`);
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
rivian.chargeBattery(50);
rivian.accelerate();
rivian.accelerate();
rivian.accelerate();

rivian.chargeBattery(75).accelerate().accelerate().brake().chargeBattery(80);
rivian.speedUS = 100;
