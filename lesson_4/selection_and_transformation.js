let produce = {
    apple: 'Fruit',
    carrot: 'Vegetable',
    pear: 'Fruit',
    broccoli: 'Vegetable'
  };
  
  
  function selectFruit(obj) {
    let arr = Object.entries(obj);
    let newObj = {};
    for (let i = 0 ; i < arr.length ; i += 1) {
      if (arr[i][1] === 'Fruit') {
        newObj[arr[i][0]] = arr[i][1]; 
      }
    }
  
    return newObj;
  }
  
  console.log(selectFruit(produce)); 


  function doubleNumbers(numbers) {

    let counter = 0;
  
    while (counter < numbers.length) {
      numbers[counter] *= 2;
  
      counter += 1;
    }
  
    return numbers;
  }

  console.log(doubleNumbers([1,2,3,4,5,6]));


  function doubleOddIndices(numbers) {
    let doubledNums = [];
  
    for (let counter = 0; counter < numbers.length; counter += 1) {
  
      if (counter % 2 === 1) {
        doubledNums.push(numbers[counter] * 2);
      } else {
        doubledNums.push(numbers[counter]);
      }
    }
  
    return doubledNums;
  }


  console.log(doubleOddIndices([2,2,3,3,4,4,4,4]));

  function multiply(array, multiplyer) {
    let newArray = [];

    for (let i = 0 ; i < array.length ; i += 1) {
        newNumber = array[i] * multiplyer;
        newArray.push(newNumber);
    }

    return newArray;
  }

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(multiply(myNumbers, 3)); // => [3, 12, 9, 21, 6, 18]