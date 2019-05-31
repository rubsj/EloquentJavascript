function* powers(n){
    for(let current=n , i=0;;current*=n, i++){
        if(i>=10) break;
        yield current;
    }
}

for(let power of powers(3)){
    console.log(power);
}