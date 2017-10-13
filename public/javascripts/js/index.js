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
        }).state('resetPassword', {
            url: '/resetPassword',
            templateUrl: 'resetPassword.html',
            controller: 'formController'
        }).state('verify', {
            url: '/verify',
            templateUrl: 'verify.html',
            controller: 'formController'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/');
})

.controller('formController', function($scope, $state, $http, $rootScope) {

    // we will store all of our form data in this object

    $scope.next = function(nextState){
      $state.go(nextState);
    }

    // function to process the form
    $scope.createUser = function(user){
      $http.post("/users", {user:user})
        .then(function(response){
            console.log(response.data);
            // alert("You are successfully registered");
            $http.post("/verifyEmail", {user:user})
            .then(function(response){
              console.log(response);

              $http.post("/verify")
                .then(function(response){
                    console.log(response);
                    $scope.userName = user.email;
                });
                alert("You email verification sent to: <br> "+ user.email);
            });
        });
    };

    // function to process the form
    $scope.login = function(user){
      $http.post("/login", {user:user})
        .then(function(response){
          if(response.data == "yes"){
              alert("You Are successfully login");
          }else{
              alert("No Data Found");
          }

        });
    };

    // function to process the form
    $scope.reset = function(user){
      console.log(user);
      $http.post("/reset", {user:user})
        .then(function(response){
          console.log(response);
            alert("You  reset confirmation sent to:<br>"+ user.email);
            $rootScope.newEmail = response;
        });
    };

    // function to process the form
    $scope.resetPassword = function(user){
      console.log(user, email);
      $http.post("/resetPassword", {user:user,email:user.email})
        .then(function(response){
          console.log(response);
            alert("You successfully reset your password");
        });
    };

    // $http.get("/verify")
    //   .then(function(response){
    //       alert("You successfully reset your password");
    //   });

});
