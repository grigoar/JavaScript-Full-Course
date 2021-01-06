"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector("nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const h1Title = document.querySelector("h1");
///////////////////////////////////////
// Modal window

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

//---------------Event delegation: implementing Page Navigation
///////////////////////////////////////
//---------------------------Implementing smooth scrolling
//old school

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //relative to viewport
  console.log(e.target.getBoundingClientRect());
  //distance to the top of page
  console.log("Current scroll(X/Y)", window.pageXOffset, window.pageYOffset);
  //height and width of the current viewport
  console.log("height/width viewport", document.documentElement.clientHeight, document.documentElement.clientWidth);

  //Scrolling to target
  //position not relative to the current, but we need the relative position to the top of the page
  //-----------!!!!!!!!!!!!!!
  //current scroll
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //new way to do this in modern browsers
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
//---------------Event delegation: implementing Page Navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     //this.href//not good
//     // console.log("LINK");
//   });
// });

// 1. Event delegation= Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  //Matching element strategy
  if (e.target.classList.contains("nav__link")) {
    console.log("LINK");
    // const id = this.getAttribute("href");
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//----------------------------Building a Tabbled Component
// const tabs = document.querySelectorAll(".operations__tab");
// const tabsContainer = document.querySelector(".operations__tab-container");
// const tabsContent = document.querySelectorAll(".operations__content");

//Bad practice-> slow
// tabs.forEach((t) => t.addEventListener("click", () => console.log("Tab")));
//Event delegation
tabsContainer.addEventListener("click", function (e) {
  // const clicked = e.target.parentElement; //not working properly in event delegation
  //finding the closest parent with the class ID ...
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  //ignore if the class in not found
  //Guard clause
  if (!clicked) return;
  //old way
  // if (clicked) {
  //   clicked.classList.add("operations__tab--active");
  // }

  //Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //Active tab activation
  clicked.classList.add("operations__tab--active");

  //Activate content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

////-----------------Passing arguments to event handlers
//Menu fade animation
//with event delegation for links
// const handleHover = function (e, opacity) {
//we can only have one value or we need to implement the function
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  //here we don't have more elements inside and we don't need closest);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      // if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// const nav = document.querySelector("nav");

// nav.addEventListener("mouseover", handleHover(e, 0.5));//this not work
// nav.addEventListener("mouseover", handleHover);
//this works
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });

//Passing "argument" into handler
//we override the "this" keyword which was equal with e.currentTarget, and we pass forward the this modified into an argument opacity
//we can pass only 1 argument or we can send a list with the keyword this
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

//-----------------------Implementing a sticky navigation: The scrolling event
//Sticky navigation
//the scroll part is tied up  by the window global object
//to get the coordonates of the section 1
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// //this is pretty bad for performance
// window.addEventListener("scroll", function (e) {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

//------------------A better way for smooth scrolling: the intersection observer API
//How the intersetion observer API works?
// 117.	Intersection observer API(for smooth scrolling) is created using an object IntersectionObserver(callback,options) and than the object call the method to observe an element. Options contains the root(element we want to intersect, if is null it means we observe how the element intersect with the entire viewport), threshold(0…1=>0 means 0% of the target, and 1 means 100% of the target); threshold: at which percentage the function callback is intersecting the root element at a specific threshold-> is represented by intersectionRatio ;and the rootMargin(if we want to add some margin to the intersection -> in pixels). The callback function have 2 parameters : entries(the object IntersectionObserverEntry)->this has multiple properties(isIntersecting ,intersectionRatio etc.) , and the observer object(IntersectionObserver));

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//element we want to intersect, if is null it means we observe how the element intersect with the entire viewport
//   root: null,
//0…1=>0 means 0% of the target, and 1 means 100% of the target
//   // threshold: 0.1,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  // const entry = entries[0];
  //destructuring
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

// const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: "-90px" });
const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0.2, rootMargin: `-${navHeight}px` });
headerObserver.observe(header);

