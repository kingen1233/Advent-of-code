const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const slopes = [ 
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]
const result = []
let finalValue = 1;

//.forEach instead of for(i) just to annoy Oliver ;)
slopes.forEach(i => result.push(countTreePath(i[0], i[1])))
result.forEach(e => {finalValue = finalValue*e})
console.log(finalValue)

function countTreePath(rightStep, downStep) {
    const lineLength = 31;
    let [index, count] = [0, 0]
    for (let i = downStep; i < data.length; i+=downStep) {
        index = (index + rightStep) % lineLength;
        const hit = data[i].charAt(index)
        if (hit === '#') count++;
    }
    return count;
}