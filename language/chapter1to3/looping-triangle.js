// appraoch 1
let approach1 = () => {
    let counter = 1;
    while (counter < 8) {
        let val = '';
        for (let i = 0; i < counter; i++) {
            val += '#';
        }
        console.log(val);
        counter++;
    }
};

//approach1();

// approach 2
let approach2 = ()=>{
    for(let line='#' ; line.length<8; line+='#'){
        console.log(line);
    }
};
//console.log("now the smarter approach");
//approach2();

//approach3
let approach3 = ()=>{
    let line='#';
    while(line.length<8){
        console.log(line);
        line+="#";
    }
};
approach3();