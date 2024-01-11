const lyn = _ => _ + "lynsb"

const name = "lyn"
const result = lyn(name)

console.log(result)

const array = [12,4,5,4,7,8,0,0,56,76,4,55,63,45,45,34,534,5]

const arr = array.map(x => x + 1)
// const add = arr.reduce((a, b) => a + b)
const str = arr.toString().split(",").reduce((a, b) => a + b)
console.log(str)