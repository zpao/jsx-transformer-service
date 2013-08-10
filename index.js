var express = require('express');
var reactTools = require('react-tools');

var app = express();
var port = process.env.PORT || 5000;

app.use(express.bodyParser());

app.post('/', function(req, res) {
  var response = 'we fucked up';
  var rawCode = req.body.code;
  try {
    response = reactTools.transform(rawCode);
  } catch (e) {
    response = e;
  }
  res.send(response);
});

app.get('/', function(req, res) {
  res.send(
    'More soon. Until then, just <code>POST</code> to ' +
    '<code>jsx-tranformer.herokuapp.com</code> with <code>code</code> set to ' +
    'your code you want transformed.'
  );
});

app.listen(port);
