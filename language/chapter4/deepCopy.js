//My learning - for of  gives the value of the iteratable and for in gives the index of iteratable
//appraoch 1
/*function deepEqual(val1, val2) {
    if (val1 === val2) return true;
    let val1Type = typeof val1;
    let val2Type = typeof val2;
    if (((val1Type !== "object") || (val2Type !== "object")) || !val1 || !val2) {
        return false;
    }

    let val1Keys = Object.keys(val1);
    let val2Keys = Object.keys(val2);
    for (let key of val1Keys) {
        if (!val2Keys.includes(key) || !deepEqual(val1[key], val2[key])) {
            return false;
        }
    }

    return true;

}*/

//appraoch 2
function deepEqual(a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") return false;

    let keysA = Object.keys(a), keysB = Object.keys(b);

    if (keysA.length != keysB.length) return false;

    for (let key in a) {
        //since hasOwnProperty can be custom property too ..a safer alternative is
        //refer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
      //  if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) return false;
        if (!Object.prototype.hasOwnProperty.call(b, key)
            || !deepEqual(a[key], b[key])) return false;
    }

    return true;
}


console.log(deepEqual(null, null));
// → true

console.log(deepEqual(null, undefined));
// → false

console.log(deepEqual('', undefined));
// → false

console.log(deepEqual('a', 'a'));
// → true

console.log(deepEqual(true, true));
// → true

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true