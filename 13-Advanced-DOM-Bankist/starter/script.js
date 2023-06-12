/**
 * DOM Elements -L41
 * Styles, Attribute & Classes - L63
 * Implementing Smooth scroll - L42
 * Event Delegation - L88
 * Building a Tabbed component - L293
 * Passing Arguments to Event handlers - L316
 * Implementing a sticky navigationL The scroll event - L342
 * Intersection observer API - L359
 * Revealing elements on Scroll - L401
 * Lazy loading images - L425
 * Slider component - L459
 * Lifecycle DOM events - L551
 * Efficient script loading - defer and async - L574
 */
'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/*for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);*/
//Writting above loop using forEach()
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/**
 * --------------- Implementing Smooth scroll ---------------
 */
console.log('\n----- Implementing Smooth scroll -----');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); //this method gets the coordinates of the ele
  console.log('s1coords: ', s1coords);

  console.log(e.target.getBoundingClientRect());
  //to find out how much the page is scrolled currently
  console.log('Current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //Scrolling
  /*window.scrollTo(
     s1coords.left + window.pageXOffset,
     s1coords.top + window.pageYOffset
   );*/
  //To scroll smoothly we pass corrdinates as an object
  /*window.scrollTo({
     left: s1coords.left + window.pageXOffset,
     top: s1coords.top + window.pageYOffset,
     behavior: 'smooth',
   });*/
  //Modern approach but only supported by modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*** --------------- Page navigation --------------- */
console.log('\n----- Page navigation -----');
/*document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});*/
//Using event delegation for scrolling instead of above approach

//Event Delegation
//1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/**
 * --------------- DOM Elements --------------- */
console.log('\n----- DOM Elements -----');
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
console.log(header);
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const sectEle1 = document.getElementById('section--1');
console.log(sectEle1);
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

/**
 * --------------- Creating and Inserting elements ---------------
 */
console.log('\n----- Creating and Inserting elements -----');
/*const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button';*/

//header.prepend(message);
//header.append(message); //just using append method after prepend will only override it but just not add it; instead to copy at 2 locations should be done like below
//header.append(message.cloneNode(true));

//header.before(message);
//header.after(message);
//header.insertAdjacentElement('beforeend', message);

//Delete elements
/*document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  //message.parentElement.removeChild(message); //old method of deleting ele
});*/

/**
 * --------------- Styles, Attribute & Classes  ---------------
 */
console.log('\n----- Styles, Attribute & Classes -----');
//Styles
/*message.style.backgroundColor = '#37383d'; //adds this as an inline style
message.style.width = '120%';

console.log(message.style.color); //displays nothing as color is not in inline style;using this approach we can only read inline styles
console.log(message.style.backgroundColor);

//To read styles other than inline styles use following approach
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';*/

//To set styles for custom css properties
//document.documentElement.style.setProperty('--color-primary', 'orangered'); //here setting property to custom style defined to root ele in styleet sheet related to this js

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
//Non standard attributes
console.log(logo.designer); //non standard attributes cannot be read like this
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.src); //to retrieve abs url
console.log(logo.getAttribute('src')); //to get the relative url

//Data attributes
console.log(logo.dataset.versionNumber); //data attributes are stored in dataset object

//Classes
/*logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');*/
//logo.className = 'nikhil'; //not recommended to use as it overrides all class names and add only 1 class name

/**
 * --------------- Types of Events & Event Handlers ---------------
 * Events can be handled in 3 ways
 */
console.log('\n----- Types of Events & Event Handlers -----');
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  //h1.removeEventListener('mouseenter', alertH1);
};
//1st way
//h1.addEventListener('mouseenter', alertH1);//commenting to continue further practise

//Clearing event after certain time; this can be done outside setTimeOut function too; When removeEventListener is used evnt is captured only once
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

//2nd way
/*h1.onmouseenter = function(e){
  alert('onMouseEnter: Great! You are reading the heading :D');
 }*/

//3rd way - is to include in inline HTML itself; check like 46 in HTML file

/**
 * --------------- Event Propagation ---------------
 * Events happen in 3 phases Capturing phase, Target Phase & Bubbling phase
 * Events are generated at the document root and then move to Target ele(where Target phase starts) then propagate to document(this is Bubbling phase)
 * Attached eventlistener can listen to events only in Bubbling phase not in Capturing phase which is default behaviour of addEventListener method
 * To capture events in Capturing phase add a 3rd argument 'true' in addEventListener method, then it will not longer listen to event in Bubbling phase. By default 3rd argument is set to false, so it is not required to mention.
 */
