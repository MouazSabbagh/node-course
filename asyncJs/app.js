// console.log("hello world");
// function sayHello() {
//   setTimeout(() => {
//     console.log("hello, i am say hello function");
//   }, 1000);
// }
// sayHello();
// var promise = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve("resolved");
//   }, 1000);
// });
// promise.then(value => console.log(value));

// promise = new Promise(function(resolve, reject) {
//   reject("rejected");
// });
// promise.catch(reject => console.log(reject));

// promise = new Promise(function(resolve, reject) {
//   resolve("Promise has been resolved!");
// });
// promise.then(resolve => console.log(resolve));
// console.log("i am not promise");

// function delay() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });
// }
// delay().then(sayHello);

// var secondPromise = new Promise((resolve, reject) => {
//   resolve("second");
// });
// var firstPromise = new Promise((resolve, reject) => {
//   resolve(secondPromise);
// });
// firstPromise.then(resolve => console.log(resolve));

// const fakePeople = [
//   { name: "Rudolph", hasPets: false, currentTemp: 98.6 },
//   { name: "Zebulon", hasPets: true, currentTemp: 22.6 },
//   { name: "Harold", hasPets: true, currentTemp: 98.3 }
// ];

// const fakeAPICall = i => {
//   const returnTime = Math.floor(Math.random() * 1000);
//   return new Promise((resolve, reject) => {
//     if (i >= 0 && i < fakePeople.length) {
//       setTimeout(() => resolve(fakePeople[i]), returnTime);
//     } else {
//       reject({ message: "index out of range" });
//     }
//   });
// };

// function getAllData() {
//   const first = new Promise((resolve, reject) => {
//     resolve(fakeAPICall(0));
//   });
//   const second = new Promise((resolve, reject) => {
//     resolve(fakeAPICall(1));
//   });
//   const third = new Promise((resolve, reject) => {
//     resolve(fakeAPICall(2));
//   });
//   Promise.all([first, second, third]).then(values => console.log(values));
// }
// getAllData();
// function setTime() {
//   setTimeout(() => {
//     console.log("this is setTime");
//   }, 0);
// }

// promise = new Promise((resolve, reject) => {
//   resolve();
// });
// promise.then(() => console.log("this is promise"));

// setTime();

// console.log("this is console");

// const promise = new Promise((res, rej) => {
//   res();
// });
// promise.then(val => console.log(val));

// promise is an object with return val
/*

{status:resolve,reject,pindling,
value: will be return when the promise is resolved,
fulfillment:[]is array all the functions that parse into the the method will be store in this array and they will be auto trigger when the promise have the value,
onRejection:[]array store the function that we pass to the catch method and they will be trigger when the promise is rejected
.then()
.catch()
}
*/
//iterator stuff
const arr = [1, 2, 3];

function grabTheNextElement(array) {
  let iteratorObj = { value: 0, done: false };
  return function inner() {
    const nextEl = array[iteratorObj.value];
    if (nextEl) {
      iteratorObj.value++;
      return nextEl;
    } else {
      iteratorObj.done = false;
      return;
    }
  };
}

// iterators in js
// js engine search the property [Symbol.iterator], which is a function, if its there so this object is iterable.
// so js engine call this function and the return value is the iterator obj.
//in the iterator object the next() method which controls the behaviour of the iteration.
// the next method return an object with two  props value and done witch is boolean.
// the engine will keep calling the next function  until done is false

const myArr = [1, 2, 3];
const iteratorObj = myArr[Symbol.iterator]();
console.log(iteratorObj.next());

// write function range take start ,end and step as params, and return an array

// i want to create my own iterator so the range function should return an object with [Symbol.iterator] method so it will become iterable

function range(start = 1, end = 10, step = 3) {
  let current = start;

  return {
    [Symbol.iterator]: function() {
      return {
        next() {
          let result;
          if (current <= end) {
            result = {
              done: false,
              value: current
            };
            current = step + current;
            return result;
          }
          return (result = { done: true });
        }
      };
    }
  };
}
const isItWork = range(); // isItWork is an object with with [Symbol.iterator] function so this object is iterable, js engine will call the next method in the iterator object until, the next method return {done:false}
console.log(...isItWork);

// how i make an object iterable
// i add the [symbol.iterator] function and implement the next method in the iterator obj which is the return value of calling [symbol.iterator]

const myFamily = {
  father: "Moaz",
  mother: "Dom",
  son: "Achille"
};
myFamily[Symbol.iterator] = function() {
  let count = 0;
  let myFamilyProps = Object.keys(this);
  return {
    next() {
      let result;
      if (count < myFamilyProps.length) {
        result = { done: false, value: myFamilyProps[count] };
        count++;
        return result;
      }
      return { done: true };
    }
  };
};
console.log(...myFamily); // great job youuu

function sumFunc(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}
console.log(sumFunc([1, 2, 3, 7]));

function returnIterator(arr) {
  let count = 0;
  let result;
  return function() {
    result = arr[count];
    count++;
    return result;
  };
}
const ok = returnIterator([1, 2, 3, 7]);
console.log(ok());
console.log(ok());
console.log(ok());
function nextIterator(arr) {
  // YOUR CODE HERE
}

console.log(ok());

function nextIterator(arr) {
  let count = 0;

  return {
    next() {
      const result = arr[count];
      count++;
      return result;
    }
  };
  // YOUR CODE HERE
}
const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log(iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3

function sumArray(arr) {
  let total = 0;
  let iterator = nextIterator(arr);
  let next = iterator.next();

  while (next) {
    total += next;
    next = iterator.next();
  }
  return total;

  // YOUR CODE HERE
  // use your nextIterator function
}
console.log("total", sumArray([2, 3, 4]));

// const mySet = new Set("hello");

function setIterator(set) {
  // YOUR CODE HERE
  let setIterator = set.values(); // return a set with the values

  const iterator = {
    next: function() {
      var currentVal = setIterator.next();
      return currentVal["value"];
    }
  };
  return iterator;
}
const mySet = new Set("hey");
const iterateSet = setIterator(mySet);
console.log("Challenge 4", iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'
