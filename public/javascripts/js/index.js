var app = angular.module('basicApp', ["ngAnimate", 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'formController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'formController'
        })
        .state('createSession', {
            url: '/createSession',
            templateUrl: 'createSession.html',
            controller: 'formController'
        })
        .state('viewSession', {
            url: '/viewSession',
            templateUrl: 'viewSession.html',
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
}).directive('fileModel', ['$parse', function($parse){
  return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });

		}
	}
}])
.controller('formController', function($scope, $state, $http, $rootScope) {

    // we will store all of our form data in this object

    $scope.imgArray = [], $scope.imgFileArray = [];

    $scope.next = function(nextState){
      $state.go(nextState);
    }

    // function to process the form
    $scope.createUser = function(user){

      var captcha = document.querySelector("#g-recaptcha-response").value;
      console.log(captcha);
      if(captcha == undefined || captcha == ""){
        alert("Please do google captcha verification");
      }else{
      $http.post("/users", {user:user})
        .then(function(response){
            if(response.data == "already"){
              alert("You are already member");
            }else{
            alert("You email verification sent to: <br> "+ user.email);
            $http.post("/verifyEmail", {user:user})
            .then(function(response){
              $http.post("/verify")
                .then(function(response){
                    console.log(response);
                    $scope.userName = user.email;
                });
            });
          }
        });
      }
    };

    // function to process the form
    $scope.login = function(user){
      $http.post("/login", {user:user})
        .then(function(response){
          if(response.data != "no"){
              alert("You Are successfully login");
              // $rootScope.id = response.data[0]._id
              localStorage.setItem('id', JSON.stringify(response.data[0]._id));
              localStorage.setItem('name', JSON.stringify(response.data[0].name));

              // $rootScope.name = response.data[0].name
              $state.go('home');

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
      console.log(user);
      $http.post("/resetPassword", {user:user,email:user.email})
        .then(function(response){
          console.log(response);
            alert("You successfully reset your password");
        });
    };

    $scope.photos = [];

    $('#photo1').on("change", function(e){
      uploadFile("photo1");
          });
    $('#photo2').on("change", function(){
      uploadFile("photo2")
    });
    $('#photo3').on("change", function(){
      uploadFile("photo3")
    });

    function uploadFile(id){
      var file    = document.getElementById(id).files[0];
      var fd = new FormData();

      fd.append('file', file);
      var uploadUrl = '/saveImage';

      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
      })
      .then(function(response) {
          $scope.photos.push(file.name);
      })
    }


    $scope.createSession = function(session, photos){
      console.log(session, photos, $rootScope.id);
      $http.post("/createSession", {session,photos,userId:localStorage.getItem('id'), createSession:true})
        .then(function(response){
          console.log(response);
          $state.go("viewSession");
            // alert("You successfully reset your password");
        });
    }
    $scope.viewSession = function(){

      $http.post("/viewSession", {userId:localStorage.getItem('id'), viewSession:true})
        .then(function(response){
          console.log(response.data);

          if(response.data == "404"){
            alert("no Session create new one");
          }else{
            $state.go('viewSession');
            $scope.sessionList = response.data;
          }
        });
    }

    $scope.getSessionData = function(id){
      $http.post("/viewSession", {sessionId:id,getSessionData:true})
      .then(function(response){
        $scope.photosData = response.data[0].photos;
        console.log($scope.photosData)
      });
    }

    $scope.name = localStorage.getItem('name');

    $scope.logout = function(){
        localStorage.clear();
        $state.go("login");
        $scope.photosData = [];
        alert("you are successfully logout");
    }
});
