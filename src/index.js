import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const scene = new THREE.Scene();
const video = document.querySelector("video");
video.muted = true;
video.play();

const texture = new THREE.VideoTexture(video);
texture.encoding = THREE.sRGBEncoding;
renderer.outputEncoding = THREE.sRGBEncoding;

scene.background = texture;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshBasicMaterial({ map: texture })
);
scene.add(plane);
plane.position.set(1.5, 0, -3);

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

requestAnimationFrame(render);
