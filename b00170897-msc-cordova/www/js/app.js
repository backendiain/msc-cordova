// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova']);

app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

  app.controllerProvider = $controllerProvider;
  app.compileProvider = $compileProvider;
  app.filterProvider = $filterProvider;
  app.provide = $provide;

  $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: "menuCtrl"
    })

    /* Routing for our pages and tabs */
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    /* 2D Stress Tests */
    .state('app.2dTests', {
      url: '/2d-tests',
      views: {
        'menuContent': {
          templateUrl: 'templates/2d-tests.html',
          controller: '2dTestsCtrl'
        }
      }
    })

    .state('app.3dTests', {
      url: '/3d-tests',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests.html',
          controller: '3dTestsCtrl'
        }
      }
    })

    .state('app.3dTestsBouncing', {
      url: '/3d-tests/bouncing',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-bouncing.html',
          controller: '3dTestsBouncingCtrl'
        }
      },
      resolve: {
        /* Let's get our dependencies */
        json: function($http){
          // Get a script
          return $http({ method: 'GET', url: 'js/test.json'});
        }
      }
    })

    .state('app.3dTestsRollingBalls', {
      url: '/3d-tests/rolling-balls',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-rolling-balls.html',
          controller: '3dTestsRollingBallsCtrl'
        }
      }
    })

    .state('app.3dTestsRollingBallsStairs', {
      url: '/3d-tests/rolling-balls-stairs',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-rolling-balls.html',
          controller: '3dTestsRollingBallsStairsCtrl'
        }
      }
    })

    .state('app.3dTestsFunnel', {
      url: '/3d-tests/funnel',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-funnel.html',
          controller: '3dTestsFunnelCtrl'
        }
      }
    })

    .state('app.3dTestsWreckingBall', {
      url: '/3d-tests/wrecking-ball',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-wrecking-ball.html',
          controller: '3dTestsWreckingBallCtrl'
        }
      }
    })

    .state('app.3dTestsGeneratedBalls', {
      url: '/3d-tests/generated-balls',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-generated-balls.html',
          controller: '3dTestsGeneratedBallsCtrl'
        }
      }
    })

    .state('app.3dCloth', {
      url: '/3d-tests/cloth',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-cloth.html',
          controller: '3dClothTestCtrl'
        }
      }
    })

    .state('app.3dBabylon', {
      url: '/3d-tests/babylon',
      views: {
        'menuContent': {
          templateUrl: 'templates/3d-tests-babylon.html',
          controller: '3dBabylonTestCtrl'
        }
      }
    })

    .state('app.cordovaTriggerPerformanceTest', {
      url: '/cordova-trigger-performance-test',
      views: {
        'menuContent': {
          templateUrl: 'templates/cordova-trigger-performance-test.html',
          controller: 'cordovaTriggerPerformanceTestCtrl'
        }
      }
    })

    .state('app.wthrTest', {
      url: '/weather-promise-test',
      views: {
        'menuContent': {
          templateUrl: 'templates/weather-promise-test.html',
          controller: 'wthrTestCtrl'
        }
      }
    })

    .state('app.iTunesSearchTest', {
      url: '/itunes-search-test',
      views: {
        'menuContent': {
          templateUrl: 'templates/itunes-search-test.html',
          controller: 'iTunesSearchTestCtrl'
        }
      }
    })

    .state('app.videoTest', {
      url: '/video-test',
      views: {
        'menuContent': {
          templateUrl: 'templates/videojs.html',
          controller: 'videoTestCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/app/home');

});

app.run(function () {

});
