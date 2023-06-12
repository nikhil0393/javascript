'use strict';
//TESTING
const parser = new DOMParser();
const htmlString = '<strong>Beware of the leopard</strong>';
const doc3 = parser.parseFromString(htmlString, 'text/html');
console.log('doc3:: ', doc3.body.firstChild.textContent);

///////////////////////////////////////
/**--------------- Async JS, AJAX, API's --------------- \
 * Most code is synchronous, as it is executed line by line.
 * Each line of code waits for previous line to finish. Long running operations block code execution.
 * Async code is executed after a task that runs in the background finishes
 * Async code is 'non-blocking'. Eg: loading image, setTimeout func
 * Execution doesn't wait for an async task to finish its work
 * Callback, addEventListener does NOT automatically make code asynchronous
 * AJAX - Async Javascript And XML : Allows us to communicate with remote web servers in an async way. With AJAX calls, we can request data from web servers dynamically.
 * GET - to request data; POST - to send data
 * API - Application Programming Inteface, is a piece of software that can be used by another piece of software, in order to allow applications to talk to each other. There are many types of API's in web develpment like DOM API, Gelolocation API, can also create Own Class API, Web API's
 * WEB API's - application running on a server that receives requests for data, and sends data back in response
 */
console.log(
  `\n----- %cAsync JS, AJAX, API's -----`,
  'font-size:14px;color:red'
);

//https://restcountries.com/v2/

/**--------------- First AJAX call --------------- */
console.log('\n----- %cFirst AJAX call -----', 'font-size:14px;color:red');

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = ' ') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1; //It is moved to finally method of Promise and uncommented again to be useful in coding challenge1
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  console.log(request.responseText); //will be empty because 'responseText' is only available after the load event

  request.addEventListener('load', function () {
    //console.log(this.responseText); //as it is event listener 'this' points to request.
    const [data] = JSON.parse(this.responseText); //output will be an array with only 1 object, so using destructuring to get the first object
    console.log(data); //Before data points to an array with only 1 object but it will now be that object itself

    const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

//getCountryData('portugal');
// getCountryData('usa'); //here there will be 2 separate ajax calls
// getCountryData('germany');

/**--------------- Callback Hell --------------- */
console.log('\n----- %cCallback Hell -----', 'font-size:14px;color:red');

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  console.log(request.responseText); //will be empty because 'responseText' is only available after the load event

  request.addEventListener('load', function () {
    //console.log(this.responseText); //as it is event listener 'this' points to request.
    const [data] = JSON.parse(this.responseText); //output will be an array with only 1 object, so using destructuring to get the first object
    console.log(data); //Before an array with only 1 object but it will now be that object

    //Render country 1
    renderCountry(data);

    //Get neighbour country (2)
    const neighbour = data.borders?.[0];

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); //using 'alpha' here to search countries based on code and so the result will be in single country not an array
    request2.send();

    //this is nothing but a CALLBACK HELL meaning callback inside a callback -having lot of nested callbacks inorder to perform asyncronous task in sequence
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText); //not destructuring becuase the result is not an array as we are requesting data based on 'code' which can only be 1 result whereas it is different when requesting data using 'name'
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
//getCountryAndNeighbour('usa');

/**--------------- Promises ---------------
 * Def1 - An object that is used as a placeholder for the future result of an async operation
 * Def2 - A container for an async delivered value
 * Def3 - A container for a future value. Eg: A response coming from a AJAX call
 * Advantages: We no longer need to rely on events & callbacks passed into async func to handle async results.
 * Instead of nesting callbacks, we can chain Promises for a sequence of async operations: escaping callback hell.
 * Promise lifecycle:
 * 1. Pending : Before the future value is available
 * 2. Settled : Async task has finished. 2a. FULFILLED 2b. REJECTED
 * Fetch API will build & return the Promise then we consume the Promise(we consume the Promise only when we already have a Promise)
 */
console.log('\n----- %cPromises -----', 'font-size:14px;color:red');
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

//Modern way of making AJAX call(using fetch api)
const requestFetch = fetch('https://restcountries.com/v2/name/portugal');
console.log(requestFetch); //returns a Promise

/**--------------- Consuming, Chaining Promises --------------- */
console.log(
  '\n----- %cConsuming, Chaining Promises -----',
  'font-size:14px;color:red'
);
const getCountryDataUsingPromise = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); //this json() function is also async func means it will also return new Promise
    })
    .then(function (data) {
      //using then again to handle Promise returned above line
      console.log(data);
      renderCountry(data[0]);
    });
};
getCountryDataUsingPromise('portugal');

