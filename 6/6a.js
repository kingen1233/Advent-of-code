const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')

// Fill groups. Every group will contain the full groups string in one index
let groups = []
let group = 0
// Every index in groups must be set to a string, so that we can do += on it
groups[0] = ''
data.forEach(line=> {
    if(line === ''){
        group++;
        groups[group] = ''
    }
    else(
        groups[group]+= line
    )
})

//Calculate yes per group
let sum = 0
groups.forEach((g) => {
    sum  += yesPerGroup(g)    
})

console.log(sum)

function yesPerGroup(group){
    let uniqueChar = []
    for(let i = 0; i < group.length; i++){
        if(!uniqueChar.includes(group.charAt(i))){
            uniqueChar.push(group.charAt(i))
        }
    }
    return uniqueChar.length
}