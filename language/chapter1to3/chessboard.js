let chessBoardPattern = ()=>{
    let output = " # # # # ";
    for(let counter=0; counter<8; counter++){
        if(counter%2===0){
            console.log(output.slice(0,8));
        }else{
            console.log(output.slice(1,9));
        }
    }

};
//chessBoardPattern();

//Write a program that creates a string that represents an 8×8 grid, using new-line characters to separate lines.
let chessBoardStr = ()=>{
    let output ='';
    for(let i=0;i<8;i++){
      for(let j=0;j<8;j++){
          if((i+j)%2===0){
              output+=" ";
          }else{
              output+="#"
          }
      }
      output+="\n";
    }
    console.log(output);
};
chessBoardStr();