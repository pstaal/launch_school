console.log([1, 2, 3].filter(num => 'hi'));

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];
let obj = {};

flintstones.forEach((name, index) => {
 obj[name] = index;
})

console.log(obj);

let ages = {
    Herman: 32,
    Lily: 30,
    Grandpa: 5843,
    Eddie: 10,
    Marilyn: 22,
    Spot: 237
  };

console.log(Object.values(ages).reduce((a,b) => a +b));
console.log(Object.values(ages).reduce((a,b) => {
    if (b < a) {
    return b;
}
 return a;
}, 100));

let statement = "The Flintstones Rock";
let object = {};

statement.split('').filter(char => char !== ' ').forEach((char) => {
    if (object[char]) {
        object[char] += 1;
    } else {
        object[char] = 1;
    }
})

console.log(object);