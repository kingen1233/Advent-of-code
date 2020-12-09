const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const preamble = 25
let found = false
let invalidNumber = 0


let indexMap = new Map
let dupeMap = new Map

for (let i = 0; i < data.length; i++) {
    if (indexMap.has(parseInt(data[i]))) {
        dupeMap.set(parseInt(data[i]), i)
    }
    else {
        indexMap.set(parseInt(data[i]), i)
    }
}
console.time("test")

for (let i = preamble; i < data.length; i++) {
    invalidNumber = findImpossibleSum(i)

    if (!found) {
        break;
    } else {
        found = false;
    }
}

// note to self -Mappa value -> index
console.timeEnd("test")
console.log('the invalid number is', invalidNumber)


// For one number from the data array, checks if any other two numbers, from index (nextIndex-25) -> nextIndex, adds up to this number
function findImpossibleSum(nextIndex) {
    const sum = data[nextIndex]
    let startIndex = nextIndex - preamble
    for (let i = startIndex; i < nextIndex; i++) {
        const first = data[i]
        let second = sum - first
        let indexOk2 = false
        if(dupeMap.has(second)) indexOk2 = getIndexSpan(dupeMap.get(second), startIndex, nextIndex)

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