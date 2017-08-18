const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const employee = require('./routes/employee');

var port = process.env.PORT || 8080;
var app = express();

var server = app.listen(port, function (req, res) {
  console.log("Magic happens at http://localhost:" + port);
});

app.use(express.static(__dirname + '/public'));
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', routes.home);
app.get('/api/employees', employee.employees)
app.get('/api/employee/:employee_id', employee.employee)
app.put('/api/addEmployee/', employee.addEmployee)
app.delete('/api/removeEmployee/:email', employee.deleteEmployee)
app.post('/api/updateEmployee', employee.updateEmployee)
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/views/home.html'); // load the single view file (angular will handle the page changes on the front-end)
});
