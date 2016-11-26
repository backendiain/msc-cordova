function createPrism(vertices, offset){

  /* By default we just create a triangular prism */
  if(typeof vertices === 'undefined'){
          var vertices = [new CANNON.Vec3(0,0,0), //0
                       new CANNON.Vec3(60,0,0), //1
                       new CANNON.Vec3(0,30,0), //2
                       new CANNON.Vec3(0,0,40), //3
                       new CANNON.Vec3(60,0,40), //4
                       new CANNON.Vec3(0,30,40)]; //5
  }

  if(typeof offset === 'undefined') var offset = -0.35;

  for(var i=0; i<vertices.length; i++){
      var v = vertices[i];
      v.x += offset;
      v.y += offset;
      v.z += offset;
  }

  return new CANNON.ConvexPolyhedron(vertices,
                                      [
                                                  [0,2,1], // face pointing -x
                                                  [0,3,5,2], // face pointing -y
                                                  [3,4,5], // face pointing z+
                                                  [2,5,4,1] // face pointing +y
                                      ]);
}

function rollingBalls(Experiment){

  var exp = Experiment;

  world = exp.getWorld();
  world.gravity.set(0, -10, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  /* Time for some materialism! */
  var groundMaterial = new CANNON.Material();

  // ground plane
  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.Body({ 
    mass: 0,
    material: groundMaterial,
    shape: groundShape,
    position: {x:0, y:0, z:0}
  });
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2); // Sets it the right way up!

  world.addBody(groundBody);
  exp.addVisual(groundBody);

  var spheres_arr = [], counter = 1, loop = 0, x = -3, y = 5, z = -3;

  /* Let's make our ramp with a triangular prism! */
  var prism_mat = new CANNON.Material();
  var prism_shape = createPrism();
  var prism_body = new CANNON.Body({ 
    mass: 0,
    position: { x:-30, y:0, z:-15 },
    shape: prism_shape,
    material: prism_mat
  });

  world.addBody(prism_body);
  exp.addVisual(prism_body);

  var step_x = 27.5, step_y = 0, step_z = 5;

  // Let's make our stairs!
  for(var i = 0; i < 12; i++){
    step_x = i === 0 ? 27.5 : step_x - 5;
    step_y = i === 0 ? 0 : step_y + 2.5;

    var step_shape = new CANNON.Box( new CANNON.Vec3(2.5, 2.5, 20) );
    var step_body = new CANNON.Body({
      mass: 0,
      shape: step_shape,
      position: {x: step_x, y: step_y, z: 5}
    });

    world.addBody(step_body);
    exp.addVisual(step_body);
  }

  /* Add our spheres! */
  var sphere_mat = new CANNON.Material();
  var sphere_shape = new CANNON.Sphere(1);
  var sphere = new CANNON.Body({
    mass: 1,
    shape: sphere_shape,
    position: {x: 20, y: 60, z:0 },
    material: sphere_mat,
    velocity: {x:0, y:0, z:5},
    angularVelocity: {x: 0, y:0, z:50}
  });

  world.addBody(sphere);
  exp.addVisual(sphere);

  var sphere_to_prism = new CANNON.ContactMaterial(prism_mat, sphere_mat, { friction: 0.1, restitution:0.8 });
  world.addContactMaterial(sphere_to_prism);
};