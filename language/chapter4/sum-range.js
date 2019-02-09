/**
 * Write a range function that takes two arguments, start and end,
 * and returns an array containing all the numbers from start up to (and including) end.
 * @param start - start index type number
 * @param end - end index type end
 */
function range(start, end) {
    let a = [];
    if (end >= start) {
        for (let i = start; i <= end; i++) {
            a.push(i);
        }
    } else {
        for (let i = start; i >= end; i--) {
            a.push(i);
        }
    }

    return a;
}

/* generic implementation of range is below*/
function rangeWithStep(start, end, step = start < end ? 1 : -1) {
    let a = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            a.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            a.push(i);
        }
    }

    return a;
}

/*write a sum function that takes an array of numbers and returns the sum of these numbers. */
function sum(rangeArray) {
    let sumVal = 0;
    for (let item of rangeArray) {
        sumVal += item;
    }
    return sumVal;
}

console.log(range(1, 10));
console.log(sum(range(1, 10)));
console.log(rangeWithStep(10, 2, -3));
console.log(rangeWithStep(10, 200, 10));
