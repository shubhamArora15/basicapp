var app = angular.module('basicApp', ["ngAnimate", 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'formController'
        }).state('slideShow', {
            url: '/slideShow',
            templateUrl: 'slideShow.html',
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
}]).filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
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

              $rootScope.name = localStorage.getItem('name');
              $state.go('home');

          }else{
              alert("No Data Found");
          }

        });
    };

      $('.carousel').carousel({
        interval: 1000,
        pause: "false"
      });

      var $item = $('.carousel .item');
      var $wHeight = $(window).height();
      $item.height($wHeight);
      $item.addClass('full-screen');

    $('#carousel-example-generic').on('slide.bs.carousel', function () {
        var element = document.getElementsByClassName('active');
        var element2 = $(document.getElementsByClassName('active')).next("div");
        // var element3 = $(document.getElementsByClassName('active')).prev("div");

        var videoElem = $(element[0]).find('video');
        var videoElem2 = $(element2[0]).find('video');
        // var videoElem3 = $(element3[0]).find('video');
        var audioElem = $(element[0]).find('audio');
        var audioElem2 = $(element2[0]).find('audio');
        // var audioElem3 = $(element3[0]).find('audio');
        function startStopCaurosol(elementNew){
          console.log(elementNew);
          $(elementNew).on('play', function (e) {
              $("#carousel-example-generic").carousel('pause');
          });
          $(elementNew).on('stop pause ended', function (e) {
              $("#carousel-example-generic").carousel();
          });
        }
        console.log(videoElem2, videoElem, audioElem, audioElem2);
          if(videoElem2.length > 0){
            videoElem2[0].autoplay = true;
            videoElem2[0].load();
            pauseAudio();
            startStopCaurosol(videoElem2[0]);
          }else if(videoElem.length > 0){
            videoElem[0].autoplay = false;
            pauseAudio();
          }

          if(audioElem2.length > 0){
            audioElem2[0].autoplay = true;
            audioElem2[0].load();
            pauseVideo();
            startStopCaurosol(audioElem2[0]);
          }else if(audioElem.length > 0){
            audioElem[0].autoplay = false;
            pauseVideo()
          }
          function pauseAudio(){

            if(audioElem2.length > 0){
              audioElem2[0].pause();
            }else if(audioElem.length > 0){
              audioElem[0].pause();
            }
          }

          function pauseVideo(){

            if(videoElem2.length > 0){
              videoElem2[0].pause();
            }else if(videoElem.length > 0){
              videoElem[0].pause();
            }
          }

        var length = $(document.getElementsByClassName('active')).next("div").length;
        // var length2 = $(document.getElementsByClassName('active')).prev("div").length;
        if(length === 0){
          pauseAudio();
          pauseVideo();
          // $(element2[0]).removeAttribute('autoplay');;$(element[0]).removeAttribute('autoplay');;
        }
      });
    // }
    // }


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

    $scope.split = function(value){
          value = value.split(".");
          ext = value[1];
          return ext;
    }

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
    // $('#photo2').on("change", function(){
    //   uploadFile("photo2")
    // });
    // $('#photo3').on("change", function(){
    //   uploadFile("photo3")
    // });

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
          str = "You Uploaded:  <span style = 'font-size:18px'><b> "+$scope.photos.length +"</b></span>  File successfully";
          $("#showData").html(str);
      })
    }


    $scope.createSession = function(session, photos){
      // console.log(session, photos, $rootScope.id);
      $http.post("/createSession", {session,photos,userId:localStorage.getItem('id'), createSession:true})
        .then(function(response){
          console.log(response);
          $state.go("viewSession");
            // alert("You successfully reset your password");
        });
    }

    var socket = io();
    socket.on('newclientconnect',function(data) {
      console.log(data.sessionId);
      $http.post("/viewSession", {sessionId:data.sessionId, getSessionData:true})
      .then(function(response){
        $rootScope.photosData = response.data[0].photos;
        $state.go('slideShow');
        // openSlideShow();
        // console.log($scope.photosData)
      });
      // $("#carousel-example-generic").modal('show');
    });


    $scope.viewSession = function(){

      $http.post("/viewSession", {userId:localStorage.getItem('id'), viewSession:true})
        .then(function(response){
          console.log(response.data);

          if(response.data == "404"){
            alert("no Session create new one");
          }else{

            $scope.sessionList = response.data;
            $state.go('viewSession');

            setTimeout(function () {
              response.data.forEach(function(item){
                console.log(item.session)

                var qrcode = new QRCode(item._id, {
                    text: "abc",
                    width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });

                var qrcode = qrcode.makeCode(item._id); // This will make another code.

              });
            }, 10);
          }
        });
    }


    // setTimeout(function () {
    //   $http.post('/findSession',{findSession:true})
    //     .then(function(response){
    //         if(response.data.length > 0){
    //           $state.go('home');
    //         }
    //     });
    // }, 100);

    $scope.getSessionData = function(id){
      $http.post("/viewSession", {sessionId:id, getSessionData:true})
      .then(function(response){
        $rootScope.photosData = response.data[0].photos;
        $state.go('slideShow');
        // openSlideShow();
        // console.log($scope.photosData)
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
