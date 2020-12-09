const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const preamble = 25
let found = false
let invalidNumber = 0


for(let i = preamble; i < data.length; i++){
    invalidNumber = findImpossibleSum(i)

    if(!found){
        break;
    }
    found = false;
}

console.log('the invalid number is', invalidNumber)


    

// For one number from the data array, checks if any other two numbers, from index (nextIndex-25) -> nextIndex, adds up to this number
function findImpossibleSum(nextIndex) {
    const sum = data[nextIndex]
    for (let i = nextIndex - preamble; i < nextIndex; i++) {
        const first = data[i]
        if (!found) {
            for (let j = nextIndex - preamble; j < nextIndex; j++) {
                const second = data[j]
                if (first == second) {
                }
                else if (parseInt(second) + parseInt(first) == sum) {
                    found = true;
                    break;
                }
            }
        }
    }
    if (!found) {
        return sum
    }

}