function repeat(n , action){
    for (let i = 0; i <n ; i++) {
        action(i);
    }
}

repeat(3, console.log);

//We don’t have to pass a predefined function to repeat. Often, it is easier to create a function value on the spot instead.
let labels = [];
repeat(5 , i => {labels.push(`Units ${i+1}`)});
console.log(labels);

//higher order function example
function greaterThan(n){
    return m=> m>n;
}

let greaterthan10 = greaterThan(10);
console.log("is 5 greater than 10? : ", greaterthan10(5));

//And we can have functions that change other functions.
function noisy(f){
    return (...args)=>{
        console.log("callling with " , args);
        let result = f(...args);
        console.log("called with args: " , args , " , returned :" , result);
        return result;
    };
}

const getMin = noisy(Math.min);
getMin(3, 2,1);

//it can be called like this too
function sum(...args){
    let sum=0;
    for (let i of args) {
        sum +=i;
    }
    return sum;
}
noisy(sum)(3,2,1,5);

//We can even write functions that provide new types of control flow.
function unless(test , then){
    if(!test) then();
}

repeat(3 , n=>{
    unless(n%2==1 ,()=>{console.log(n , " is even")});
});