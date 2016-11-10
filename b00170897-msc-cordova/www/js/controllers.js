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

/*
app.controller('3dTestsCtrl', function ($scope, $ionicSideMenuDelegate, $testObj) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
*/

app.controller('3dTestsCtrl', function ($scope, goat, json, lazyScriptLoaderService){
  $scope.goat = goat.value;
  $scope.json = json.data._data.string;

  /* Our Javascript dependencies that we need for this view! */
  var deps = [
    'js/cannon/cannon.min.js',
    'js/cannon/cannon.demo.js',
    'js/libs/Three.js',
    'js/libs/dat.gui.js',
    'js/libs/Detector.js',
    'js/libs/scenejs.js',
    'js/libs/smoothie.js',
    'js/libs/Stats.js',
    'js/libs/TrackballControls.js'
  ];

  lazyScriptLoaderService.script(deps).then( function(){
    $scope.CANNON_V = this.CANNON.version;

    var CANNON = this.CANNON;


        var demo = new CANNON.Demo();
        var size = 1;
        var height = 5;
        var damping = 0.01;

        demo.addScene("Bounce",function(){

            var world = demo.getWorld();
            world.gravity.set(0,0,-10);
            world.broadphase = new CANNON.NaiveBroadphase();

            // ground plane
            var groundMaterial = new CANNON.Material();
            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
            groundBody.addShape(groundShape);
            world.addBody(groundBody);
            demo.addVisual(groundBody);

            var mass = 10;
            var sphereShape = new CANNON.Sphere(size);

            // Shape on plane
            var mat1 = new CANNON.Material();
            var shapeBody1 = new CANNON.Body({
                mass: mass,
                material: mat1,
                position: new CANNON.Vec3(3*size, size, height)
            });
            shapeBody1.addShape(sphereShape);
            shapeBody1.linearDamping = damping;
            world.addBody(shapeBody1);
            demo.addVisual(shapeBody1);

            var mat2 = new CANNON.Material();
            var shapeBody2 = new CANNON.Body({
                mass: mass,
                material: mat2,
                position: new CANNON.Vec3(0 , size , height)
            });
            shapeBody2.addShape(sphereShape);
            shapeBody2.linearDamping = damping;
            world.addBody(shapeBody2);
            demo.addVisual(shapeBody2);

            var mat3 = new CANNON.Material();
            var shapeBody3 = new CANNON.Body({
                mass: mass,
                material: mat3,
                position: new CANNON.Vec3(-3*size , size , height)
            });
            shapeBody3.addShape(sphereShape);
            shapeBody3.linearDamping = damping;
            world.addBody(shapeBody3);
            demo.addVisual(shapeBody3);

            // Create contact material behaviour
            var mat1_ground = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 0.0, restitution: 0.0 });
            var mat2_ground = new CANNON.ContactMaterial(groundMaterial, mat2, { friction: 0.0, restitution: 0.7 });
            var mat3_ground = new CANNON.ContactMaterial(groundMaterial, mat3, { friction: 0.0, restitution: 0.9 });

            world.addContactMaterial(mat1_ground);
            world.addContactMaterial(mat2_ground);
            world.addContactMaterial(mat3_ground);
        });

      demo.start();
  });
});
