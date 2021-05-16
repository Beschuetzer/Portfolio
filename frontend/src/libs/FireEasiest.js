var camera, scene, renderer;
		var mesh;
		var clock, controller, fire;

		init();

		function init() {

				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
				camera.position.z = 2;

				scene = new THREE.Scene();

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				var loader = new THREE.TextureLoader();
				loader.crossOrigin = '';

				var fireTex = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/212131/Fire.png");

				var wireframeMat = new THREE.MeshBasicMaterial({
						color : new THREE.Color(0xffffff),
						wireframe : true
				});

				fire = new THREE.Fire(fireTex);

				var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
				fire.add(wireframe);
				wireframe.visible = true;
				wireframe.visible = false;
				
				console.log(fire);
				fire.position.set(0, 0, 0);
				fire.position.set(0, 0.25, 1.3);
				scene.add(fire);

				clock = new THREE.Clock();

				window.addEventListener( 'resize', onWindowResize, false );

		}

		function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

		}

		(function loop() {
				requestAnimationFrame(loop);

				var delta = clock.getDelta();

				//var t = clock.elapsedTime * controller.speed;
				var t = clock.elapsedTime;
				fire.update(t);
				
				renderer.render(scene, camera);
		})();