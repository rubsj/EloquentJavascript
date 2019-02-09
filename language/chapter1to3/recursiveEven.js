function isEven(numToCheck){
   if(numToCheck===0){
     return true;
   }else if(numToCheck===1){
       return false;
   }else{
      return isEven(numToCheck-2);
   }
}

function findEven(num){
   num = Number(num);
  if(num<0){
      num = -num;
  }

  let output = isEven(num);
  console.log(num, output);
}

findEven(50);
findEven(75);
findEven(-1);
findEven(1);
findEven(-10);
findEven(0);
