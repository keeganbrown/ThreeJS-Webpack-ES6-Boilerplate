import * as THREE from 'three';

import Material from './material';

import Config from '../../data/config';

// This helper class can be used to create and then place geometry in the scene
export default class Geometry {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.geo = null;
    this.options = options;
  }

  make(type) {
    if(type === 'plane') {
      return (width, height, widthSegments = 1, heightSegments = 1) => {
        this.geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
        for (let prop in this.options) {
          this.geo[prop] = this.options[prop];
        }
      };
    }

    if(type === 'sphere') {
      return (radius, widthSegments = 32, heightSegments = 32) => {
        this.geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      };
    }
  }

  place(position, rotation, color = 0xeeeeee) {
    const material = new Material(color).standard;
    const mesh = new THREE.Mesh(this.geo, material);

    // Use ES6 spread to set position and rotation from passed in array
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);

    if(Config.shadow.enabled) {
      mesh.receiveShadow = true;
    }

    this.scene.add(mesh);
  }
}
