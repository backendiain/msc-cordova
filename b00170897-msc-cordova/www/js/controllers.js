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

app.controller('3dTestsBouncingCtrl', function ($ionicPlatform, $scope, goat, json, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){

    $scope.goat = goat.value;
    $scope.json = json.data._data.string;

    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/cannon/cannon.min.js',,
      'js/libs/Three.js',
      'js/cannon/scenes/testSphereScene.js',
      'js/cannon/cannon.experiment.js',
      'js/libs/Detector.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

        var CANNON = this.CANNON;
        var Experiment = new CANNON.Experiment({ camAtts: { x: 0, y: 5, z: 50, rx:0, ry:0, rz:0 } });

        Experiment.addScene( function(){ 
          testSphereWorld(Experiment) 
        });

        Experiment.start();
      });
  });
});
