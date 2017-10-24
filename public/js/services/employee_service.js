'use strict';

var app = angular.module('employeeApp', []);
app.controller('employees', function($scope, $http) {
  $http.get('/api/employees')
  .then(function(response) {
      $scope.employees = response.data.employees;
  });
});

app.controller('employee', function($scope, $http) {
  $http.get('/api/employee/')
  .then(function(response) {
      $scope.employee = response.data.employees;
  });
});

app.controller("addEmployee", function ($scope, $http, $window) {
    $scope.addEmployee = function () {
       // use $.param jQuery function to serialize data from JSON
        var employee = {
            name: $("#name").val(),
            email: $("#email").val(),
            dob: $("#dob").val(),
            department: $("#department").val(),
            gender: $("#gender").val()
        };
        $http.put('/api/addEmployee', employee)
        .then(function (response) {
            // $scope.status = response.data.status;
            $window.location.href = '/';
        },
        function(response){
            console.log(response);
         });
    };
});

app.controller("deleteEmployee", function ($scope, $http, $window) {
    $scope.deleteEmployee = function (email) {
       // use $.param jQuery function to serialize data from JSON
        var employee = {
            email: email
        };
        $http.post('/api/removeEmployee', employee )
        .then(function (response) {
            $scope.status = response.data.status;
            $window.location.reload();
        },
        function(response){
          $scope.status = response;
         });
    };
});

app.controller("updateEmployee", function ($scope, $http, $window) {
    $scope.updateEmployee = function () {
       // use $.param jQuery function to serialize data from JSON
        var employee = {
            name: $("#name").val(),
            email: $("#email").val(),
            dob: $("#dob").val(),
            department: $("#department").val(),
            gender: $("#gender").val()
        };
        $http.post('/api/updateEmployee', employee)
        .then(function (response) {
            // $scope.status = response.data.status;
            $window.location.href = '/';
        },
        function(response){
            console.log(response);
         });
    };
});

app.controller("updateEmployeeRedirection", function ($scope, $http, $window) {
    $scope.updateEmployeeRedirection = function (email, name, dob, department, gender) {
       // use $.param jQuery function to serialize data from JSON
        var employee = {
            name: name,
            email: email,
            dob: dob,
            department: department,
            gender: gender
        };

        $window.location.href = '/updateEmployee?email=' + email + '&name=' + name + '&dob=' + dob + '&department=' + department + '&gender=' + gender ;
    };
});
