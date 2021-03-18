const { EventEmitter } = require("events");

const sum = (num1,num2) => num1 + num2;
const PI = 3.14;

class SomeMathObject {
    constructor() {
        console.log('object created');
    }
}
const ev = new EventEmitter();
ev.on('smile',()=>{
    console.log('smile :)');
})

// ev.emit('smile');

module.exports = {
    sum : sum,
    PI : PI,
    SomeMathObject : SomeMathObject,
    ev : ev
}