const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')

// Read data into better format
let backupList = []
let index = 0
for(const instr of data){
    backupList[index] = instr.split(' ')
    index++;
}
// Create bacuplist to restore original list from after editing
backupList = objectify(backupList)
let instrList = backupList.map(a => ({...a}));

// Required global variables
let accum = 0
let pc = 0
let brokenInstruction = 0

for (let i = 0; i < instrList.length; i++) {
    
    // Restore instruction list from the backup map
    instrList = backupList.map(a => ({...a}));
    
    // Change command "i" to the corresponding one
    let iCommand = instrList[i].command
    brokenInstruction = i
    if(iCommand === 'nop'){
        iCommand = 'jmp'
    }
    else if(iCommand === 'jmp'){
        iCommand = 'nop'
    }
    else{
        // IF the command is "ACC" we do nothing, therefor we can skip this iteration
        continue
    }
    instrList[i].command = iCommand
    accum = 0
    pc = 0
    let visitedIndex = new Set()
    // While program counter never ran this instruction before and still has instructions to run
    while (!visitedIndex.has(pc) && pc < instrList.length) {
        let command = instrList[pc].command
        let value = instrList[pc].value
        visitedIndex.add(pc)
        execute(command, value)
    }

    // If we executed all instructions, break
    if(pc === instrList.length){
        break
    }
}
console.log("Program now works with value:",accum)
console.log("Corrupt instruction was", instrList[brokenInstruction].command, instrList[brokenInstruction].value +".", "With index", brokenInstruction )

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

function objectify(instrList){

    let temp = []
    for(let i = 0; i < instrList.length; i++){
        temp[i] = {command: instrList[i][0], value: instrList[i][1]}
    }
    instrList = temp
    return instrList
}