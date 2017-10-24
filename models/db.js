var chalk = require('chalk');
var mongoose = require( 'mongoose' );
var SALT_WORK_FACTOR = 10;

// var dbURI = 'mongodb://localhost/employee_management';
var dbURI = 'mongodb://kishore_employee_management:kishore@ds041563.mlab.com:41563/employee_management';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(chalk.green('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.yellow('Mongoose disconnected'));
});

// Employees Schema
var employees = new mongoose.Schema({
  name: String,
  email: {type: String,unique:true},
  dob: Date,
  department: String,
  gender: String
});

// Build the Employee model
module.exports = mongoose.model( 'Employee', employees);