//---------------------------Reveal sections
//don't put the section hidden manually in the html, maybe some users disable javascript and the sections will not be revealed anymore
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, { root: null, threshold: 0.15 });
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //remove temporary for annoying me
  // section.classList.add("section--hidden");
});

//-------------------Lazy Loading Images
//To Improve performance

//select the imaged that have the property data-src
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove("lazy-img");
  //removing the filter only when the network catch up with the loading of the image
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  //when we finish with the loading the object we not longer observe them
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, { root: null, threshold: 0, rootMargin: "200px" });

imgTargets.forEach((img) => imgObserver.observe(img));

//-----------------------------Building an slider component
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  // console.log(slides);
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  // console.log(btnLeft);

  let curSlide = 0;
  const maxSlide = slides.length;
  //put all the function into another function
  //do not polute the code

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => dot.classList.remove("dots__dot--active"));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  };

  // const slider = document.querySelector(".slider");
  // slider.style.transform = "scale(0.3) translateX(-800px)";
  // slider.style.overflow = "visible";
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  //0% , 100%, 200%, 300%

  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //functions
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  //Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  //-100% , 0%, 100%, 200%

  //-----------------------Building the slider PART 2
  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

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
// console.log(document.documentElement);
// //select only head
// console.log(document.head);
// //select only body
// console.log(document.body);

// const header = document.querySelector(".header");
// //select multiple elements
// const allSections = document.querySelectorAll(".section");
// console.log(allSections); //this return a node collection(is not a live collection)

// //get the element by ID(we don't need the selector .#)
// document.getElementById("selection--1");
// const allButtons = document.getElementsByTagName("button"); //HTMLCollection(live collection)
// console.log(allButtons);

// //get all element by class name, no need the selector
// console.log(document.getElementsByClassName("btn")); //return a live collection

// //------Creating and inserting elements
// //.insertAdjacentHTML (most important)
// //build the element mor programmatically

