import React, { useEffect } from 'react';
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Avatar = () => {

    useEffect(() => {

        const canvas = document.querySelector("#canvas")
        const scene = new THREE.Scene()

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const loader = new GLTFLoader()
        loader.load("./assets/models/ammar.glb", (glb) => {
            console.log("GLB loaded:", glb)

            const model = glb.scene
            scene.add(model)

            // model.traverse( mesh => {
            //     if (mesh.isBone){
            //         console.log(mesh)
            //     }
            // })
        }, xhr => {
            console.log((xhr.loaded / xhr.total) * 100, "% loaded")
        }, err => {
            console.log("An error occurred")
            console.log(err)
        })

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(2, 2, 5)
        scene.add(light)


        const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)
        camera.position.set(0, 1, 2)

        scene.add(camera)

        const renderer = new THREE.WebGL1Renderer({
            canvas
        })

        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.gammaOutput = true
        

        const animate = () => {

            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()

    }, [])

    return (
        <canvas id='canvas'>

        </canvas>
    );
}

export default Avatar;
