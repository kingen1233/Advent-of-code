const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const preamble = 25
let found = false
let invalidNumber = 0

console.time("test")

const set = new Set()
for(const d of data){
    set.add(parseInt(d))
}

for(let i = preamble; i < data.length; i++){
    invalidNumber = findImpossibleSum(i)

    if(!found){
        break;
    }else{
        found = false;
    }
}

// note to self -Mappa value -> index
console.timeEnd("test")
console.log('the invalid number is', invalidNumber)
    

// For one number from the data array, checks if any other two numbers, from index (nextIndex-25) -> nextIndex, adds up to this number
function findImpossibleSum(nextIndex) {
    const sum = data[nextIndex]
    const set = getValidNumbers(nextIndex)
    for (let i = nextIndex - preamble; i < nextIndex; i++) {
        const first = data[i]
        let second = sum - first
        if (first == second || second < 0) {
            continue
        }
        else if (set.has(second)) {
            found = true
            return
        }
    }
    if (!found) {
        return sum
    }

}
 
function getValidNumbers(index) {
    const set = new Set()
    for (let i = index - preamble; i < index; i++) {
        set.add(parseInt(data[i]))
    }
    return set
}