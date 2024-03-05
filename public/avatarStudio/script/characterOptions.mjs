"use strict"
import { GLTFLoader } from "../three.js-master/build/GLTFLoader.js";
import * as THREE from '../three.js-master/src/Three.js';
import { avatarData } from "./scene.mjs";

export class TCharacterOptions extends THREE.Object3D {
    constructor(scene) {
        super(); 
      
        const loader = new GLTFLoader();
        let activeEyebrow = null;
        let eyebrowInt= null;

        const userEyebrowType = localStorage.getItem("userEyebrowType")
        if (userEyebrowType == 1){
            loader.load("avatarstudio/media/eyebrows.gltf", (gltfModel) => {
                gltfModel.scene.position.set(0, 0, 0);
                this.add(gltfModel.scene);
                activeEyebrow = gltfModel.scene;
                
            });
        }else {loader.load("avatarstudio/media/eyebrows-1.gltf", (gltfModel) => {

            
            gltfModel.scene.position.set(0, 0, 0);
            this.add(gltfModel.scene);
            console.log(avatarData);
            activeEyebrow = gltfModel.scene;
        });
    

        }

const loadEyebrowsButton = document.getElementById('loadEyebrowsButton');

        loadEyebrowsButton.addEventListener('click', () => {

            if (activeEyebrow) {
                this.remove(activeEyebrow);
            }

            loader.load("avatarstudio/media/eyebrows.gltf", (gltfModel) => {
                gltfModel.scene.position.set(0, 0, 0);
                this.add(gltfModel.scene);
                eyebrowInt=1
                avatarData.eyebrowType = eyebrowInt
                activeEyebrow = gltfModel.scene;
                
            });
        });
        

 const loadEyebrows2Button = document.getElementById('loadEyebrows2Button');

        loadEyebrows2Button.addEventListener('click', () => {
            loader.load("avatarstudio/media/eyebrows-1.gltf", (gltfModel) => {

                if (activeEyebrow) {
                    this.remove(activeEyebrow);
                }
                
                gltfModel.scene.position.set(0, 0, 0);
                this.add(gltfModel.scene);
                eyebrowInt=2;
                avatarData.eyebrowType = eyebrowInt
                console.log(avatarData);
                activeEyebrow = gltfModel.scene;
            });
        }); 
    }
}
