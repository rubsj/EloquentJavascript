/*
*  A list is a nested set of objects, with the first object holding a reference to the second,
*  the second to the third, and so on.
*
*  let list = {
   value: 1,
   rest: {
     value: 2,
     rest: {
       value: 3,
       rest: null
     }
   }
};
*
*/

/*
Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
*/
function arrayToList(inputArray){
    let list = null;
    for (let i = inputArray.length-1; i >=0 ; i--) {
      list = {value : inputArray[i] , rest : list};

    }
    return list;
}
/*  write a listToArray function that produces an array from a list. */
function listToArray(list){
    let a = [];
    while(list != null){
        a.push(list.value);
        list = list.rest;
    }
  return a;
}
/*
//using for loop
function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}*/

/*function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list */
function prepend(element , list){
    return {value : element , rest : list};
}

/*
nth, which takes a list and a number and returns the element at the given position in the list
 (with zero referring to the first element) or undefined when there is no such element.
*/
/*

//using while loop
function nth(list , n){
    let element = list;
   while(n>0) {
       if(element==null){
           return undefined;
       }
        element = element.rest;
        n--;

    }

    return element.value;
}*/

//using recursion
function nth(list , n){
    if(!list) return undefined;
    else if(n==0) return list.value;
    else return nth(list.rest , n-1);
}


let inputArray = [10, 20];
let listFromArray = arrayToList(inputArray);
console.log(listFromArray);
let element ={value : 30 , rest : null};
console.log("prepended 30 " ,prepend(element , listFromArray));
console.log("get 2nd" , nth(listFromArray ,5));

console.log(listToArray(listFromArray));


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20