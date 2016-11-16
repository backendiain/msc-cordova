var testSphereWorld = function(Experiment){
	var exp = Experiment;

	world = exp.getWorld();
	world.gravity.set(0,0,0);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 10;
	shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
	mass = 1;
	body = new CANNON.Body({
	mass: 1
	});
	body.addShape(shape);
	body.angularVelocity.set(0,10,0);
	body.angularDamping = 0.5;
	world.addBody(body);
	exp.addVisual(body);
};