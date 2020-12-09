const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const preamble = 25
let found = false
let invalidNumber = 0

let indexMap = new Map
let dupeMap = new Map
// Map all inputs, value -> their index 
for (let i = 0; i < data.length; i++) {
    if (indexMap.has(parseInt(data[i]))) {
        dupeMap.set(parseInt(data[i]), i)
    }
    else {
        indexMap.set(parseInt(data[i]), i)
    }
}
console.time("test")
//Find impossible number
for (let i = preamble; i < data.length; i++) {
    invalidNumber = findImpossibleSum(i)

    if (!found) {
        break;
    } else {
        found = false;
    }
}

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

// For one number from the data array, checks if any other two numbers, from index (nextIndex-25) -> nextIndex, adds up to this number
function findImpossibleSum(nextIndex) {
    const sum = data[nextIndex]
    let startIndex = nextIndex - preamble
    for (let i = startIndex; i < nextIndex; i++) {
        const first = data[i]
        let second = sum - first
        let indexOk2 = false
        if (dupeMap.has(second)) indexOk2 = getIndexSpan(dupeMap.get(second), startIndex, nextIndex)

        let indexOk = getIndexSpan(indexMap.get(second), startIndex, nextIndex)
        if (first == second || second < 0) {
            continue
        }
        else if (indexMap.has(second) && indexOk || indexOk2) {
            found = true
            return
        }
    }
    if (!found) {
        return sum
    }

}

function getIndexSpan(index, startIndex, nextIndex) {
    if (index > startIndex && index < nextIndex) {
        return true
    }
    return false
}