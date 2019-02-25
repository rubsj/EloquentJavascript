//example of simple method
let rabbit = {};
rabbit.speak = function(line){
    console.log(`The ${this.type} rabbit says ${line}`);
};

rabbit.speak("I am alive");  // -> The rabbit says I am alive

/**********************************************************/
//example of function having its own this binding

function speakFn(line){
    console.log(`The ${this.type} rabbit says ${line}`);
}

let whiteRabbit ={  type : 'white', speak : speakFn};
let hungryRabbit = {type :'hungry' , speak: speakFn};
whiteRabbit.speak("Oh my ears and whiskers,how late it's getting!");
hungryRabbit.speak("I could use a carrot right now.");
speakFn.call(hungryRabbit, "burp!!");
let bindWhite = speakFn.bind(whiteRabbit);  ///bind returns function which can be called later
bindWhite("I love snow !!");
speakFn.bind(whiteRabbit, "I love snow in spring!!")(); //called bind function without param as needed param was available at the time of bind creation
speakFn.bind(whiteRabbit, )("I love snow in summer !!"); //called bounded function with param at the calling time

/**********************************************************/
//using Object.create to create object with diffeent protoype
let protoRabbit = {
    speak(line){
        console.log(`The ${this.type} rabbit says ${line}`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");

console.log(Object.getPrototypeOf(killerRabbit));
/*protoRabbit.prototype.teeth='sharp';
console.log(killerRabbit.teeth);*/


/**********************************************************/

function makeRabbit(type){
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

let weirdProtoRabbit = new makeRabbit("weird Poto Rabbit"); //function used as constructor using prototype as base
weirdProtoRabbit.speak("I am weired proto rabbit");
console.log(Object.getPrototypeOf(makeRabbit));
console.log(Object.getPrototypeOf(protoRabbit));
console.log(Object.getPrototypeOf(weirdProtoRabbit));
Object.getPrototypeOf(protoRabbit).teeth='sharp';
console.log(weirdProtoRabbit.teeth);
console.log(Object.getPrototypeOf(protoRabbit));

/**********************************************************/

//function used as constructor but the base prototype not provided
function Rabbit(type){
    this.type = type;
}
Rabbit.prototype.speak = function(line){
    console.log(`The ${this.type} rabbit says ${line}`);
};
let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("I am weired");
Rabbit.prototype.teeth = 'small';
console.log(weirdRabbit.teeth);

/**********************************************************/

