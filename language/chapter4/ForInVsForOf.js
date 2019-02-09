/* refer https://alligator.io/js/for-of-for-in-loops/ */

let oldCar = {
    make: 'Toyota',
    model: 'Tercel',
    year: '1996'
};

for (let key in oldCar) {
    console.log(`${key} --> ${oldCar[key]}`);
}
//expected output for above loop
// make --> Toyota
// model --> Tercel
//year --> 1996

for (let key of Object.keys(oldCar)) {
    console.log(`${key} --> ${oldCar[key]}`);
}

//expected output for above loop
// make --> Toyota
// model --> Tercel
//year --> 1996

let str = 'Turn the page';

for (let index in str) {
    console.log(`Index of ${str[index]}: ${index}`);
}

//expected output for above loop
// Index of T: 0
// Index of u: 1

 str = 'abcde';

for (let char of str) {
    console.log(char.toUpperCase().repeat(3));
}

// AAA
// BBB
// ...