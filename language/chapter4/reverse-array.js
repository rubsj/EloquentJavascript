function reverseArray(inputArray){
    let reversedArr=[];
    while(inputArray.length>0){
        reversedArr.push(inputArray.pop());
    }

    return reversedArr;
}

function reverseArrayInPlace(inputArray){
    const arrayMidPoint = inputArray.length/2;
    const arrayIndexSwap =inputArray.length-1;
    for (let i = 0; i <arrayMidPoint ; i++) {
       let temp = inputArray[i];
       inputArray[i]=inputArray[arrayIndexSwap-i];
       inputArray[arrayIndexSwap-i] = temp;
    }
}

console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5,6];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);