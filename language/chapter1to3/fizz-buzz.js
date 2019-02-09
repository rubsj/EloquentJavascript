let approach1 = ()=>{
    let num=1;
    while(num<101){
        if(num % 15 ===0){
            console.log("FizzBuzz");
        }else if(num%5===0){
            console.log("Buzz");
        }else if(num%3===0){
            console.log("Fizz");
        }else{
            console.log(num);
        }
        num++;
    }
};
//approach1();

let approach2 = ()=>{
    let num=1;
    while(num<101){
        let output = '';
        if(num%3===0){
            output+="Fizz";
        }
        if(num%5===0){
            output+="Buzz";
        }
        console.log(output || num);
        num++;
    }
};

approach2();