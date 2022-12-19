let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
console.log(arr.slice(2, 5)[0]);

let numbers = [1, 2, 3, 4];
numbers[0] = numbers[0] + 1;  // => 2

numbers[1] = numbers[1] + 1;

numbers[2] = numbers[2] + 1;
 
numbers[3] = numbers[3] + 1;

numbers[4] = numbers[4] + 1;
console.log(numbers);

let obj = { apple: 'Produce', carrot: 'Produce', pear: 'Produce', broccoli: 'Produce' }
obj.apple = obj.pear;
obj.carrot = obj.broccoli;
console.log(obj);