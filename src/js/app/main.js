// Global imports -
import * as THREE from 'three';

// Local imports -
// Components
import Renderer from './components/renderer';
import Camera from './components/camera';
import Light from './components/light';

// Helpers
import Geometry from './helpers/geometry';

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
    this.geometry.make('plane')(1500, 1500, 70, 90);
    // this.geometry.place([0, -500, 0], [0, 0, 0], 0x5487c7);
    this.geometry.place([0, -500, 0], [0, 0, 0], 0x283e5a);

    this.addRockyGeometry(this.geometry.geo);

    // Start render which does not wait for model fully loaded
    this.render();
    //this.addBloomPass();
    //this.addSAOPass();
    this.mouseX = 500;
    this.mouseY = 500;

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - (this.renderer.threeRenderer.domElement.width / 2);
      this.mouseY = event.clientY - (this.renderer.threeRenderer.domElement.height / 2);
    });
  }

  randZeroBased(dist) {
    return Math.floor((Math.random() * dist) - (dist/2));
  }

  clamp(val, dist = 30) {
    return Math.min(Math.max(val, -dist), dist);
  }

  // addBloomPass() {
  //   this.composer = new THREE.EffectComposer(this.renderer.threeRenderer);
  //   this.composer.addPass(new THREE.RenderPass(this.scene, this.camera.threeCamera));

  //   var bloomPass = new THREE.BloomBlendPass(
  //     1.0, // the amount of blur
  //     1.9, // interpolation(0.0 ~ 1.0) original image and bloomed image
  //     new THREE.Vector2(1024, 1024) // image resolution
  //   );
  //   bloomPass.renderToScreen = true;
  //   this.composer.addPass(bloomPass);
  // }

  // addSAOPass() {
  //   this.composer = new THREE.EffectComposer(this.renderer.threeRenderer);
  //   this.composer.addPass(new THREE.RenderPass(this.scene, this.camera.threeCamera));

  //   var saoPass = new THREE.SAOPass( this.scene, this.camera.threeCamera, false, true );
  //   var defaultParams = {
  //     output: 0,
  //     saoBias: 0.5,
  //     saoIntensity: 0.25,
  //     saoScale: 1,
  //     saoKernelRadius: 1000,
  //     saoMinResolution: 0,
  //     saoBlur: true,
  //     saoBlurRadius: 12,
  //     saoBlurStdDev: 6,
  //     saoBlurDepthCutoff: 0.1
  //   }
  //   saoPass.renderToScreen = true;
  //   saoPass.params = {
  //     ...saoPass.params,
  //     ...defaultParams
  //   }

  //   this.composer.addPass( saoPass );
  // }

  addRockyGeometry(geo) {
    const shiftxy = 10;
    const shiftz = 10;
    // let lastz = 0;
    let lastx = 0;
    let lasty = 0;
    geo.vertices.forEach((v) => {
      const newx = this.randZeroBased(shiftxy);
      const newy = this.randZeroBased(shiftxy);
      v.z = this.clamp(this.randZeroBased(shiftz)) - (Math.abs(v.x) / 2);
      v.x = v.x + this.clamp(this.randZeroBased(shiftxy) + lastx);
      v.y = v.y + this.clamp(this.randZeroBased(shiftxy) + lasty);
      // lastz = v.z;
      lastx = newx;
      lasty = newy;
    })
  }

  render() {

    this.camera.threeCamera.position.y = -(window.scrollY / 8) + Config.camera.posY;
    this.light.pointLight.position.y = -(window.scrollY / 7) + Config.pointLight.y - (this.mouseY / 5);
    this.light.pointLight.position.x = Config.pointLight.x + (this.mouseX / 10);
    this.light.hemiLight.position.y = -(window.scrollY / 7) + Config.pointLight.y - (this.mouseY / 5);

    //this.camera.position.y = window.scrollY;

    // Call render function and pass in created scene and camera

    this.renderer.render(this.scene, this.camera.threeCamera);
    //this.composer && this.composer.render();
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
  }
}
