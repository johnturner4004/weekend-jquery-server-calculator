$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  $('.numberButton').on('click', buttonVal);
  $('.basicFunction').on('click', basicMath);
  $('.executeButton').on('click', execute);
  
  //the following two functions describes the animation for the neon sign 
  $('.firstCol').novacancy({
    'reblinkProbability': 0.1,
    'blinkMin': 0.2,
    'blinkMax': 0.6,
    'loopMin': 8,
    'loopMax': 10,
    'color': 'blue',
    'glow': ['0 0 80px Blue', '0 0 30px DarkBlue', '0 0 6px Cyan'],
    'blink': true
  });
  $('.secondCol').novacancy({
    'color': '#ff0dbf',
    'glow': ['0 0 80px Purple', '0 0 30px Indigo', '0 0 6px BlueViolet']
  });
}

//this captures the button id's and sends them to server.js to be used for the
//functions over there
function buttonVal() {
  historyArray = []
  let buttonIn = {
    value: $(this).attr('id')
  };
  console.log('Receiving new input...', buttonIn);
  $.ajax({
      method: 'POST',
      url: '/buttonIO',
      data: buttonIn
    })
    .then(function (response) {
      console.log('Response from server...', response);
      display();
    })
    .catch(function (error) {
      console.log('error from the server...', error);
      alert('Ya maybe you should just learn to do your own math');
    })
}

//this receives the output data from server.js sends it to the render function to
//upload to the DOM
function display() {
  $.ajax({
      method: 'GET',
      url: './buttonIO'
    })
    .then(function (response) {
      console.log('response from the server...', response);
      render(response);
    })
    .catch(function (error) {
      console.log('error from the server...', error);
      alert('Ya maybe you should just learn to do your own math');
    })
  console.log('After making server request...');
}

//this collects the operators from the DOM and sends it to server.js
function basicMath() {
  historyArray = []
  let functionIn = $(this).attr('id');
  let functionObject = {
    operator: functionIn
  };
  $.ajax({
      method: 'POST',
      url: './basic',
      data: functionObject
    })
    .then(function (response) {
      console.log('Response from server...', response);
      display();
    })
    .catch(function (error) {
      console.log('Error from server...', error);
      alert('Ya maybe you should just learn to do your own math');
    })
}

//this signals server.js to preform the selected operation using the previously
//selected inputs
function execute() {
  let executeIn = $(this).attr('id');
  let executeObject = {
    operator: executeIn
  };
  $.ajax({
      method: 'POST',
      url: './execute',
      data: executeObject
    })
    .then(function (response) {
      console.log('Response from server...', response);
      display();
    })
    .catch(function (error) {
      console.log('Error from server...', error);
      alert('Ya maybe you should just learn to do your own math');
    })
}

//this prints the output to the DOM
let index = 0;
let historyArray = [];
function render(array) {
  let symbol;
  console.log('object to render', array);
  if (array.function === 'add') {
    symbol = '+';
  } else if (array.function === 'subtract') {
    symbol = '-';
  } else if (array.function === 'multiply') {
    symbol = '*';
  } else if (array.function === 'divide') {
    symbol = '/';
  }
  //the following if statements will convert large numbers to exponentials to prevent
  //output from not fitting on display
  if (array.firstNum > 999999) {
    let temp = Number(array.firstNum);
    console.log('if in:', array.firstNum);
    array.firstNum= temp.toExponential(1);
  }
  if (array.secondNum > 999999) {
    let temp = Number(array.secondNum);
    console.log('if in:', array.secondNum);
    array.secondNum= temp.toExponential(1);
  }
  if (array.total > 9999999999) {
    let temp = Number(array.total);
    console.log('if in:', array.total);
    array.total= temp.toExponential(4);
  }
  //this prints available data to the DOM in its appropriate spot.
  $('#smallNum').empty();
  $('#largeNum').empty();
  if (array.firstNum === '') {
    console.log('render nothing');
    // do nothing
  } else if (array.secondNum === '') {
    console.log('render first num');
    $('#largeNum').append(`${array.firstNum}`);
  } else if (array.total === '') {
    console.log('render second num');
    $('#smallNum').append(`${array.firstNum} ${symbol}`);
    $('#largeNum').append(`${array.secondNum}`);
  } else {
    console.log('render everything');
    $('#smallNum').append(`${array.firstNum} ${symbol} ${array.secondNum}`)
    $('#largeNum').append(`${array.total}`)
  }
  console.log(array);
}