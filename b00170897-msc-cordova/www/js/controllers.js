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
  $scope.goat = goat.value;
  $scope.json = json.data._data.string;

  /* Our Javascript dependencies that we need for this view! */
  var deps = [
    'js/cannon/cannon.min.js',
    'js/cannon/cannon.experiment.js',
    'js/cannon/scenes/testSphereScene.js',
    'js/libs/Three.js',
    'js/libs/dat.gui.js',
    'js/libs/Detector.js',
    'js/libs/scenejs.js',
    'js/libs/smoothie.js',
    'js/libs/Stats.js'
  ];

  lazyScriptLoaderService.script(deps).then( function(){
    $scope.CANNON_V = this.CANNON.version;

    $ionicPlatform.ready( function(){
      var CANNON = this.CANNON;
      var Experiment = new CANNON.Experiment();

      // This feeds our Experiment class data for its Cannon world but keeps our controllers code tidy
      testSphereWorld(Experiment);
    });
  });
});
