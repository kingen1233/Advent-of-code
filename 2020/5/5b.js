const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\r\n')

const maxRow = 127
const maxCol = 7
//Create list with boardingpasses
let boardingList = []
data.forEach(e => {
    boardingList.push(objectify(e))
})

//Get information for boardingpasses
boardingList.forEach(pass => {
    findRow(pass)
    findColumn(pass)
    //TODO: Refactor find row and col into one method  
    setSeatId(pass)
})

//Calculate and print the biggest seatId
const biggestId = findBiggestId(boardingList)
console.log('Biggest id:',biggestId)
findEmptyRowCol(boardingList)


function findRow(pass) {
    let topSpan = maxRow
    let botSpan = 0
    for (let i = 0; i < pass.row.length; i++) {
        if (pass.row.charAt(i) === 'B') {
            topSpan = topSpan
            botSpan = Math.ceil((botSpan + topSpan) / 2)
        }
        else {
            topSpan = Math.floor((botSpan + topSpan) / 2)
            botSpan = botSpan
        }
    }

    if (botSpan === topSpan) {
        pass.row = botSpan
    }
    else {
        console.log("Find row wrong")
    }

}

function findColumn(pass) {

    let topSpan = maxCol
    let botSpan = 0
    for (let i = 0; i < pass.column.length; i++) {
        if (pass.column.charAt(i) === 'R') {
            topSpan = topSpan
            botSpan = Math.ceil((botSpan + topSpan) / 2)
        }
        else {
            topSpan = Math.floor((botSpan + topSpan) / 2)
            botSpan = botSpan
        }
    }

    if (botSpan === topSpan) {
        pass.column = botSpan
    }
    else {
        console.log("Find col wrong")
    }

}

function setSeatId(pass) {
    pass.seatId = (pass.row * 8 + pass.column)
}

function findBiggestId(boardingList) {

    let maxNumber = 0
    boardingList.forEach(pass => {
        if (pass.seatId > maxNumber) {
            maxNumber = pass.seatId
        }
    })

    return maxNumber
}

function objectify(boardingPass) {

    const row = boardingPass.substring(0, 7)
    const column = boardingPass.substring(7, 10)
    const seatId = null
    bpObject = { code: boardingPass, row, column, seatId }
    return bpObject

}

function findEmptyRowCol(boardingList) {
    let seatList = []
    boardingList.forEach(e => {            
        seatList.push(e.seatId)
    })
    for(let i = 41; i < 980; i++){
        if(!seatList.includes(i)) console.log('My seat:',i)
    }
}

