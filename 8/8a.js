const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')

// Read data into better format
let instrList = []
let index = 0
for(const instr of data){
    instrList[index] = instr.split(' ')
    index++;
}

let accum = 0
let pc = 0
let visitedIndex = new Set()
// While the next instruction hasnt been executed before
while(!visitedIndex.has(pc)){

    let command = instrList[pc][0]
    let value = instrList[pc][1]
    visitedIndex.add(pc)
    execute(command, value)
     
}

console.log("END",accum, pc)

function execute(command, value){

    switch(command){
        case 'nop':
            pc++
            break
        
        case 'acc':
            accum += parseInt(value)
            pc++
            break

        case 'jmp':
            pc += parseInt(value)
            break
    }
}