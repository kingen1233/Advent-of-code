const data = require('./a.data')
console.time('ok')
let set = new Set();
data.forEach((e1) => {
    data.forEach((e2) => {
        data.forEach((e3) => {
            if (e1 + e2 + e3 === 2020) {
                set.add(e1 * e2 * e3)
            }
        })
    })

})


console.log(set)
console.timeEnd('ok')
