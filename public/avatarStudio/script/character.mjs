"use strict";
import { GLTFLoader } from "../three.js-master/build/GLTFLoader.js";
import * as THREE from "../three.js-master/src/Three.js";

const bodyParts = {
  head: null,
  neck: null,
  arm: null,
  chest: null,
  lowerBody: null,
  leg: null,
};

export class TCharacter extends THREE.Object3D {
  constructor(scene) {
    super(); //class constructor

    const loader = new GLTFLoader();

    loader.load("avatarStudio/media/Boy-smaller-file.gltf", (gltfModel) => {
      gltfModel.scene.position.set(0, 0, 0);

      this.add(gltfModel.scene);

      const lights = gltfModel.scene.children.filter((child) => child.isLight);

      const eyebrows = gltfModel.scene.children.find(
        (child) => child.name === "eyebrow"
      );
      if (eyebrows) {
        // Remove the eyebrows from their parent
        gltfModel.scene.remove(eyebrows);
      }
      // Set the intensity of each light
      lights.forEach((light) => {
        light.intensity = 1;
      });
      this.setIrisColor = function (aColor) {
        const eyeMaterial = this.getObjectByName("eye_left");
        if (eyeMaterial) {
          eyeMaterial.children[2].material.color.set(aColor);
        }
      };
      this.userEyeColorApply = function () {
        const eyeMaterial = this.getObjectByName("eye_left");
        let userEyeColor = localStorage.getItem("userEyeColor");
        eyeMaterial.children[2].material.color.set("#" + userEyeColor);
      };

      this.userEyeColorApply();

      const hairMaterial = gltfModel.scene.children.find(
        (child) => child.name === "hair_joined"
      );
      console.log(hairMaterial);
      this.setHairColor = function (aColor) {
        hairMaterial.material.color.set(aColor); // Set a default color for testing
      };
      this.userHairColorApply = function () {
        const hairMaterial = this.getObjectByName("hair_joined");
        let userHairColor = localStorage.getItem("userHairColor");
        hairMaterial.material.color.set("#" + userHairColor);
      };
      this.userHairColorApply();

      const skinMaterial = gltfModel.scene.children.find(
        (child) => child.name === "BSurfaceMesh002"
      );
      const earMaterial = gltfModel.scene.children.find(
        (child) => child.name === "EARS"
      );
      console.log(skinMaterial);

      // Define setIrisColor as a method of the class
      this.setSkinColor = function (aColor) {
        skinMaterial.material.color.set(aColor);
        earMaterial.material.color.set(aColor);
      };
      this.userSkinColorApply = function () {
        const skinMaterial = this.getObjectByName("BSurfaceMesh002");
        const earMaterial = this.getObjectByName("EARS");
        let userSkinColor = localStorage.getItem("userSkinColor");
        skinMaterial.material.color.set("#" + userSkinColor);
        earMaterial.material.color.set("#" + userSkinColor);
      };
      this.userSkinColorApply();
    });
  }
}
