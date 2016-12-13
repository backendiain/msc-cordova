function createPolygon(vertices, offset, facesVerts){

  /* By default we just create a triangular prism */
  if(typeof vertices === 'undefined'){
          var vertices = [
                      new CANNON.Vec3(-5,0,0), //0
                      new CANNON.Vec3(70,0,0), //1
                      new CANNON.Vec3(70,5,0), //2
                      new CANNON.Vec3(-5,40,0), //3
                      new CANNON.Vec3(70,0,-5), //4
                      new CANNON.Vec3(70,5,-5), //5
                      new CANNON.Vec3(-5,40,-5), // 6
                      new CANNON.Vec3(-5,0,-5) // 7
                    ] 
  }

  if(typeof offset === 'undefined') var offset = -0.35;

  for(var i=0; i<vertices.length; i++){
      var v = vertices[i];
      v.x += offset;
      v.y += offset;
      v.z += offset;
  }

  if(typeof facesVerts === 'undefined') var facesVerts = [
                                                  [1, 2, 3, 0], // face pointing +z
                                                  [3, 2, 5, 6], // face pointing +y
                                                  [6, 5, 4, 7], // face pointing -z,
                                                  [5, 2, 1, 4], // face pointing +x
                                                  [6, 3, 0, 7], // face pointing -x
                                                  [7, 0, 1, 4] // face pointing -y
                                        ];

  return new CANNON.ConvexPolyhedron(vertices, facesVerts);
}

function generatedBalls(Experiment){

    var exp = Experiment;

    world = exp.getWorld();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 4;

    /* Time for some materialism! */

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

    /* Do in vase shape \_/ */
    var vaseMaterial = new CANNON.Material();

    var vertices = [
                    new CANNON.Vec3(-2,0,-2), // 0
                    new CANNON.Vec3(2,0,-2), //1,
                    new CANNON.Vec3(5,3,-5), //2
                    new CANNON.Vec3(-5,3,-5), //3
                    new CANNON.Vec3(-2,0,2), //4
                    new CANNON.Vec3(2,0,2), //5
                    new CANNON.Vec3(5,3,5), //6
                    new CANNON.Vec3(-5,3,5) //7
                ];

    var vertFaces = [
                        [3,0,1,2], // normal points +z
                        [1,5,6,2], // normal points -x
                        [4,0,3,7], // normal points +x
                        [5,4,7,6] // normal points -z
                        /*[1,0,4,5]*/ // normal points +y
                    ];

    var vaseShape = createPolygon(vertices, 0, vertFaces);
    var vaseBody = new CANNON.Body({
        shape: vaseShape,
        mass: 0,
        material: vaseMaterial,
        position: {x:1, y:0, z:1}
    });

    world.addBody(vaseBody);
    //exp.addVisual(vaseBody);

    /* Generate our sphere fountain! */
    var bodies = [];
    var i = 0;
    var size = 0.5;
    var sphere_mat = new CANNON.Material();

    interval = setInterval(function(){
        // Sphere
        i++;
        var sphereShape = new CANNON.Sphere(size);
        var b1 = new CANNON.Body({
            material: sphere_mat,
            mass: 1,
            position: new CANNON.Vec3(
                2*size*Math.sin(i),
                3*size*Math.tan(i) + 12,
                7*2*size - (2/size) 
            )
        });
        b1.addShape(sphereShape);
        world.addBody(b1);
        exp.addVisual(b1);
        bodies.push(b1);

        if(bodies.length>120){
            var b = bodies.shift();
            exp.removeVisual(b);
            world.remove(b);
        }
    }, 200);

  /* Material Interactions */
  var sphere_to_ground = new CANNON.ContactMaterial(sphere_mat, groundMaterial, { friction: 0.1, restitution:0.6 }); 
  var sphere_to_sphere;

  world.addContactMaterial(sphere_to_ground);
};