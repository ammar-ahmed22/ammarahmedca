import React, { Component } from 'react';
import '../assets/css/robotmodel.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class LightRobot extends Component {
    componentDidMount(){
        let backgroundColor = this.props.bg;
        let foregroundColor = this.props.fg;
        
        (function(){
            //setting global variables
            let scene,
                renderer,
                camera,
                model,
                neck,
                waist,
                rightShoulder,
                leftShoulder,
                leftFore,
                rightFore
            
            
           

            const init = () =>{
                const MODEL_PATH = './assets/models/robot/scene.gltf';

                

                

                //Intializing the scene
                scene = new THREE.Scene();

                scene.background = new THREE.Color(backgroundColor);
                scene.fog = new THREE.Fog(backgroundColor, 60, 100);

                //Initializing the renderer
                renderer = new THREE.WebGLRenderer({ alpha: true});
                renderer.shadowMap.enabled = true;
                renderer.setPixelRatio(window.devicePixelRatio);

                let wrapper = document.querySelector('.wrapper');

                wrapper.appendChild(renderer.domElement);


                //Adding a camera
                camera = new THREE.PerspectiveCamera(
                    50,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    1000
                );

                camera.position.z = 30;
                camera.position.x = 0;
                camera.position.y = -3;

                //Model texture
                const robotMtl = new THREE.MeshPhongMaterial({
                    color: foregroundColor,
                    skinning: true
                })
                
                //Loading the model
                var loader = new GLTFLoader();

                loader.load(
                    MODEL_PATH,
                    gltf => {
                        model = gltf.scene;

                        //Traversing the meshes of the model to access the bones
                        model.traverse(mesh =>{
                            if (mesh.isMesh){
                                mesh.castShadow = true;
                                mesh.receiveShadow = true;
                                mesh.material = robotMtl;
                            }

                           

                            if (mesh.isBone && mesh.name === 'mixamorigNeck_00'){
                                neck = mesh;
                            }
        
                            if (mesh.isBone && mesh.name === 'mixamorigSpine_02'){
                                waist = mesh;
                            }
                            
                            if (mesh.isBone && mesh.name === 'mixamorigLeftShoulder_07'){
                                leftShoulder = mesh;
                            }
        
                            if (mesh.isBone && mesh.name === 'mixamorigRightShoulder_027'){
                                rightShoulder = mesh;
                            }
        
                            if (mesh.isBone && mesh.name === 'mixamorigRightForeArm_029'){
                                rightFore = mesh;
                            }
        
                            if (mesh.isBone && mesh.name === 'mixamorigLeftForeArm_09'){
                                leftFore = mesh;
                            }

                        })

                        const scaleFactor = 7;
                        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                        model.position.y = -21;

                        //Changing T-POSE to Robot pose
                        leftShoulder.rotation.y = THREE.Math.degToRad(-75);
                        rightShoulder.rotation.y = THREE.Math.degToRad(75);

                        leftShoulder.rotation.x = THREE.Math.degToRad(65);
                        rightShoulder.rotation.x = THREE.Math.degToRad(65);

                        leftShoulder.position.y = 22;
                        rightShoulder.position.y = 22;

                        leftShoulder.position.x = 15;
                        rightShoulder.position.x = -15;


                        leftFore.rotation.x = THREE.Math.degToRad(45);
                        rightFore.rotation.x = THREE.Math.degToRad(45);

                        leftFore.rotation.z = THREE.Math.degToRad(45);
                        rightFore.rotation.z = THREE.Math.degToRad(-45);

                        leftFore.rotation.y = THREE.Math.degToRad(-10);
                        rightFore.rotation.y = THREE.Math.degToRad(-10);
                        

                        //Adding the model
                        scene.add(model)
                    },
                    undefined,
                    error =>{
                        console.error(error)
                    }
                )

                //Adding lights
                let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
                hemiLight.position.set(0, 50, 0);

                scene.add(hemiLight);

                let d = 8.25;

                let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
                dirLight.position.set(-8, 12, 8);
                dirLight.castShadow = true;
                dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
                dirLight.shadow.camera.near = 0.1;
                dirLight.shadow.camera.far = 1500;
                dirLight.shadow.camera.left = d * -1;
                dirLight.shadow.camera.right = d;
                dirLight.shadow.camera.top = d;
                dirLight.shadow.camera.bottom = d * -1;

                scene.add(dirLight)

                //Adding the floor
                let floorGeo = new THREE.PlaneGeometry(5000, 5000, 1, 1);
                let floorMat = new THREE.MeshPhongMaterial({
                    color: backgroundColor,
                    shininess: 1000
                })

                let floor = new THREE.Mesh(floorGeo, floorMat);

                floor.rotation.x = -0.5 * Math.PI; // 90 degrees
                floor.receiveShadow = true;
                floor.position.y = -11;

                scene.add(floor);

                //Sphere in background
                let geo = new THREE.SphereGeometry(15, 60, 60);
                let mat = new THREE.MeshBasicMaterial({color: 0x5b00cf});
                let sphere = new THREE.Mesh(geo, mat);

                sphere.position.set(-0.25, -11, -20);

                scene.add(sphere);

            }

            init();

            const resizeRendererToDisplaySize = renderer =>{
                const canvas = renderer.domElement;
                let width = window.innerWidth;
                let height = window.innerHeight;
                let canvasPixelWidth = canvas.width / window.devicePixelRatio;
                let canvasPixelHeight = canvas.height / window.devicePixelRatio;

                const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;

                if (needResize){
                    renderer.setSize(width, height, false);
                }

                return needResize;
            }

            

            const update = () =>{
                if (resizeRendererToDisplaySize(renderer)){
                    const canvas = renderer.domElement;
                    camera.aspect = canvas.clientWidth / canvas.clientHeight;
                    camera.updateProjectionMatrix();
                }

                
                

                renderer.render(scene, camera);
                requestAnimationFrame(update);
            }

            update();

            

            document.addEventListener('mousemove', e=>{
                var mousecoords = getMousePos(e);
                if (neck && waist){
                    
                    moveJoint(mousecoords, neck, 50);
                    moveJoint(mousecoords, waist, 30);
                }
            })
        
            
        
            const getMousePos = (e) => {
                return {x: e.clientX, y: e.clientY};
            }
        
            const moveJoint = (mouse, joint, degreeLimit) => {
                let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
                joint.rotation.y = THREE.Math.degToRad(degrees.x);
                joint.rotation.x = THREE.Math.degToRad(degrees.y);
            }
        
            
        
            const getMouseDegrees = (x, y, degreeLimit) => {
                let dx = 0,
                    dy = 0,
                    xdiff,
                    xPercentage,
                    ydiff,
                    yPercentage;
        
                let w = { x: window.innerWidth, y: window.innerHeight };
        
                // Left (Rotates neck left between 0 and -degreeLimit)
                
                // 1. If cursor is in the left half of screen
                if (x <= w.x / 2) {
                    // 2. Get the difference between middle of screen and cursor position
                    xdiff = w.x / 2 - x;  
                    // 3. Find the percentage of that difference (percentage toward edge of screen)
                    xPercentage = (xdiff / (w.x / 2)) * 100;
                    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
                    dx = ((degreeLimit * xPercentage) / 100) * -1; }
                // Right (Rotates neck right between 0 and degreeLimit)
                if (x >= w.x / 2) {
                    xdiff = x - w.x / 2;
                    xPercentage = (xdiff / (w.x / 2)) * 100;
                    dx = (degreeLimit * xPercentage) / 100;
                }
                // Up (Rotates neck up between 0 and -degreeLimit)
                if (y <= w.y / 2) {
                    ydiff = w.y / 2 - y;
                    yPercentage = (ydiff / (w.y / 2)) * 100;
                    // Note that I cut degreeLimit in half when she looks up
                    dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
                    }
                
                // Down (Rotates neck down between 0 and degreeLimit)
                if (y >= w.y / 2) {
                    ydiff = y - w.y / 2;
                    yPercentage = (ydiff / (w.y / 2)) * 100;
                    dy = (degreeLimit * yPercentage) / 100;
                }
                return { x: dx, y: dy };
            }
            
        })();
    }
    
    render() {
        return (
            <div   ref={ref => (this.mount = ref)}></div>
        );
    }
}

export default LightRobot;
