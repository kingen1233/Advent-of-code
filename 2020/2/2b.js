const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf8').split('\n')
let numberValid = 0;

data.forEach((e) => {
    const row = e.split(" ")
    let span = row[0]
    span = span.split("-")
    let lowerSpan = span[0]
    let upperSpan = span[1]
    lowerSpan--;
    upperSpan--; 
    const target = row[1].substring(0,1)
    const line = row[2]

    const lowerHit = (line.charAt(lowerSpan) === target)
    const upperHit = (line.charAt(upperSpan) === target)
    if(lowerHit && upperHit){
        
    }
    else if(lowerHit){
        numberValid++;
    }
    else if(upperHit){
        numberValid++;
    }
})
console.log(numberValid)

