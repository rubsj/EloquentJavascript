/*
* Consider this puzzle:
* by starting from the number 1 and repeatedly either adding 5 or multiplying by 3,
* an infinite set of numbers can be produced.
* How would you write a function that, given a number, tries to find a sequence of such additions
* and multiplications that produces that number?
*
*/
let target;
function find(current, history) {
    console.log("tracing the current and history values" , current , history);
    if (current == this.target) {
        return history;
    } else if (current > this.target) {
        return null;
    } else {
        return find(current + 5, `(${history} + 5)`) ||
            find(current * 3, `(${history} * 3)`);
    }
}

function findSolution(target) {
    this.target=target;
    console.log("target:" , this.target);
    return find(1, "1");
}

console.log(findSolution(24));
console.log(findSolution(13));