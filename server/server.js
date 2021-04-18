const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const buttonTranslate = require('./public/scripts/button');

app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

let outputArray = [];
let historyArray = [];
let firstNumber = '';
let secondNumber = '';
let total = '';
let functionSelector = '';
let historyIndex = 0;

//this turns the letter strings to number strings
function buttonToNumString(stringIn) {
  if (total !== '') {
    firstNumber = '';
    secondNumber = '';
    total = '';
    functionSelector = '';
  }
  let stringTrans = buttonTranslate(stringIn);
  console.log('buttonToString', stringTrans);
  if (functionSelector === '') {
    firstNumber += stringTrans;
  } else {
    secondNumber += stringTrans;
  }
  updateDisplay();
}

//this function determins what to send to the display
function updateDisplay() {
  if (functionSelector === '') {
    outputArray = {
      firstNum: firstNumber,
      secondNum: '',
      function: '',
      total: ''
    };
    console.log('updateDisplay', outputArray);
  } else if (total === '') {
    outputArray = {
      firstNum: firstNumber,
      secondNum: secondNumber,
      function: functionSelector,
      total: ''
    };
  } else {
    outputArray = {
      firstNum: firstNumber,
      secondNum: secondNumber,
      function: functionSelector,
      total: total
    };
  }
}

function calculate(executeTask) {
  switch (executeTask) {
    case 'percent':
      if (secondNumber !== '') {
        secondNumber = secondNumber / 100;
        secondNumber = secondNumber + '';
      } else {
        firstNumber = firstNumber / 100;
        firstNumber = firstNumber + '';
      }
      updateDisplay();
      break;
    case 'equal':
      console.log('equql in');
      if (firstNumber !== '' && secondNumber !== '' && functionSelector !== '') {
        firstNumber = Number(firstNumber);
        console.log(firstNumber);
        secondNumber = Number(secondNumber);
        console.log(secondNumber);
        if (functionSelector === 'add') {
          // functionSelector = '+';
          total = firstNumber + secondNumber;
        } else if (functionSelector === 'subtract') {
          // functionSelector = '-';
          total = firstNumber - secondNumber;
        } else if (functionSelector === 'multiply') {
          // functionSelector = '*';
          total = firstNumber * secondNumber;
        } else if (functionSelector === 'divide') {
          // functionSelector = '/';
          total = firstNumber / secondNumber;
        }
        console.log(total);
        total = total + '';
        console.log('Total after equal', total);
        updateHistory();
        updateDisplay();
        break;
      }
      case 'clear':
        if (secondNumber !== '') {
          secondNumber = '';
        } else if (functionSelector) {
          functionSelector !== '';
        } else {
          firstNumber = ''
        }
        updateDisplay();
        break;
      case 'all-clear':
        firstNumber = '';
        secondNumber = '';
        functionSelector = '';
        total = '';
        updateDisplay();
        break;
      case 'history':
      firstNumber = historyArray[historyIndex].firstNum;
      secondNumber = historyArray[historyIndex].secondNum;
      functionSelector = historyArray[historyIndex].function;
      total = historyArray[historyIndex].total;
      if (historyIndex < historyArray.length - 1) {
        historyIndex++
      } else {
        historyIndex = 0;
      }
      updateDisplay();
      break;
    //   case 'CLEAR-HISTORY': //ya I found out about this after I was basically done so I kind of pitched a fir
    //   for (let i = 0; i < historyArray.length; i++) {
    //     historyArray.pop()
    //   }
    //   break;
      default:
        alert('Oops, you broke me!');
      }
    }
    
    function updateHistory() {
  historyArray.push({
    firstNum: firstNumber,
    secondNum: secondNumber,
    function: functionSelector,
    total: total
  })
}

app.get('/buttonIO', (req, res) => {
  console.log('request for output...', outputArray);
  res.send(outputArray);
})

// app.post('/history', (req, res) => {
//   console.log('not sure if i need this', req);
//   res.send(201);
// })

// app.get('/history', (req, res) => {
//   console.log('request for output...', historyArray);
//   res.send(historyArray);
// })

app.post('/buttonIO', (req, res) => {
  let input = req.body;
  console.log('Request for input...', input);
  buttonToNumString(input.value);
  res.sendStatus(201);
})

app.post('/basic', (req, res) => {
  let functionBut = req.body;
  console.log('Request for input...', functionBut);
  functionSelector = functionBut.operator;
  updateDisplay();
  res.sendStatus(201);
})

app.post('/execute', (req, res) => {
  let executeIn = req.body;
  console.log('Request for input...', executeIn);
  executeButton = executeIn.operator;
  calculate(executeButton);
  res.sendStatus(201);
})

app.listen(port, () => {
  console.log('listening on port', port + '...');
})