const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const preamble = 25
let invalidNumber = 31161678

console.time('test')

// Find numbers that adds up
let numberSet = null
let startIndex = 0;
while (numberSet == null) {
    numberSet = findContiguousSet(invalidNumber, startIndex)
    startIndex++
}
numberSet.sort()
let weaknessSum = parseInt(numberSet[0]) + parseInt(numberSet[numberSet.length - 1])
console.timeEnd('test')
console.log(weaknessSum);

// Find first set of contiguous numbers, that add up to sum
function findContiguousSet(sum, startIndex) {
    localSum = 0
    let addedNbrs = []
    for (let i = startIndex; i < data.length; i++) {
        addedNbrs.push(data[i])
        localSum += parseInt(data[i])
        if (localSum == sum) {
            return addedNbrs
        }
        else if (localSum > sum) {
            return null
        }
    }
}