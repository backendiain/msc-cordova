// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic']);

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

  $urlRouterProvider.otherwise('/app/home');

});

app.run(function () {

});
