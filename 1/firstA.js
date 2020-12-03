const data = require('./a.data')

console.time('ok')
const dataSet = new Set(data)

dataSet.forEach((e, index) => {  

    const other = getOther(e) 
    if(dataSet.has(other)){
        printResult(e, other)
    }
})

function getOther(nbr){
    return (2020-nbr)
}
function printResult(nbr1, nbr2){
    console.log(nbr1 + ' and '+  nbr2 + ' give ' + nbr1*nbr2)
}

console.timeEnd('ok')