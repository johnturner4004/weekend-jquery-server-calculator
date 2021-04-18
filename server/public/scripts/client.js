$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  $('.numberButton').on('click', buttonVal);
  $('.basicFunction').on('click', basicMath);
  $('.executeButton').on('click', execute);
  $('#history').on('click', history);
  render(displayString);
}
let displayString = {
  value: ''
};

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


function history() {
  $.ajax({
      method: 'GET',
      url: './history'
    })
    .then(function (response) {
      historyArray = response;
    })
    .catch(function(error){
      console.log('Error from server...', error);
      alert('Maybe you should just learn to do your own math');
    })
  $('.screen').empty();
  $('.screen').append(`
  <p id=inHistory>${historyArray[index].firstNum}&nbsp
    ${historyArray[index].function}&nbsp
    ${historyArray[index].secondNum}&nbsp</p>
    <p id=totHistory>${historyArray[index].total}</p>
  `)
  index++;
}


function render(displayString) {
  $('.screen').empty();
  $('.screen').append(displayString.value);
  console.log(displayString);

}