const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')

// Fill groups from data
let groups = []
let group = 0
groups[0] = ''
data.forEach(e=> {
    if(e === ''){
        groups[group] = groups[group].slice(0,groups[group].length-1) //Remove last empty element in each group
        group++;
        groups[group] = ''
    }
    else(
        groups[group]+= e +','
    )
})

//Split up so each group consists of multiple elements
groups.forEach((e, index) => groups[index] = e.split(','))

//Calculate Sum
let sum
calculateSum()
console.log(sum)

function calculateSum(){
    sum = 0
    //Calculate matching answers per group
    groups.forEach((group,index) => {
        findMatchingAnswer(group, index)
    })
}

function findMatchingAnswer(group, index){
    let yesNeeded = group.length
    let letterOccurance = new Map()    

    //Fill map with how many times each character appeared
    group.forEach(answerSheet => {
        for(let i = 0; i < answerSheet.length; i++){
            const currChar = answerSheet.charAt(i)
            if(letterOccurance.has(currChar)){
                let currKey = letterOccurance.get(currChar)
                currKey++
                letterOccurance.set(currChar, currKey)
            }else{
                letterOccurance.set(currChar, 1)
            }
        }
    })

    // Gets values from map to calculate how many matching answers the group has
    const itr = letterOccurance.entries()
    for(const entry of itr){
        // If the letter appeared as many times as there are group members (if everyone answered yes)
        if(entry[1] === yesNeeded){
            sum += 1 
        }
    }    
}