$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  $('.numberButton').on('click', buttonVal);
  $('.basicFunction').on('click', basicMath);
  $('.executeButton').on('click', execute);
  render(displayString);
}
let displayString = {value: ''};

function buttonVal() {
  let buttonIn = {value: $(this).attr('id')};
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
  let functionIn = $(this).attr('id');
  let functionObject = {operator: functionIn};
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
  let executeObject = {operator: executeIn};
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

function render(displayString) {
  $('.screen').empty();
  $('.screen').append(displayString.value);
  console.log(displayString);
  
}