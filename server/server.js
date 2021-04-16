const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded( {extended: true}));

const inputArray = [];

const outputArray=['this', 'is', 'a', 'test'];


app.get('/input-output', (req, res) => {
  console.log('request for output...', outputArray);
  res.send(outputArray);
})



app.post('/input-output', (req, res) => {
  let input = req.body;
  console.log('Request for input...', input);
inputArray.push(input);
res.sendStatus(201);
})



app.listen(port, () => {
  console.log('listening on port', port + '...');
})