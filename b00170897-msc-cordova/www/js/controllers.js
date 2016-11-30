app.controller("mainCtrl", function ($state, $rootScope, $ionicPlatform, $ionicHistory) {

  $ionicPlatform.ready(function () {

  });
});

app.controller("menuCtrl", function ($scope, $ionicSideMenuDelegate, $ionicPopover) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $ionicPopover.fromTemplateUrl('templates/options-menu.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
});

app.controller('homeCtrl', function () {
  
})

app.controller('2dTestsCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('3dTestsCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('3dTestsBouncingCtrl', function ($ionicPlatform, $scope, json, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){

    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/cannon/cannon.min.js',,
      'js/libs/Three.js',
      'js/libs/Detector.js',
      'js/cannon/scenes/bouncingBalls.js',
      'js/cannon/cannon.experiment.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

        var CANNON = this.CANNON;
        var Experiment = new CANNON.Experiment({ camAtts: { x: -5, y: 20, z: 20, rx:-46, ry:-10, rz:0 } });

        Experiment.addScene( function(){ 
          bouncingBalls(Experiment) 
        });

        Experiment.start();
      });
  });
});

app.controller('3dTestsRollingBallsCtrl', function ($ionicPlatform, $scope, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){

    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/cannon/cannon.min.js',
      'js/libs/Three.js',
      'js/libs/Detector.js',
      'js/cannon/scenes/rollingBalls.js',
      'js/cannon/cannon.experiment.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

        var CANNON = this.CANNON;
        var Experiment = new CANNON.Experiment({ 
          camAtts: { x: 130, y: 67.5, z: 45, rx:-22.5, ry:72.5, rz:0 },
          liAtts: { x: 30, y: 80, z: 30 }
        });

        Experiment.addScene( function(){ 
          rollingBalls(Experiment) 
        });

        Experiment.start();
      });
  });
});

app.controller('3dTestsFunnelCtrl', function ($ionicPlatform, $scope, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){

    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/cannon/cannon.min.js',
      'js/libs/Three.js',
      'js/libs/Detector.js',
      'js/cannon/scenes/funnel.js',
      'js/cannon/cannon.experiment.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

        var CANNON = this.CANNON;
        var Experiment = new CANNON.Experiment({ 
          camAtts: { x: 0, y: 50, z: 100, rx:-25, ry:0, rz:0 },
          liAtts: { x: 30, y: 80, z: 30 }
        });

        Experiment.addScene( function(){ 
          funnel(Experiment) 
        });

        Experiment.start();
      });
  });
});