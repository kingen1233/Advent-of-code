const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] //Not cid

// Reads the indata and structures it appropriatley 
let result = []

let row;
for(let i = 0; i < data.length; i++){
    row += data[i]
    row += ' '
    if(data[i] === ''){
        result.push(row)
        row = ''
    }
}

// Compute if each line is valid
let validPassports = 0
result.forEach(passport => {
    let isValid = validatePassport(passport)
    if(isValid) validPassports++;
})

console.log(validPassports)

function validatePassport(passport){
    let isValid = true
    for(let i = 0; i < requiredFields.length; i++){
        if(!passport.includes(requiredFields[i])){
            isValid = false;
        }
    }    
    return isValid
}