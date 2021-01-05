"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

//we can access the event associated with the function and than perform some actions on the event
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//----------------------------How DOM really works behind the scene?
//DOM : Allows us to make JavaScript interact with the browser; We can write JavaScript to create, modify and delete HTML elements, set styles, classes and attributes, and listen and respond to events; Dom tree is generated from an HTML document, which we can then interact with
//DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree

//How the dom api is organized behind the scenes

//Each Node of the DOM API can be the type of: Element; Text; Comment;Document.
//Node have methods like .textContent, .childNodes, .parenNode, .cloneNode()...
//Elements have methods like: .innerHTML, .classList, .children, .parentElement, .append(), .remove(), . insertAdjacentHTML(), .querySelector(), .closest(), .matches(), .scrollIntoView(), .setAttribute() etc
//Document also have methods like : .querySelector(), .createElement(), .getElementById()
// Each Element has a child HTML Element that have one different type of HTMLElement per HTML element because it has special properties... : HTMLButtonElement , HTMLDivElement, HTMLImage, HTMLLink(and each of these can have some special attribute that only that element has(ex.href))
//all the bottom element have all the methods that the parents element have
//there is a special node :EventTarget that has the .addEventListener() and .removeEventListener() that every node inherit and also the Window(Global object, lots of methods and properties, many unrelated to DOM)

//---------------------DOM: Selecting, Creating and Deleting Elements

//---------Selecting elements
//selecting all document
console.log(document.documentElement);
//select only head
console.log(document.head);
//select only body
console.log(document.body);

const header = document.querySelector(".header");
//select multiple elements
const allSections = document.querySelectorAll(".section");
console.log(allSections); //this return a node collection(is not a live collection)

//get the element by ID(we don't need the selector .#)
document.getElementById("selection--1");
const allButtons = document.getElementsByTagName("button"); //HTMLCollection(live collection)
console.log(allButtons);

//get all element by class name, no need the selector
console.log(document.getElementsByClassName("btn")); //return a live collection

//------Creating and inserting elements
//.insertAdjacentHTML (most important)
//build the element mor programmatically

//create an dom(div) element
const message = document.createElement("div"); //is a live element
//add classes to the element
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics.";
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>`;

//adding and element into the dom as a child of an element
// header.prepend(message); //don't work to append in 2 places
// header.append(message);
//we can append a node in two places by cloning the element
// header.append(message.cloneNode(true));

//insert the element as a sibling before or after the element
// header.before(message);
header.after(message);

// Delete elements
//the message element is already selected
document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  // message.remove();
  message.parentElement.removeChild(message);
});
