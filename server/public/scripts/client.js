$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  $('button').on('click', buttonVal)
}

function buttonVal() {
  let buttonIn = $(this).attr('id');
  console.log('Receiving new input...', buttonIn);
  $.ajax({
    method: 'POST',
    url: '/input-output',
    data: buttonIn
  })
  .then(function (response) {
    console.log('Response from server...', response);
    display();
  })
}


function display() {
  $.ajax({
    method: 'GET',
    url: './input-output'
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

function render(displayString) {
  console.log(displayString);
  
}