//this links necessary modules to server.js
const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const buttonTranslate = require('./public/scripts/button');

//this sets up the static server
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//this sets up global variables for server.js
//due to the nature of the functions on server.js most of the variables
//are global variables
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

//this function executes the selected function using a switch statement to choose
//between the various options all cases call the updateDisplay() function upon
//completion to keep current data on the screen
function calculate(executeTask) {
  switch (executeTask) {
    //this converts a percent to a decimal number this does not require both inputs
    //the if Statement allows only the current value entered to be converted
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
    //this case will combine the two numbers using the chosen operator to help avoid
    //confusion the operators are selected using if...else statements rather than a
    //nested case statement. 
    case 'equal':
      console.log('equql in');
      if (firstNumber !== '' && secondNumber !== '' && functionSelector !== '') {
      firstNumber = Number(firstNumber);
      console.log(firstNumber);
      secondNumber = Number(secondNumber);
      console.log(secondNumber);
      if (functionSelector === 'add') {
        total = firstNumber + secondNumber;
      } else if (functionSelector === 'subtract') {
        total = firstNumber - secondNumber;
      } else if (functionSelector === 'multiply') {
        total = firstNumber * secondNumber;
      } else if (functionSelector === 'divide') { 
        total = firstNumber / secondNumber;
      }
      total = total + '';
      console.log('Total after equal', total);
      updateHistory();
      updateDisplay();
      break;
    }
    //this will clear the current selection from both the display and its input
    //variable. Does nothing for an executed sum;s
    case 'clear':
      if (total !== '') {
        //do nothing
      } else if (secondNumber !== '') {
        secondNumber = '';
      } else if (functionSelector) {
        functionSelector !== '';
      } else {
        firstNumber = ''
      }
      updateDisplay();
      break;
    //this will clear all input values and the screen
    case 'all-clear':
      firstNumber = '';
      secondNumber = '';
      functionSelector = '';
      total = '';
      updateDisplay();
      break;
    //this will enable the user to cycle through the previous inputs, operators, and
    //totals
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

    //this is supposed to print an alert if the switch statement ever fails.
    default:
      alert('Oops, you broke me!');
  }
}

//this will update the historyArray used by the 'history' case.
function updateHistory() {
  historyArray.push({
    firstNum: firstNumber,
    secondNum: secondNumber,
    function: functionSelector,
    total: total
  })
}

//the following set up the paths on the server.js side of the application to enable
//communication between server.js and console.js
app.get('/buttonIO', (req, res) => {
  console.log('request for output...', outputArray);
  res.send(outputArray);
})

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