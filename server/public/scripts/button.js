function buttonTranslate(buttonString) {
  console.log('buttonTranslate in:', buttonString);
  let buttonNum;
  switch (buttonString) {
    case 'one':
      buttonNum = '1';
      break;
    case 'two':
      buttonNum = '2';
      break;
    case 'three':
      buttonNum = '3';
      break;
    case 'four':
      buttonNum = '4';
      break;
    case 'five':
      buttonNum = '5';
      break;
    case 'six':
      buttonNum = '6';
      break;
    case 'seven':
      buttonNum = '7';
      break;
    case 'eight':
      buttonNum = '8';
      break;
    case 'nine':
      buttonNum = '9';
      break;
    case 'zero':
      buttonNum = '0';
      break;
    case 'decimal':
      buttonNum = '.';
      break;
      // case 'add':
      //   buttonNum = '+';
      //   break;
      // case 'multiply':
      //   buttonNum = '*';
      //   break;
      // case 'subtract':
      //   buttonNum = '-';
      //   break;
      // case 'divide':
      //   buttonNum = '/';
      //   break;
      // case 'percent':
      //   buttonNum = '%';
      //   break;
      // case 'equal':
      //   buttonNum = '=';
      //   break;
      // case 'clear':
      //   buttonNum = 'clear';
      //   break;
      // case 'all-clear':
      //   buttonNum = 'all-clear';
      //   break;
    default:
      buttonNum = 'ERROR'
  }
  console.log('buttonTranslate out:', buttonNum);
  
  return buttonNum;
}









module.exports = buttonTranslate;