const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Employee = require('./../models/db');
// var Employee = mongoose.model('Employee');

exports.employees = function (req, res) {
  Employee.find({}, function(err, employees) {
    if (!err) {
        res.json({employees});
    } else {throw err;}
  });
}

exports.employee = function (req, res) {
  Employee.findOne({'email': req.params.employee_id}, function(err, employees) {
    if (!err) {
        res.json({employees});
    } else {throw err;}
  });
}

exports.addEmployee = function (req, res) {
  Employee.findOne({'email': req.body.email}, function(err, employee) {
    if (!err) {
      if (employee != null) {
        res.json({'status': 'User already exist'});
        return;
      } else {
        let employee = new Employee();
        employee.email = req.body.email;
        employee.name = req.body.name;
        employee.dob = req.body.dob;
        employee.department = req.body.department;
        employee.gender = req.body.gender;
        employee.save(function (err, results) {
          if (err) {
            res.json({err});
            return;
          }
          res.json({'status': 'Success'});
        });
      }
    } else {throw err;}
  });
}

exports.deleteEmployee = function (req, res) {
  Employee.findOneAndRemove({'email': req.body.email}, function (err) {
    if (err) {
      return handleError(err);
    } else {
      res.json({'status': 'Success', 'message': 'Employee Successfully removed'});
    }
  })
}

exports.updateEmployee = function (req, res) {
  Employee.findOneAndUpdate({'email': req.body.email}, req.body, function (err, doc) {
    if (err) {
      res.json({err});
      return;
    } else {
      res.json({'status': 'Success', 'message': 'Employee Successfully Updated'});
    }
  });
}
