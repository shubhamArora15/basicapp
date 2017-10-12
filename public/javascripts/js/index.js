var app = angular.module('basicApp', ["ngAnimate", 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested login
        .state('login', {
            url: '/',
            templateUrl: 'login.html',
            controller: 'formController'
        })

        // url will be reset
        .state('reset', {
            url: '/reset',
            templateUrl: 'reset.html',
            controller: 'formController'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/');
})

.controller('formController', function($scope, $state, $http) {

    // we will store all of our form data in this object

    $scope.next = function(nextState){
      $state.go(nextState);
    }

    // function to process the form
    $scope.createUser = function(user){
      $http.post("/users", {user:user})
        .then(function(response){
            console.log(response.data);
            alert("You are successfully registered");
        });
    };

    // function to process the form
    $scope.login = function(user){
      $http.post("/login", {user:user})
        .then(function(response){
          console.log(response);
          if(response.data == "yes"){
              alert("You Are successfully login");
          }else{
              alert("No Data Found");
          }

        });
    };

    // function to process the form
    $scope.reset = function(user){
      $http.post("/reset", {user:user})
        .then(function(response){
            alert("You successfully reset your password");
        });
    };

});
