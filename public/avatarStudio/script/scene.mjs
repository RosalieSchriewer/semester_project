"use strict";
import * as THREE from "../three.js-master/src/Three.js";
import * as dat from "../three.js-master/build/dat.gui.module.js";
import { TCharacter } from "./character.mjs";
import { TCharacterOptions } from "./characterOptions.mjs";
import { isSharedAvatar } from "../../modules/sharedFunctions.mjs";

export let avatarData = {
  skinColor: null,
  hairColor: null,
  eyeColor: null,
  eyebrowType: null,
};

export function TinitialiseScene(anAvatar) {
  let scene,
    camera,
    renderer,
    modelMaterial,
    eyeMaterial,
    hairMaterial,
    skinMaterial;

  scene = new THREE.Scene();

  scene.background = new THREE.Color(0x294a5e);

  //----------------scene objects----------------------

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 10;
  camera.position.y = -3;

  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  //-----------------character-------------------------
  let character = new TCharacter(scene);
  const characterOptions = new TCharacterOptions(scene);
  scene.add(character, characterOptions);

  eyeMaterial = new THREE.MeshBasicMaterial();
  const userEyeColor = localStorage.getItem("userEyeColor");
  eyeMaterial.color.set("#" + userEyeColor);
  avatarData.eyeColor = userEyeColor;

  hairMaterial = new THREE.MeshBasicMaterial();
  const userHairColor = localStorage.getItem("userHairColor");
  hairMaterial.color.set("#" + userHairColor);
  avatarData.hairColor = userHairColor;

  skinMaterial = new THREE.MeshBasicMaterial();
  const userSkinColor = localStorage.getItem("userSkinColor");
  skinMaterial.color.set("#" + userSkinColor);
  avatarData.skinColor = userSkinColor;

  const userEyebrowType = localStorage.getItem("userEyebrowType");
  avatarData.eyebrowType = userEyebrowType;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", windowResized);

  //-------------functions-------------------------------

  function addControls() {
    const gui = new dat.GUI();
    gui.domElement.id = "colorPickers";

    const colorChanger = { color: eyeMaterial.color.getHex() };

    gui
      .addColor(colorChanger, "color")
      .name("Eye color")
      .onChange(function (color) {
        eyeMaterial.color.set(color);
        character.setIrisColor(color);

        avatarData.eyeColor = eyeMaterial.color.getHex().toString(16);

        // Set the color of the loaded model's material to the same color
        if (modelMaterial) {
          modelMaterial.color.set(color);
        }
      });

    const HairColorChanger = { color: hairMaterial.color.getHex() };

    gui
      .addColor(HairColorChanger, "color")
      .name("Hair color")
      .onChange(function (color) {
        hairMaterial.color.set(color);
        character.setHairColor(color);
        avatarData.hairColor = hairMaterial.color.getHex().toString(16);

        // Set the color of the loaded model's material to the same color
        if (modelMaterial) {
          modelMaterial.color.set(color);
        }
      });
    const SkinColorChanger = { color: skinMaterial.color.getHex() };

    gui
      .addColor(SkinColorChanger, "color")
      .name("Skin color")
      .onChange(function (color) {
        skinMaterial.color.set(color);
        character.setSkinColor(color);
        avatarData.skinColor = skinMaterial.color.getHex().toString(16);

        // Set the color of the loaded model's material to the same color
        if (modelMaterial) {
          modelMaterial.color.set(color);
        }
      });
  }

  isSharedAvatar();

  if (isSharedAvatar() === false) {
    addControls();
  }

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }

  function windowResized() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render();
}