console.log('\n----- Event Propagation -----');
//Generating random num
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//Generating random color
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  //In event listener 'this' points to the element on which event is attached
  //this.style.backgroundColor = randomColor();//Uncomment 222, 228 to check how it works
  //console.log('LINK', e.target, e.currentTarget);//Uncomment 223,229 228 to check how it works
  //console.log(e.currentTarget === this);//true always
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  //In event listener 'this' points to the element on which event is attached
  //this.style.backgroundColor = randomColor();
  //console.log('CONTAINER', e.target, e.currentTarget);
  //To Stop propagation
  //e.stopPropagation();//is used to stop event propagation to its parent elements
});

document.querySelector('.nav').addEventListener('click', function (e) {
  //In event listener 'this' points to the element on which event is attached
  //this.style.backgroundColor = randomColor();
  //console.log('NAV', e.target, e.currentTarget);
});

/* Below is just checking how stopImmediatePropagation() works
document.querySelector('.nav__logo').addEventListener('click', function (e) {
  alert('Clicked logo');
});
document.querySelector('.nav__logo').addEventListener('click', function (e) {
  e.stopImmediatePropagation();
  this.style.backgroundColor = randomColor();
});*/

console.log('\n----- DOM Traversing -----');
//Going downwards: selecting children
//Un-comment below code to check the functionalities
/*console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //pulls child nodes in nodelist format
console.log(h1.children); //pulls child elements in HTML list format
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards: selecting parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closest() is kind of opposite of querySelector; querySelector will find the child elents of matching argument whereas closest() will find the parent ele whereever in DOM
h1.closest('h1').style.background = 'var(--gradient-primary)'; //if argument matches the ele itself, same ele will be selected

//Going sideways: selecting siblings; In JS we can access only direct siblings
console.log(h1.previousElementSibling); //node
console.log(h1.nextElementSibling); //node
console.log(h1.previousSibling); //ele itself
console.log(h1.nextSibling); //ele itself
//selecitng all siblings
console.log(h1.parentElement.children); //HTML collection of all child ele
[...h1.parentElement.children].forEach(function (ele) {
  if (ele !== h1) {
    ele.style.transform = 'scale(0.5)';
  }
});*/

/**
 * --------------- Building a Tabbed component --------------- */
