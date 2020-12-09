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
let numberSet = null
let startIndex = 0;
while(numberSet == null){    
    numberSet = findContiguousSet(invalidNumber,startIndex)
    startIndex++
}
numberSet.sort()
let weaknessSum = parseInt(numberSet[0]) + parseInt(numberSet[numberSet.length-1])
console.log(weaknessSum);

// Find first set of contiguous numbers, that add up to sum
function findContiguousSet(sum, startIndex){
    localSum = 0
    let addedNbrs = []
    for(let i = startIndex; i < data.length; i++){
        addedNbrs.push(data[i])
        localSum += parseInt(data[i])
        if(localSum == sum){
            console.log(sum,'found in set', addedNbrs)
            return addedNbrs
        }     
        else if(localSum > sum){
            return null
        }   
    }
}
    

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