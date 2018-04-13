// This object contains the state of the app
export default {
  isDev: false,
  isShowingStats: false,
  isLoaded: false,
  isTweening: false,
  isRotating: true,
  isMouseMoving: false,
  isMouseOver: false,
  maxAnisotropy: 1,
  dpr: 1,
  // easing: TWEEN.Easing.Quadratic.InOut,
  duration: 500,
  model: {
    path: './assets/models/Teapot.json',
    scale: 20
  },
  texture: {
    path: './assets/textures/',
    imageFiles: [
      {name: 'UV', image: 'UV_Grid_Sm.jpg'}
    ]
  },
  mesh: {
    enableHelper: false,
    wireframe: false,
    translucent: false,
    material: {
      color: 0xffffff,
      emissive: 0xffffff
    }
  },
  fog: {
    color: 0xffffff,
    near: 0.0008
  },
  camera: {
    fov: 40,
    near: 2,
    far: 500,
    aspect: 1,
    posX: 0,
    posY: 0,
    posZ: 300
  },
  controls: {
    autoRotate: false,
    autoRotateSpeed: -0.5,
    rotateSpeed: 0.5,
    zoomSpeed: 0.8,
    minDistance: 200,
    maxDistance: 600,
    minPolarAngle: Math.PI / 5,
    maxPolarAngle: Math.PI / 2,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    enableDamping: true,
    dampingFactor: 0.5,
    enableZoom: false,
    target: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  shadow: {
    enabled: true,
    helperEnabled: false,
    bias: 0,
    mapWidth: 2048,
    mapHeight: 2048,
    near: 250,
    far: 400,
    top: 100,
    right: 100,
    bottom: -100,
    left: -100
  },
  ambientLight: {
    enabled: false,
    color: 0x5487c7
  },
  directionalLight: {
    enabled: true,
    color: 0x5487c7,
    intensity: .4,
    x: 0,
    y: -580,
    z: 350
  },
  pointLight: {
    enabled: true,
    color: 0x5487c7,
    intensity: 5.94,
    distance: 355,
    x: 0,
    y: 100,
    z: 150
  },
  hemiLight: {
    enabled: false,
    color: 0x5487c7,
    groundColor: 0xffffff,
    intensity: 90.55,
    x: 0,
    y: 0,
    z: 0
  }
};
