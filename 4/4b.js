const { ifError } = require('assert');
const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] //Not cid
const allowedHair = '^[#0-9a-f]'
const allowedEyeColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

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

// Transform passports into passport objects
let objectList = []
result.forEach(passport => {
    const obj = objectify(passport)
    objectList.push(obj)
})
// Compute if each passport is valid
let validPassports = 0
objectList.forEach(passport => {
    let isValid = validatePassport(passport)
    if(isValid) validPassports++;
})
//Less than 128
console.log(validPassports)

function objectify(passport){

    let obj = {byr: null, iyr: null, eyr: null, hgt: null, hcl: null, ecl: null, pid: null}

    for(let i = 0; i < requiredFields.length; i++){
        const currField = requiredFields[i];
        if(passport.includes(currField)){
            let index = passport.indexOf(currField)
            index = index+4

            switch (currField) {
                case 'byr':
                    const byr = passport.substring(index,index+4)
                    obj.byr = byr
                    break;
                case 'iyr':
                    const iyr = passport.substring(index,index+4)
                    obj.iyr = iyr
                    break;
                case 'eyr':
                    const eyr = passport.substring(index,index+4)
                    obj.eyr = eyr
                    break;
                case 'hgt':
                    const hgt = passport.substring(index,index+5).trim()
                    obj.hgt = hgt
                    break;
                case 'hcl':
                    const hcl = passport.substring(index,index+7)
                    obj.hcl = hcl
                    break;
                case 'ecl':
                    const ecl = passport.substring(index,index+3)
                    obj.ecl = ecl
                    break;
                case 'pid':
                    const pid = passport.substring(index,index+9)
                    obj.pid = pid
                    break;
            }
        }
    }
    return obj
}

function validatePassport(passport){
    //Check if any attribute is null
    
    for (var key in passport) {
        if (passport[key] === null) {
            return false;
        }
    }

    //Check if all attributes contain correct data
    for (var key in passport) {
        let value = passport[key]
        value = value.trim()
        valueIsOk = validateAttribute(key, value)
        if(valueIsOk === false) {        
            return  false
        }
    }
    console.log(passport, true)
    return true
}

function validateAttribute(attribute, value){
    isValid = true
    switch (attribute) {
        case 'byr':
            if(value >= 1920 && value <= 2002) isValid = true
            else isValid = false;            
            break;
        case 'iyr':
            if(value >= 2010 && value <= 2020) isValid = true
            else isValid = false;            
            break;
        case 'eyr':
            if(value >= 2020 && value <= 2030) isValid = true
            else isValid = false;
            break;
        case 'hgt':
            if(value.includes('cm')){
                if(value.length == 5){
                    if(value.substring(0,3) >= 150 && value.substring(0,3) <= 193) isValid = true
                }
                else isValid = false;
            }
            else if(value.includes('in')){
                if(value.length == 4){
                    if(value.substring(0,2) >= 59 && value.substring(0,2) <= 76) isValid = true
                }
                else isValid = false;
            }
            else isValid = false;
            break;
        case 'hcl':
            if(value.length === 7 && value.match('#') && value.match(allowedHair)) isValid = true;
            else isValid = false;
            break;
        case 'ecl':
            for(let i = 0; i < allowedEyeColor.length; i++){
            const color = allowedEyeColor[i]
            value === color ? isValid = true : isValid = false
            if(isValid) break;
            }            
            break;
        case 'pid':            
            if(value.length === 9 && value.match("^[0-9]+$")) isValid = true
            else isValid = false
            break;
    }
    return isValid
}