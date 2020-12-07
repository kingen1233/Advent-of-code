const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
console.time('Fuck')
const targetBag = 'shiny gold'
// Split into array on words 'bags' and 'bag'
let temp = []
let result = []
for (let d of data) {

    result.push(d.split(/bags|bag/))

}
// trim away unnecessary characters, make array easier to handle
let index = 0
for (let row of result) {

    let inner = 0
    let innerTemp = []
    for (let e of row) {
        e = e.replace(',', '')
        e = e.replace('.', '')
        e = e.replace('contain', '')
        e = e.replace(/[0-9]/, '')
        e = e.replace('no other', '')
        e = e.trim()
        //console.log(e, index)
        if (e !== '') {
            innerTemp[inner] = e
            inner++
        }
    }
    temp[index] = innerTemp
    index++;
}
result = temp

// Map each bag to what it can contain
let bagMap = new Map()
for (const row of result) {
    let key
    let bagContain = new Set()
    for (let i = 0; i < row.length; i++) {
        i === 0 ? key = row[i] : bagContain.add(row[i])
    }
    bagMap.set(key, bagContain)
}

let containsTarget = 0
let found = false
for (const [key, value] of bagMap) {
    evaluateBag(key, value)
    found = false
}
//182 too high
console.timeEnd('Fuck')
console.log(containsTarget)

function evaluateBag(key, value) {
    
    if (value.has(targetBag)) {
        containsTarget++
        found = true
    }
    else {
        for (const bag of value) {
            if(!found)evaluateBag(bag, bagMap.get(bag))
        }
    }
}