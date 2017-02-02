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

app.controller('homeCtrl', function ($scope, $ionicPlatform) {
  $ionicPlatform.ready( function(){
  });
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
      'js/cannon/scenes/bouncingBalls.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

        var CANNON = window.CANNON;
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
      'js/cannon/scenes/rollingBalls.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

        var CANNON = window.CANNON;
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

app.controller('3dTestsGeneratedBallsCtrl', function ($ionicPlatform, $scope, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){

    /* Our Javascript dependencies that we need for this view! NOTE: "cannon.experiment.js" merged into "cannon.min.js" */
    var deps = [
      'js/cannon/cannon.min.js',
      'js/libs/Three.js',
      'js/libs/Detector.js',
      'js/cannon/scenes/container-generated-balls.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){

      var CANNON = window.CANNON;
      var Experiment = new CANNON.Experiment({ 
        camAtts: { x: 1, y: 4, z: 25, rx:0, ry:0, rz:0 },
        liAtts: { x: 30, y: 80, z: 30 }
      });

      Experiment.addScene( function(){ 
        generatedBalls(Experiment);
      });

      Experiment.start();
    });
  });
});

app.controller('3dClothTestCtrl', function ($ionicPlatform, $scope, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){
    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/cannon/cannon.min.js',
      'js/libs/Three.js',
      'js/libs/Detector.js',
      'js/cannon/scenes/cloth.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){
      initCannon();
      initThree();
      animate();
    });
  });
});

app.controller('3dBabylonTestCtrl', function ($ionicPlatform, $scope, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){
    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/babylon.custom.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){
      function createScene(){

        var scene = new BABYLON.Scene(eng);
        
        var camera = new BABYLON.ArcRotateCamera('camera1', 0,0.8,100 ,BABYLON.Vector3.Zero(), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        /* Lights */
        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);

        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("../img/sunflower.jpg", scene);

        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../img/sunflower.jpg", 200, 200, 500, 0, 10, scene, false);
        ground.rotation
        ground.material = groundMaterial;

        return scene;
      }

      var canvas = document.getElementById('canvas');
      var eng = new BABYLON.Engine(canvas, true);

      var scene = createScene();

      eng.runRenderLoop( function(){
        scene.render();
      });

      window.addEventListener('resize', function(){
        eng.resize();
      });
    });
  });
});

app.controller('cordovaTriggerPerformanceTestCtrl', function ($ionicPlatform, $window, $scope, lazyScriptLoaderService, cordovaTriggerTestService){
  $ionicPlatform.ready( function(){

    /* 
    * We need to have a build running for our cordova plugins to actually work.
    * For instance, to debug our JavaScript interface we would use "ionic build browser && ionic run browser" in the cli
    * Regardless, we still need to make sure our plugin is actually instantiated before we bother doing anything else!
    */

    if(typeof cordova.plugins.cordovaPluginTriggerBenchmark === 'object'){
      $scope.result = '0.00ms';

      /* Let's store this as a $scope variable so we can access the methods via ng-click directives */
      $scope.seq = function(total, len){
        //cordovaTriggerTestService.seq(total, len);
        
        cordovaTriggerTestService.seq(total, len).then( 
          function (result){
            console.log('Sequential result: ' + result);
            $scope.result = result + 'ms';
          },
          function (reject){
            console.log(reject);
        });
        
      }

      $scope.con = function(total, len){
        cordovaTriggerTestService.con(total, len).then( 
          function (result){
            console.log('Consequential result: ' + result);
            $scope.result = result + 'ms';
          },
          function (reject){
            console.log(reject);
        });
      }
    }
  });
});

app.controller('wthrTestCtrl', function ($ionicPlatform, $window, $scope, lazyScriptLoaderService, wthrService){
  $ionicPlatform.ready( function(){
    var pos;

    wthrService.getCurrentPosition().then( function (data) {

      /* If these co-ordinates are in Scotland I can already tell you it's raining */
      $scope.weather;
      pos = data;

      wthrService.getWeather(pos, '$http').then( function(response){
        console.log(response);
        /* Output our weather */
        $scope.weather = response;
        $scope.weather.date = response.dataDate;
        $scope.weather.temp = response.temp;
        $scope.weather.weather_type = response.weather_type;
        $scope.weather.hum = response.hum;
        $scope.weather.wind = response.wind;

        /* Output total time taken */
      });

    });
  });
});

app.controller('iTunesSearchTestCtrl', function ($ionicPlatform, $window, $scope, iTunesSearchService, $http){
  $ionicPlatform.ready( function(){
    /*
      $http.get('/search?term=jim+morrison&country=ca').then(function(data) {
        console.log(data)
      })
    */
    //http://itunes.apple.com/search?term=jim
    iTunesSearchService.getResults('/search?term=jim+morrison&country=ca', '$http').then( function (response){
      console.log('controller', response);
    });
  });
});

app.controller('videoTestCtrl', function ($ionicPlatform, $window, $scope, lazyScriptLoaderService){
  $ionicPlatform.ready( function(){
    /* Our Javascript dependencies that we need for this view! */
    var deps = [
      'js/video.min.js'
      ];

    lazyScriptLoaderService.script(deps).then( function(){
      videojs("video-stress-test-vid").ready( function(){
        var player = this;

        player.on("play", function(){
          // Create our timestamp for our start point of our stress test
          var t;

          // Start our video
          player.play();
          alert('We are playing!');
        });

        player.on('ended', function() {

          // Register the end value of our timestamp for the end point of our stress test

          alert('video is done!');
        });

      });
    });
  });
});