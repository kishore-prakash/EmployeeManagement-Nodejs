const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const employee = require('./routes/employee');
const xlsx = require('xlsx');
const fileUpload = require('express-fileupload');

var port = process.env.PORT || 8080;
var app = express();

var server = app.listen(port, function (req, res) {
  console.log("Magic happens at http://localhost:" + port);
});

app.use(express.static(__dirname + '/public'));
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
// app.get('/', routes.home);
app.get('/api/employees', employee.employees)
app.get('/api/employee/:employee_id', employee.employee)
app.put('/api/addEmployee/', employee.addEmployee)
app.post('/api/removeEmployee/', employee.deleteEmployee)
app.post('/api/updateEmployee', employee.updateEmployee)
app.get('/addEmployee', function (req, res) {
  res.sendFile(__dirname + '/views/addEmployee.html');
});
app.get('/updateEmployee', function (req, res) {
  res.sendFile(__dirname + '/views/updateEmployee.html');
});
app.get('/', function (req, res) {
  console.log("fileName: " + req.originalUrl);
  res.sendFile(__dirname + '/views/home.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/download/:fileName', function (req, res) {
  console.log("fileName: " + req.originalUrl);
  res.sendFile(__dirname + '/public/uploads/' + req.params.fileName);
});

app.get('/uploads/*', function (req, res) {
  console.log("fileName: " + req.originalUrl);
  res.sendFile(__dirname + '/public/' + req.originalUrl);
});

app.get('/Jabra_Elite_Sport-v5.1.1-vector/*', function (req, res) {
  console.log("fileName: " + req.originalUrl);
  res.sendFile(__dirname + '/public/uploads/' + req.originalUrl);
});

app.get('/Jabra_Elite_65t-v1.2.1-vector/*', function (req, res) {
  console.log("fileName: " + req.originalUrl);
  res.sendFile(__dirname + '/public/uploads/' + req.originalUrl);
});

app.get('/xlsx/:fileName/:sheetNumber', function (req, res) {
  var workbook = xlsx.readFile(__dirname + '/public/uploads/' + req.params.fileName);
  var sheet_name_list = workbook.SheetNames;
  res.send(xlsx.utils.sheet_to_html(workbook.Sheets[sheet_name_list[req.params.sheetNumber]]));
  // console.log(xlsx.utils.sheet_to_html(workbook.Sheets[sheet_name_list[3]]))
});

app.post('/upload', function(req, res) {
  console.log("fileName: " + req.files.upload_file.name);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.upload_file;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname + '/public/uploads/' + req.files.upload_file.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.get('/upload', function (req, res) {
  res.sendFile(__dirname + '/views/upload.html');
});

// app.get('/download/Jabra_Elite_Sport-v5.1.1-vector/info.xml', function (req, res) {
//   res.sendFile(__dirname + '/public/uploads/info.xml');
// });

// app.get('/download/Jabra_Elite_Sport-v5.1.1-vector/Jabra_Elite_Sport-v5.1.1-US_EN-default.dfu', function (req, res) {
//   res.sendFile(__dirname + '/public/uploads/Jabra_Elite_Sport-v5.1.1-vector/Jabra_Elite_Sport-v5.1.1-US_EN-default.dfu');
// });
