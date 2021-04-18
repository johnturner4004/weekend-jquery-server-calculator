$(document).ready(onReady);

// let emptyInput = ;

function onReady() {
  console.log('JQ');
  $('.numberButton').on('click', buttonVal);
  $('.basicFunction').on('click', basicMath);
  $('.executeButton').on('click', execute);
  render({
    firstNum: '',
    secondNum: '',
    function: '',
    total: ''
  });
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



let index = 0;
let historyArray = [];

// function requestHistory() {
//   $.ajax({
//     method: 'POST',
//     url: './history',
//     data: 'I don\'t think I need this but it isn\'t working so I\'m trying whatever'
//   })
//   .then(function(response) {
//     console.log('response from function I don\'t think I need', response);
//     history();
//   })
//   .catch(function(error) {
//     console.log('Yep, didn\'t need that', error);
//     alert('Well that was stupid')

//   })
// }


// function history() {
//   $.ajax({
//       method: 'GET',
//       url: './history'
//     })
//     .then(function (response) {
//       historyArray = response;
//     })
//     .catch(function(error){
//       console.log('Error from server...', error);
//       alert('Maybe you should just learn to do your own math');
//     })
//   $('.screen').empty();
//   $('.screen').append(`
//   <p id=inHistory>${historyArray[index].firstNum}&nbsp
//     ${historyArray[index].function}&nbsp
//     ${historyArray[index].secondNum}&nbsp</p>
//     <p id=totHistory>${historyArray[index].total}</p>
//   `)
//   index++;
// }


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