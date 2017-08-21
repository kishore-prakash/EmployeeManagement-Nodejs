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

app.controller("addEmployee", function ($scope, $http) {
    $scope.addEmployee = function () {
      console.log('#someButton was clicked');
       // use $.param jQuery function to serialize data from JSON
        var employee = $.param({
            name: $scope.name,
            email: $scope.email,
            dob: $scope.dob,
            department: $scope.department,
            gender: $scope.gender
        });
        //
        // var config = {
        //     headers : {
        //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        //     }
        // }

        $http.post('/api/addEmployee', employee)
        .then(function (response) {
            $scope.status = response.data.status;
        },
        function(response){
         // failure callback
         });
        // .success(function (data, status, headers, config) {
        //     $scope.PostDataResponse = data;
        // })
        // .error(function (data, status, header, config) {
        //     $scope.ResponseDetails = "Data: " + data +
        //         "<hr />status: " + status +
        //         "<hr />headers: " + header +
        //         "<hr />config: " + config;
        // });
    };

});

// App.factory('employeeApp', ['$http', '$q', function($http, $q){
//
//     return {
//
//     employees: function() {
//             return $http.get("/api/employees")
//             .then(
//                     function(response){
//                         return response.data.employees;
//                     },
//                     function(errResponse){
//                         console.error('Error while fetching users');
//                         return $q.reject(errResponse);
//                     }
//             );
//         },
//
//     createUser: function(user){
//             return $http.post('http://localhost:8080/SpringMVC4RestAPI/user/', user)
//             .then(
//                     function(response){
//                         return response.data;
//                     },
//                     function(errResponse){
//                         console.error('Error while creating user');
//                         return $q.reject(errResponse);
//                     }
//             );
//         },
//
//     updateUser: function(user, id){
//             return $http.put('http://localhost:8080/SpringMVC4RestAPI/user/'+id, user)
//             .then(
//                     function(response){
//                         return response.data;
//                     },
//                     function(errResponse){
//                         console.error('Error while updating user');
//                         return $q.reject(errResponse);
//                     }
//             );
//         },
//
//    deleteUser: function(id){
//             return $http.delete('http://localhost:8080/SpringMVC4RestAPI/user/'+id)
//             .then(
//                     function(response){
//                         return response.data;
//                     },
//                     function(errResponse){
//                         console.error('Error while deleting user');
//                         return $q.reject(errResponse);
//                     }
//             );
//         }
//
//     };
//
// }]);
