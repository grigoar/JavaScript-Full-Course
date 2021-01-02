"use strict";

//-------------------Adding and removing a  class to an element
// ------------------handling a key pressed event
//store the selected element into a constant variable
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
//if theere are more than one element with the same class name only the first one is selected
// const btnsOpenModal = document.querySelector(".show-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
console.log(btnsOpenModal);

const openModal = function () {
  //   console.log("Button clicked");
  //can remove multiple classes---and not needed .hidden
  // modal.classList.remove("hidden", "modal");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  // modal.style.display = "block";
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
  btnsOpenModal[i].addEventListener("click", openModal);
}
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// btnCloseModal.addEventListener("click", function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// });
//we don't call the function
//we just call the value when clicking the element

// overlay.addEventListener("click", function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// });

//the keyboard keys events must be handled like a global event
// when it is a keydown/keyup/keypress event we tell the javascript to pass the key as an event as an argument for the function
//the function is only defined here
document.addEventListener("keydown", function (event) {
  //   console.log("A key was pressed");
  //   console.log(event);
  console.log(event.key);
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    //verify if the current element contains the class hidden
    //here need to call to execute the code
    closeModal();
  }
  //   if (event.key === "Escape") {
  //     //verify if the current element contains the class hidden
  //     if (!modal.classList.contains("hidden")) {
  //       //here need to call to execute the code
  //       closeModal();
  //     }
  //   }
});
