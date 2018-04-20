/* global __ENV__  */
import Config from './data/config';
import Detector from './utils/detector';
// import 'three/examples/js/postprocessing/EffectComposer';
// import 'three/examples/js/postprocessing/ShaderPass';
// import 'three/examples/js/postprocessing/RenderPass';
// import 'three/examples/js/postprocessing/SAOPass';
// import 'three/examples/js/shaders/CopyShader';
// import 'three/examples/js/shaders/SAOShader';
// import 'three/examples/js/shaders/DepthLimitedBlurShader';
// import 'three/examples/js/shaders/UnpackDepthRGBAShader';
// import './utils/bloomBlendPass';
import Main from './app/main';

// Check environment and set the Config helper
if(__ENV__ === 'dev') {
  console.log('----- RUNNING IN DEV ENVIRONMENT! -----');
  Config.isDev = true;
}

function init() {
  // Check for webGL capabilities
  if(!Detector.webgl) {
    // do nothing
  } else {
    const theFirstChild = document.body.firstChild;
    const container = document.createElement("div");
    container.id = 'backgroundSpace';
    document.body.insertBefore(container, theFirstChild);
    new Main(container);
  }
}

init();
