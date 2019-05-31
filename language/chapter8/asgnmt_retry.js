class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    // Your code here.
    for(;;){
        try{
         return primitiveMultiply(a, b);
        }catch(err){
            console.log("in catch block");
            if( ! (err instanceof MultiplicatorUnitFailure)){
                throw err;
            }
        }
    }

}

console.log(reliableMultiply(8, 8));