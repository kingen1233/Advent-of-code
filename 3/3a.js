const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const lineLength = 31;
const rightStep = 3;
let index = 0;
let count = 0;
for(let i = 1; i < data.length; i++){
    index = (index + rightStep)%lineLength;
    const hit = data[i].charAt(index)
    if(hit === '#') count ++;
}
console.log(count)