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
      'js/cannon/scenes/testSphereScene.js',
      'js/cannon/cannon.experiment.js',
      'js/libs/Three.js',
      'js/libs/Detector.js',
      'js/libs/TrackballControls.js'
    ];

    lazyScriptLoaderService.script(deps).then( function(){
      $scope.CANNON_V = this.CANNON.version;

        var CANNON = this.CANNON;
        var Experiment = new CANNON.Experiment();

        Experiment.addScene( function(){
          var exp = Experiment;

          world = exp.getWorld();
          world.gravity.set(0, -10, 0);
          world.broadphase = new CANNON.NaiveBroadphase();
          world.solver.iterations = 10;

          // ground plane
          var groundMaterial = new CANNON.Material();
          var groundShape = new CANNON.Plane();
          var groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
          groundBody.addShape(groundShape);
          groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
          groundBody.position.set(0,-60,0);

          world.addBody(groundBody);
          exp.addVisual(groundBody);

          var mat1 = new CANNON.Material();
          shape = new CANNON.Box(new CANNON.Vec3(10,10,10));
          body = new CANNON.Body({
            mass: 0,
            material: mat1
          });
          body.position.set(0, -30, 0);

          body.addShape(shape);
          world.addBody(body);
          exp.addVisual(body);

          shape2 = new CANNON.Box(new CANNON.Vec3(10,10,10));
          body2 = new CANNON.Body({
            mass: 1,
            material: mat1
          });
          body2.position.set(0, 21, 0);

          body2.addShape(shape2);
          world.addBody(body2);
          exp.addVisual(body2);

            var mat1_ground = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 1, restitution: 0.0 });
            var mat1_mat1 = new CANNON.ContactMaterial(mat1, mat1, { friction: 1, restitution: 0.0 });

            world.addContactMaterial(mat1_ground);

        });

        Experiment.start();

      });
  });
});
