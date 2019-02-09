let countBs = (inputStr) => {
    const strLen = inputStr.length;
    let count = 0;
    for (let i = 0; i < strLen; i++) {
        if (inputStr[i] === 'B') {
            count++;
        }
    }
    return count;
};

let countChar = (inputStr, searchChar) => {
    const strLen = inputStr.length;
    let count = 0;
    for (let i = 0; i < strLen; i++) {
        if (inputStr[i] === searchChar) {
            count++;
        }
    }
    return count;
};



let countbUsingCountChar = (inputStr) => countChar(inputStr, 'B');

console.log(countbUsingCountChar("BBC"));
console.log("countB using approach 1", countBs("RuBy"));
console.log("count characters : ", countChar("Ruby", 'U'));