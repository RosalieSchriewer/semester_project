"use strict";
import * as THREE from '../three.js-master/src/Three.js';
import * as dat from "../three.js-master/build/dat.gui.module.js";
//import { GLTFLoader } from "../three.js-master/build/GLTFLoader.js";
import { TCharacter } from './Character.js';
import { TCharacterOptions } from './characterOptions.js';


export function TinitialiseScene(anAvatar) {

    let scene, camera, renderer, cubeMaterial, cube, model, modelMaterial, eyeMaterial, hairMaterial, skinMaterial;

    scene = new THREE.Scene();


    //---------------gradient Background & color -----------------------

    const hexValue = "ffffff";
    const colorOfCube = "#" + hexValue;

    let topColor = new THREE.Color(0xA8D1DF);
    let bottomColor = new THREE.Color(0x294A5E);
    const gradientTexture = new THREE.CanvasTexture(createGradientBackground(topColor, bottomColor));
    scene.background = gradientTexture;

    //----------------scene objects----------------------


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;
    camera.position.y = -3;
   
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    eyeMaterial = new THREE.MeshBasicMaterial({ color: colorOfCube });
    hairMaterial = new THREE.MeshBasicMaterial({ color: colorOfCube });
    skinMaterial = new THREE.MeshBasicMaterial({ color: colorOfCube });
    //cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1), cubeMaterial);
    //cube.position.set(0, 0, 0);
    //scene.add(cube);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', windowResized);

    //-----------------character-------------------------
    const character = new TCharacter(scene);
    const characterOptions = new TCharacterOptions(scene)    
    scene.add(character, characterOptions);

    //-------------functions-------------------------------

    function addControls() {
        const gui = new dat.GUI();
        gui.domElement.id = "colorPickers";

        const colorChanger = { color: eyeMaterial.color.getHex() };

        gui.addColor(colorChanger, 'color').name("Eye color").onChange(function (color) {
            eyeMaterial.color.set(color);
            character.setIrisColor(color);
            // Set the color of the loaded model's material to the same color
            if (modelMaterial) {
                modelMaterial.color.set(color);
            }
        });
        const HairColorChanger = { color: hairMaterial.color.getHex() };

        gui.addColor(HairColorChanger, 'color').name("Hair color").onChange(function (color) {
            hairMaterial.color.set(color);
            character.setHairColor(color);
            // Set the color of the loaded model's material to the same color
            if (modelMaterial) {
                modelMaterial.color.set(color);
            }
        });
        const SkinColorChanger = { color: skinMaterial.color.getHex() };

        gui.addColor(SkinColorChanger, 'color').name("Skin color").onChange(function (color) {
            skinMaterial.color.set(color);
            character.setSkinColor(color);
            // Set the color of the loaded model's material to the same color
            if (modelMaterial) {
                modelMaterial.color.set(color);
            }
        });
    }
    

    addControls();
 

 


    function render() {
        requestAnimationFrame(render);

      /*   cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
 */
        renderer.render(scene, camera);
    }

    function windowResized() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function createGradientBackground(topColor, bottomColor) {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, topColor.getStyle());
        gradient.addColorStop(1, bottomColor.getStyle());

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return canvas;
    }
    render();
}
