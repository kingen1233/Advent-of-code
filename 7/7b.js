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
        e = e.replace('no other', '')
        e = e.trim()
        //console.log(e, index)
        if (e !== '') {
            const amount = e.charAt(0)
            if(amount  > 0 && amount <= 9){
                e = e.replace(/[0-9]/, '')
                e = e.trim()
                for(let i = 0; i < amount; i++){
                    innerTemp[inner] = e
                    inner++
                }
            }
            else{
            innerTemp[inner] = e
            inner++
            }
            
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
    let bagContain = []
    for (let i = 0; i < row.length; i++) {
        i === 0 ? key = row[i] : bagContain[i-1] = row[i]
    }
    bagMap.set(key, bagContain)
}

// Calculate the amount of bags in one golden bag
const shinyGoldBag = bagMap.get('shiny gold')
let amntBags = 0;
evaluateBag(shinyGoldBag)
console.timeEnd('Fuck')
console.log(amntBags)

function evaluateBag(bagList){    
    for(const bag of bagList){        
        evaluateBag(bagMap.get(bag))
        amntBags++     
    }
}