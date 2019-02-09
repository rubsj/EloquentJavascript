function findMin(one , two) {
    let oneNum = Number(one);
    let twoNum = Number(two);
    if(Number.isNaN(oneNum) || Number.isNaN(twoNum)) return;

    return oneNum - twoNum > 0 ? two : one;
}

function min2(one , two){
  return one < two ? one : two;
}

console.log(min2(3, 4));
console.log(min2(2,2));
console.log(min2(5,2));
console.log(min2('num',2));