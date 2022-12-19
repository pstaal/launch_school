while (true) {
    let number = Math.floor(10 * Math.random());
    console.log(number);
  
    if (number === 5) {
      console.log('Exiting...');
      break;
    }
  }