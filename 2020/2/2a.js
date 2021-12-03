const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf8').split('\n')
let numberValid = 0;

data.forEach((e, index) => {
    let counter = 0;
    const row = e.split(" ")
    let span = row[0]
    span = span.split("-")
    const lowerSpan = span[0]
    const upperSpan = span[1]
    const target = row[1].substring(0,1)
    const line = row[2]
    
    for(i = 0; i < line.length; i++){
        if(line.charAt(i) === target){           
            counter++
        }
    }
    if(counter >= lowerSpan && counter <= upperSpan){
        numberValid++;
    }
})
console.log(numberValid)
