/*Analogous to the some method, arrays also have an every method.
This one returns true when the given function returns true for every element in the array.
In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method.
*/

function every_using_loop(arr , evalFn ){
    for (let val of arr){
        if(!evalFn(val)){
           return false;
        }
    }
    return true;
}

function every_using_some(arr , evalFn ){
    return !arr.some(element => !evalFn(element));
}

/*console.log(every_using_loop([1, 3, 5], n => n < 10));
console.log(every_using_loop([2, 4, 16], n => n < 10));
console.log(every_using_loop([], n => n < 10));*/
console.log(every_using_some([1, 3, 5], n => n < 10));
console.log(every_using_some([2, 4, 16], n => n < 10));
console.log(every_using_some([], n => n < 10));
