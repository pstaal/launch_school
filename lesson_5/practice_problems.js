let arr = ['10', '11', '9', '7', '8'];
arr.sort(( a , b ) => Number(b) - Number(a));
console.log(arr);

let books = [
    { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
    { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
    { title: 'Ulysses', author: 'James Joyce', published: '1922' },
    { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
  ];

books.sort(( a, b ) => {
    return Number(a.published) - Number(b.published);
});

console.log(books);

let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
console.log(arr1[2][1][3]);
let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
console.log(arr2[1].third[0]);
let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
console.log(arr3[2].third[0][0]);
let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
console.log(obj1.b[1]);
let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
console.log(Object.keys(obj2.third)[0]);

let arr4 = [1, [2, 3], 4];
arr4[1][1] = 4;
console.log(arr4);
let arr5 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr5[2] = 4;
console.log(arr5);
let obj3 = { first: [1, 2, [3]] };
obj3.first[2][0] = 4;
console.log(obj3);
let obj4 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj4.a.a[2] = 4;
console.log(obj4);

let munsters = {
    herman: { age: 32, gender: 'male' },
    lily: { age: 30, gender: 'female' },
    grandpa: { age: 402, gender: 'male' },
    eddie: { age: 10, gender: 'male' },
    marilyn: { age: 23, gender: 'female'}
  };

let memberDetails = Object.values(munsters);
let totalMaleAge = 0;

memberDetails.forEach(member => {
  if (member.gender === 'male') {
    totalMaleAge += member.age;
  }
});

Object.entries(munsters).forEach(entry => {
    let name = entry[0];
    let age = entry[1]['age'];
    let gender = entry[1].gender;
  
    console.log(`${name} is a ${age}-year-old ${gender}.`);
  });

  let obj = {
    first: ['the', 'quick'],
    second: ['brown', 'fox'],
    third: ['jumped'],
    fourth: ['over', 'the', 'lazy', 'dog'],
  };

  Object.values(obj).forEach((array) => {
    array.forEach((word) => {
        word.split('').forEach((char) => {
            if(['i','a','o','u','e'].includes(char)) {
                console.log(char);
            }
        })
    })
  })

  let arr9 = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
  let newArray = arr9.map(subArr => {
    if (typeof subArr[0] === 'string') {
      // we have an array of strings
      return subArr.slice().sort();
    } else {
      // we have an array of numbers
      return subArr.slice().sort((a, b) => a - b);
    }
  });

console.log(newArray);

let newestArray = arr9.map(subArr => {
    if (typeof subArr[0] === 'string') {
      // we have an array of strings
      return subArr.slice().sort((a,b) => {
        if ( a > b  ){
            return -1;
          }
          if ( a < b ){
            return 1;
          }
          return 0;
      });
    } else {
      // we have an array of numbers
      return subArr.slice().sort((a, b) => b - a);
    }
  });

  console.log(newestArray);

  let arr10 = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

  let arr11 = arr10.map((object) => {
    let keys = Object.keys(object);
    let newObject = {};
    keys.map((key) => {
        newObject[key] = object[key] + 1;
    })
    return newObject;
  })

  console.log(arr11);

  let arr12 = [[2], [3, 5, 7], [9], [11, 15, 18]];
  let arr13 = arr12.map((array) => {
    return array.filter((number) => number % 3 === 0);
  });
  console.log(arr13);

  let arr14 = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
  arr14.sort((a, b) => {
         let oddSumA = a.filter(num => num % 2 === 1)
                           .reduce((sum, next) => sum + next);
         let oddSumB = b.filter(num => num % 2 === 1)
                           .reduce((sum, next) => sum + next);
          
         return oddSumA - oddSumB;
  });

  console.log(arr14);

  let obj7 = {
    grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
    carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
    apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
    apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
    marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
  };

  let arr15 = Object.values(obj7).map((obj) => {
    if (obj.type === 'fruit') {
        return obj.colors.map((color) => {
            return color[0].toUpperCase() + color.slice(1);
        })
    } else {
        return obj.size.toUpperCase();
    }
  })
  console.log(arr15);
 
  let arr16 = [
    { a: [1, 2, 3] },
    { b: [2, 4, 6], c: [3, 6], d: [4] },
    { e: [8], f: [6, 10] },
  ];

 

  let arr17 = arr16.filter((obj) => {
    return Object.values(obj).flat().every((num) => num % 2 === 0);
  })

  console.log(arr17);

  let arr18 = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
  let arr18Object = {};
  arr18.forEach((arr) => {
    arr18Object[arr[0]] = arr[1];
  })
  console.log(arr18Object);

  let startArray = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
  let idArray =[];
  for (let i = 1; i <= 32; i += 1) {
    let randomIndex = Math.floor(Math.random()*startArray.length);
    idArray.push(startArray[randomIndex]);
  };
  let idString =idArray.join('');
  let finalString = idString.slice(0,8) + '-' + idString.slice(8,12) + '-' + idString.slice(12,16) + '-' + idString.slice(16,20) + '-' + idString.slice(20); 
  console.log(finalString);