const getJSON = function (url, errMsg = 'Something is wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }

    return response.json();
  });
};

//Commenting before just for reference but its implementation is correct
/*const getCountryDataFetch = function (country) {
  //AJAX call 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      function (
        response //this argument is resulting value of fulfilled promised meaning this is success response of an AJAX call
      ) {
        console.log(response);

        if (!response.ok) {
          throw new Error(`Country not found (${response.status})`);
        }

        return response.json(); //to read data from response we call json(), which will inturn return another Promise which is why we are calling then() on this again below
      }
      // function (error) {
      //   //this is 2nd argument in then() to handle Rejected Promise
      //   alert(error);
      // }
    )
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0]; //using optionla chaining to work only if borders exist

      //AJAX call 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); //this will be the fullfilled value of promise
    })
    .then(
      response => response.json()
      //error => alert(error)
    )
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.error(`${error} ✨✨✨`);
      renderError(`Something went wrong ✨✨✨ ${error.message}. Try again!`);
    }) //instead if catching errors each time in Promise Chain, they can be caught globally at the end of Promise Chain by using catch()
    .finally(() => {
      //this will be called regardless of Promise success or rejected
      countriesContainer.style.opacity = 1;
    });
};*/

const getCountryDataFetch = function (country) {
  //AJAX call 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      //AJAX call 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.error(`${error} ✨✨✨`);
      renderError(`Something went wrong ✨✨✨ ${error.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//Handling Rejected Promises
btn.addEventListener('click', function () {
  getCountryDataFetch('portugal'); //commenting as we are testing other functinality further down the code
});

// getCountryDataFetch('portugal');
//getCountryDataFetch('australia');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/**--------------- Coding Challenge #1 --------------- */

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    }) //data is resolved value from res.json()
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} 🔥`)); //message thrown above in then() will be availabel here
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/**--------------- Event loop ---------------
 * Callbacks from Promise are in Microtasks que
 * Other callbacks are in Callback que
 * Callbacks in Microtasks que take priority over Callback que
 */
console.log('\n----- %cEvent loop -----', 'font-size:14px;color:red');

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));
console.log('Test end');

/**Order in which above code is printed is
 * Test start
 * Test end
 * Resolved Promise 1
 * 0 sec timer
 */

/**--------------- Building a Simple Promise --------------- */
console.log(
  '\n----- %cBuilding a Simple Promise -----',
  'font-size:14px;color:red'
);

//Promise constructor takes 1 argument which is called Executioner function
//Executioner func will contain Async behaviour
//This func will produce a value which will be future value of Promise.
//This func will be called by Promise constructor as soon as it runs
//Inorder to set the Promise as fulfilled we use resolve() func

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('LOTTERY DRAW IS HAPPENING 🔮');
  //using settimeout to add async behaviour to Promise
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`SIMPLE PROMISE:: You WIN 🎁`); //value passed in to this resolve function is gonna be the result of Promise that will be available in the 'then' handler
    } else {
      reject(new Error('SIMPLE PROMISE:: You LOST your money 💩')); //here we pass the error message which we can catch in catch() handler
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
//Below func will return a Promise which we can consume later
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); //here we are just calling the resolve() func directly
  });
};

/*
wait(1)
  .then(() => {
    console.log('%c\nPromisifying:: ', 'font-weight:bold', '1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('%cPromisifying:: ', 'font-weight:bold', '2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('%cPromisifying:: ', 'font-weight:bold', '3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('%cPromisifying:: ', 'font-weight:bold', '4 second passed');
  });
*/

/* Instead of doing Callback hell like below we can use Promise like above
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);*/

//We can create a Fullfilled or Rejected Promise immediately by using below approach
Promise.resolve('RESOLVED PROMISE').then(res => console.log(res));
Promise.reject(new Error('REJECTED PROMISE')).catch(err => console.error(err));

/**--------------- Promisifying Geolocation API --------------- */
console.log(
  '\n----- %cPromisifying Geolocation API -----',
  'font-size:14px;color:red'
);

//navigator.geolocation.getCurrentPosition will have 2 callback func's as arguments. 1 for success which gets access to 'position' object & passes as argument 2nd one for failure, gets access to error obj & passes 'error' as argument
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('\n %cPOSITION:: ', 'font-weight:bold', position);
        resolve(position);
      },
      err => reject(err)
    );
    //Above code can also be written like below, here resolve, reject are callback which gets called with postion & err as arguments
    //navigator.geolocation.getCurrentPosition(resolve, reject);
    //position returned from resolve func will be availabel in then()
  });
};

