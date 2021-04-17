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
let firstNumber = '';
let secondNumber = '';
let total = '';
let functionSelector = '';
let equal = false;

//this turns the letter strings to number strings
function buttonToNumString(stringIn) {
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
      value: firstNumber
    };
    console.log('updateDisplay', outputArray);
  } else if (equal) {
    outputArray = {
      value: secondNumber
    };
  } else {
    outputArray = {
      value: total
    };
  }
}

function calculate() {
  
}



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