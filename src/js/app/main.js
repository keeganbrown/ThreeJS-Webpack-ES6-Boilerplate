// Global imports -
import * as THREE from 'three';

// Local imports -
// Components
import Renderer from './components/renderer';
import Camera from './components/camera';
import Light from './components/light';
import Controls from './components/controls';

// Helpers
import Geometry from './helpers/geometry';
// import Stats from './helpers/stats';

// Managers
// import Interaction from './managers/interaction';
// import DatGUI from './managers/datGUI';

// data
import Config from './../data/config';
// -- End of imports

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Main {
  constructor(container) {
    // Set container property to container element
    this.container = container;

    // Start Three clock
    this.clock = new THREE.Clock();

    // Main scene creation
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

    // Get Device Pixel Ratio first for retina
    if(window.devicePixelRatio) {
      Config.dpr = window.devicePixelRatio;
    }

    // Main renderer constructor
    this.renderer = new Renderer(this.scene, container);

    // Components instantiations
    this.camera = new Camera(this.renderer.threeRenderer);
    // this.controls = new Controls(this.camera.threeCamera, container);
    this.light = new Light(this.scene);

    // Create and place lights in scene
    const lights = ['ambient', 'directional', 'point', 'hemi'];
    lights.forEach((light) => this.light.place(light));

    // Create and place geo in scene
    this.geometry = new Geometry(this.scene, {dynamic: true});
    this.geometry.make('plane')(1500, 1500, 100, 100);
    this.geometry.place([0, -500, 0], [0, 0, 0], 0xffffff);

    this.addRockyGeometry(this.geometry.geo);
    this.container.querySelector('#loading').style.display = 'none';

    // Start render which does not wait for model fully loaded
    this.render();
    console.log(this.camera);
    console.log(this.light);
  }

  randZeroBased(dist) {
    return Math.floor((Math.random() * dist) - (dist/2));
  }

  clamp(val, dist = 30) {
    return Math.min(Math.max(val, -dist), dist);
  }

  addRockyGeometry(geo) {
    let shift = 8;
    let shiftz = 5;
    let lastz = 0;
    let lastx = 0;
    let lasty = 0;
    geo.vertices.forEach((v) => {
      let newx = this.randZeroBased(shift);
      let newy = this.randZeroBased(shift);
      v.z = this.clamp(this.randZeroBased(shiftz) + lastz);
      v.x = v.x + this.clamp(this.randZeroBased(shift) + lastx);
      v.y = v.y + this.clamp(this.randZeroBased(shift) + lasty);
      lastz = v.z;
      lastx = newx;
      lasty = newy;
    })
  }

  render() {
    this.camera.threeCamera.position.y = -(window.scrollY / 2) + Config.camera.posY;
    this.light.pointLight.position.y = -(window.scrollY / 2) + Config.pointLight.y;
    //this.camera.position.y = window.scrollY;

    // Call render function and pass in created scene and camera
    this.renderer.render(this.scene, this.camera.threeCamera);
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
  }
}