console.log('\n----- Building a Tabbed component -----');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
//Using event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);
  //Guard clause - when clicked outside tab container, closest() above will return null which is a falsy value. so when !clicked is used which is 'true' meaning when closest() returns null this function will just 'return' and doesn't execute code further. This is written to ignore the clicks outside the tab container.
  if (!clicked) return;
  //Active tab - Below will remove active class for all tabs first then we are active class to target ele
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //Activate tab - content area
  //console.log(clicked.dataset.tab);
  tabsContent.forEach(t => t.classList.remove('operations__content--active')); //removing active class for all tab contents
  //adding active class to the tab content by dynamically getting the data-tab value
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/*** --------------- Passing Arguments to Event handlers --------------- */
console.log('\n----- Passing Arguments to Event handlers -----');
const handleHover = function (e) {
  //console.log(this, e.currentTarget); //here this !== e.currentTarget bcoz we manually set the value for this keyword in the handlers below
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/*nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});*/
//Passing an "argument" into handler - Instead of doing as above we use bind method to pass argument(not arguent an argument but setting 'this' keyword manually). Bind method will create a copy of the function that it is attached on and the argument passed in Bind method will be set to the 'this' keyword in that function. Thats is why we dont need 2nd argument for handleHover function, infact any handler like this 1 can only have 1 real argument i.e is event. To have multiple argument we have to 'this' to an array/object in bind method.
nav.addEventListener('mouseover', handleHover.bind(0.5)); //0.5 here is the value for 'this' keyword
nav.addEventListener('mouseout', handleHover.bind(1));

/*** --------------- Implementing a sticky navigation The scroll event --------------- */
console.log('\n----- Implementing a sticky navigation The scroll event -----');
section1.style.backgroundColor = 'lightblue';
const initialCords = section1.getBoundingClientRect();
console.log(initialCords);

window.addEventListener('scroll', function () {
  //console.log(window.scrollY, window.pageYOffset);//both are same and print how much a page is scrolled
  if (this.window.scrollY > initialCords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//Sticky nav implmentation using an api which is a better way
console.log('\n----- Intersection observer API -----');
//This callback func will be called each time the observed ele(meaning target ele - here it is seaction-1) intersects the 'root' ele at the 'threshold' defined
//Sample Implementation
const obsCallback = function (entries, observer) {
  //entries - is an array of threshold entries, observer - is the observer object we created below and is optional
  entries.forEach(entry => {
    //console.log(entry);
  });
};

const obsOptions = {
  root: null, //here null  means the viewport, can be assigned any element as well
  //threshold: 0.1, // this can be an array too like below
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

console.log('\n----- Intersection observer API - Actual Implementation -----');

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log('Actual: ', entry);
  console.log(navHeight);

  if (!entry.isIntersecting) {
    console.log('isIntersecting: ', entry.isIntersecting);
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin: '-90px', //adds this as extra space to the target ele if it is +ve
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/*** --------------- Revealing elements on Scroll --------------- */
console.log('\n----- Revealing elements on Scroll -----');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log('revealSection: ', entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  //hidding all sections first before implementing
  //section.classList.add('section--hidden');
  //Observing all elemts
  //sectionObserver.observe(section);
});

/*** --------------- Lazy loading images --------------- */
console.log('\n----- Lazy loading images -----');

//selecting all image which have [data-src] attribute
const imgTargets = document.querySelectorAll('img[data-src]');

const revealImage = function (entries, observer) {
  const [entry] = entries;
  console.log('revealImage: ', entry);

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(function (image) {
  imgObserver.observe(image);
});

/*** --------------- Building Slider component --------------- */
console.log('\n----- Building Slider component -----');

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  //reducing the section size and moving left to be visible for working
  //slider.style.transform = 'scale(0.3) translateX(-700px)';
  //slider.style.overflow = 'visible';

  let curSlide = 0;
  const maxSlides = slides.length;

  //FUNCTIONS
  //Creating dots and inserting as new html ele
  const createDots = function () {
    //in the below function, for 1st argument '_' is used as placeholder as the 1st argument is doesn't used here
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //activating the dots of current slide
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(s => s.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0; //when curSlide is the last slide and the btn is clicked, chaning curSlide to 0
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0); //Initial condition - setting slides side by side; this will make the slides to be side by side
    createDots();
    activateDot(0); //activating 1st slide dot on window load
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //Listener to handle keydown events for Left & Right arrows; keydown event is always added to document.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); //using shortcircuting instead of if-else
  });

  //Listener to handle dot clicks - on dot click slide moves to next/previous child
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log(e);
      const { slide } = e.target.dataset; //used destrucring here
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider(); //calling the whole slider functionality

/*** --------------- Lifecycle DOM events ---------------
 * DOMContentLoaded - this event is fired by document as soon as the HTML has completely parsed which means HTML has been downloaded and been converted to DOM tree. Also all scripts must be downloaded & executed before this event can happen. This event doesn't wait for the images or external resources to load, just HTML & js needs to be loaded.
 * Load - this event is fired by 'window' object after the HTMl is parsed, images loaded and all external files like css resources are loaded meaning when complete page is finished loading.
 * beforeunload - this event is fired before the user is about to leave the page
 */
console.log('\n----- Lifecycle DOM events -----');

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOMContentLoaded - HTML is parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Load event - Page fully laoded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault(); // some browsers require this
  console.log(e);
  //e.returnValue = ''; //will ask for confirmation before closing the page, msg can't be customised
});

console.log('\n----- Efficient script loading - defer and async -----');
/*** --------------- Efficient script loading - defer and async ---------------
 * Script can be loaded in 3 ways
 * 1. Regular - including script tag at the end of the body tag
 * 2. Using 'async' attribute and adding script tag in heade tag <script async src='xyz.js'></script>
 * 3. This is the prefered way as it will improve the performance. Using 'defer' attributea nd adding script tag in heade tag <script defer src='xyz.js'></script>
 * NOTE: check screenshots 'scriptload1 & 2'
 */