// //create an dom(div) element
// const message = document.createElement("div"); //is a live element
// //add classes to the element
// message.classList.add("cookie-message");
// // message.textContent = "We use cookies for improved functionality and analytics.";
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>`;

// //adding and element into the dom as a child of an element
// // header.prepend(message); //don't work to append in 2 places
// // header.append(message);
// //we can append a node in two places by cloning the element
// // header.append(message.cloneNode(true));

// //insert the element as a sibling before or after the element
// // header.before(message);
// header.after(message);

// // Delete elements
// //the message element is already selected
// document.querySelector(".btn--close-cookie").addEventListener("click", function () {
//   // message.remove();
//   message.parentElement.removeChild(message);
// });

// //-----------------------------Styles, attributes and classes

// //--Styles
// //are set directly in the dom (inline styles)
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// //we can't get the styles of the elements set outside of the script
// console.log(message.style.height); //not working
// console.log(message.style.backgroundColor);
// console.log(message.style.color); //not working

// //we can get the styles with getComputedStyle
// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// //for the custom property we need to use this
// //we can use this also for normal properties
// document.documentElement.style.setProperty("--color-primary", "orangered");

// //-------------Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// //this is not a standard property and it is not working
// console.log(logo.designer);
// //this works for curstom property
// console.log(logo.getAttribute("designer"));

// //we can set attributes
// logo.alt = "Beautiful minimalist logo";
// console.log(logo.alt);

// //set a new attribute
// logo.setAttribute("company", "Banklist");

// //for relative url
// console.log(logo.getAttribute("src"));

// // const link = document.querySelector(".twitter-link");
// const link = document.querySelector(".nav__link--btn");
// //long href
// console.log(link.href);
// console.log(link.getAttribute("href"));

// //---------Data-attributes
// //this special case
// console.log(logo.dataset.versionNumber);

// //-----------Classes
// logo.classList.add("c", "j");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// logo.classList.contains("c");

// //don't use (override and just only one class)
// logo.className = "grig";

// //---------------------------Implementing smooth scrolling
// //old school
// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");
// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   //relative to viewport
//   console.log(e.target.getBoundingClientRect());
//   //distance to the top of page
//   console.log("Current scroll(X/Y)", window.pageXOffset, window.pageYOffset);
//   //height and width of the current viewport
//   console.log("height/width viewport", document.documentElement.clientHeight, document.documentElement.clientWidth);

//   //Scrolling to target
//   //position not relative to the current, but we need the relative position to the top of the page
//   //-----------!!!!!!!!!!!!!!
//   //current scroll
//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: "smooth",
//   // });

//   //new way to do this in modern browsers
//   section1.scrollIntoView({ behavior: "smooth" });
// });

// //Types of events and event handlers
// //signal triggered by a node

// const alertH1 = function (e) {
//   alert("addEventListener: Great! You are reading the heading :d");

//   //remove event listener
//   //we need to export to its own function
//   //if we only need one time listener
//   // h1.removeEventListener("mouseenter", alertH1);
// };
// const h1 = document.querySelector("h1");
// h1.addEventListener("mouseenter", alertH1);

// //remove the eventlistener after 3 sec
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

//on event property on event
//old way
// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the heading :d");
// };

//we can remove an event listener with

//Event propagation: Bubbling and capturing
//------------------Event propagation in practice

//random color
//rgb(255,255,255);
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   // console.log("LINK");
//   this.style.backgroundColor = randomColor();
//   console.log("Link", e.target, e.currentTarget);
//   //in any event handler the event.currentTarget is the same as this
//   console.log(e.currentTarget === this);

//   //Stop event propagation
//   //is not a good idea
//   // e.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   // console.log("LINK");
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });
// document.querySelector(".nav").addEventListener(
//   "click",
//   function (e) {
//     // console.log("LINK");
//     this.style.backgroundColor = randomColor();
//     console.log("NAV", e.target, e.currentTarget);
//     // alert("Bubbling phase activated");

//     //adding a parameter true it changing the triggering the event from bubbling to capturing phase
//   }
//   // ,true // default is false
// );

//---------------------------DOM traversing
//direct parent, sibling, child element

// const h1 = document.querySelector("h1");
// //Going downwards: child, no matther the level of deep
// console.log(h1.querySelectorAll(".highlight"));
// //for direct children
// console.log(h1.childNodes);
// //Html live collection for direct children
// console.log(h1.children);
// //
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// //Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// //when we need the parent no matter where it is
// //using for event delegation
// h1.closest(".header").style.background = "var(--gradient-secondary)";

// //opposite of the querySelector(instead of child, it find the parent)
// h1.closest("h1").style.background = "var(--gradient-primary)";

// //Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// //methods for nodes
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //get all the siblings from the parrent and than children
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//----------------------------Building a Tabbled Component
//-----------------Passing arguments to event handlers
//-----------------------Implementing a sticky navigation: The scrolling event
//------------A better way of implementing Smooth scrolling:
//------------------A better way: the intersection observer API

//-----------------------------Revealing elements on scroll
//------------------------------Building a slider component
//------------------------------LifeCycle DOM events

//execute after the dom is loaded
//if the script is at the bottom is fine
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

//jquery javascript need ready like domcontentloaded
// document.ready;

//this is fired when all the images and all the external libraries are loaded
window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

//here we can ask if the user really want to leave the page
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log("here we can ask if the user really want to leave the page", e);
  e.returnValue = "message";
});

//-----------------------Efficient script loading: defer and async
//where we should load place the javascript in the html?
//best way using defer an maybe async in the head, or at the body end with regular form
// 118.	Regular vs. Async vs. Defer: Regular at the end of body: - Scripts are fetched and executed after the HTML is completely parsed; - Use if you need to support old browsers; Async in Head: - Scripts are fetched asynchronously and executed immediately; - Usually the DOMContentLoaded event waits for all scripts to execute, except for async scripts. So, DOMContentLoaded does not wait for an async script; -Scripts not guaranteed to execute in order; -Use for 3rd-party cripts where order doesn’t matter (ex Google Analytics); DEFER in head: -Scripts are fetched asynchronously and executed after the HTML is completely parsed; DOMContentLoaded event fires after defer script is executed; - Scripts are executed in order; - This is overall the best solution! Use when order matters (including a library)
