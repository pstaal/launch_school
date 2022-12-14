function first() {
    return {
      prop1: "hi there"
    };
  }
  
  function second() {
    return
    {
      prop1: "hi there"
    };
  }
  
  console.log(first());
  console.log(second());

  let object = { first: [1] };
let numArray = object["first"];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);

function messWithVars(one, two, three) {
    one.splice(0, 1, "two");
    two.splice(0, 1, "three");
    three.splice(0, 1, "one");
  }
  
  let one = ["one"];
  let two = ["two"];
  let three = ["three"];
  
  messWithVars(one, two, three);
  
  console.log(`one is: ${one}`);
  console.log(`two is: ${two}`);
  console.log(`three is: ${three}`);

  function isDotSeparatedIpAddress(inputString) {
    let dotSeparatedWords = inputString.split(".");
    if (dotSeparatedWords !== 4 ) {
        return false;
    }
    while (dotSeparatedWords.length > 0) {
      let word = dotSeparatedWords.pop();
      if (!isAnIpNumber(word)) {
        return false;
      }
    }
  
    return true;
  }