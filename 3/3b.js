const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const result = []
let finalValue = 1;
result.push(countTreePath(1,1))
result.push(countTreePath(3,1))
result.push(countTreePath(5,1))
result.push(countTreePath(7,1))
result.push(countTreePath(1,2))
//.forEach instead of for(i) just to annoy Oliver ;)
result.forEach(e => {finalValue = finalValue*e})
console.log(finalValue)

function countTreePath(rightStep, downStep) {
    const lineLength = 31;
    let index = 0;
    let count = 0;
    for (let i = downStep; i < data.length; i+=downStep) {
        index = (index + rightStep) % lineLength;
        const hit = data[i].charAt(index)
        if (hit === '#') count++;
    }
    return count;
}