getPosition().then(pos => console.log(pos));

const whereAmIPromisyfying = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    }) //data is resolved value from res.json()
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} 🔥`)); //message thrown above in then() will be availabel here
};

btn.addEventListener('click', whereAmIPromisyfying);

const nikhiltest = function () {
  //fetch('https://geocode.xyz/33.7073908,-117.7666567?geoit=json');
};

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/**--------------- Coding Challenge #2 --------------- */
console.log('\n----- %cCoding Challenge #2 -----', 'font-size:14px;color:red');
/**
 const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); //here we are just calling the resolve() func directly
  });
};
 */
//Part-1
const imgContainer = document.querySelector('.images');
const img = document.createElement('img');

const createImage = function (imagePath) {
  return new Promise(function (resolve, reject) {
    // img.src = imagePath;
    img.setAttribute('src', imagePath);

    //Appending image after loading
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;
//Part-2
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    //Stopping execution by using wait() func
    return wait(2);
  })
  .then(() => {
    //Hide current img
    currentImg.style.display = 'none';

    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    //Stopping execution by using wait() func
    return wait(2);
  })
  .then(() => {
    //Hide current img
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

/**--------------- Consuming Promises with Async/await ---------------
 * Async function will keep running in the background while performing the code inside of it
 * When the function is done it automatically returns a Promise
 * In Async func we can have 1 or more await statements
 * Instead of consuming Promise using then() we use 'await'
 */

/*const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    //position returned from resolve func will be available in then()
  });
};*/

const whereAmI2 = async function (country) {
  //fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))

  //Above statement can be written like below:
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  console.log(res);
  const data = await res.json();
  console.log(data);
};
whereAmI2('portugal');

const whereAmIAsyncAwait = async function (country) {
  try {
    //Geo location
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse Geocoding API
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    //Incase of 403 or 404 error fetch doesn't reject automatically so we do that manually like below
    if (!resGeo.ok) throw new Error('Problem getting location data'); //This one handles any error from the above fetch

    const dataGeo = await resGeo.json();
    console.log('\n %cDATAGEO:: ', 'font-weight:bold', dataGeo);

    //Country data
    /*fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
      console.log(res)
    );*/

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    //as soon as above fetch promise is resolved the result of that await statement will be the resolved value of Promise
    if (!res.ok) throw new Error('Problem getting country data');

    console.log(
      '\n----- %cConsuming Promises with Async/await -----',
      'font-size:14px;color:red'
    );
    console.log(res);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong 🌋 ${err.message}`);

    //Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');
whereAmIAsyncAwait();

/*whereAmIAsyncAwait()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finished geting location'));
*/

(async function () {
  try {
    const city = await whereAmIAsyncAwait();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished geting location');
})();

/**--------------- Running Promisses in parallel ---------------
 * Promise.all() - will take an array of Promises and return a Promise which will run all Promises at one time
 * When one Promise gets rejected other Promises also get rejected meaning .all() will short circuit when 1 Promise gets rejected.
 * Promise.race() - also takes array of Promises and returns a Promise but will get settled when one of the input Promise gets settled(means a value is available but doesn't matter whether the Promise gets Fulfilled or Rejected), so basically first settled Promise wins the race. We can also say as Promice.race() shortcircuits when one of the Promiceses get settled.
 * Promise.allSettled() - this will never short circuits & will return an array of all settled Promises
 * Promise.any() - this will always return only fulfilled Promises and ignores Rejected Promises
 */

/*
const getJSON = function (url, errMsg = 'Something is wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }

    return response.json();
  });
};
*/

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(
      '\n----- %cRunning Promisses in parallel -----',
      'font-size:14px;color:red'
    );
    console.log(data);
    console.log((await data).map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'usa', 'canada');

//Promise.race()
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  //will only get 1 output out of the 3 Promises whicever is faster
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.2),
])
  .then(res => console.log('PROMISE.race():: ', res[0]))
  .catch(err => console.error(err));

//Promise.allSettled
Promise.allSettled([
  Promise.resolve('Sucess'),
  Promise.reject('ERROR'),
  Promise.resolve('Another sucess'),
]).then(res => console.log(res));

//Promise.any
Promise.any([
  Promise.resolve('Sucess'),
  Promise.reject('ERROR'),
  Promise.resolve('Another sucess'),
]).then(res => console.log(res));

(function () {
  var a = location.href;
})();
