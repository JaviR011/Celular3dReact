import React, { useEffect, useRef} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeDScene = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Crear escena y cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.2);

    // Crear renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0x00000);
    container.appendChild(renderer.domElement);

    // Controles orbitales
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

     // Crear esfera roja
     const sphereGeometry = new THREE.SphereGeometry(0.0045, 32, 32);
     const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x191919 ,transparent: true, opacity: 0.5});
     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
     
     sphere.position.set(0.0239, 0.05, -0.0023);
     scene.add(sphere);
           
    const directionalLight = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight.position.set(0, 0, 10); // Posición de la luz
    directionalLight.castShadow = true; // Habilitar sombras
    
    const directionalLight2 = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight2.position.set(0, 6, 10); // Posición de la luz
    directionalLight2.castShadow = true; // Habilitar sombras
               
    const directionalLight1 = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight1.position.set(0, -6, 10); // Posición de la luz
    directionalLight1.castShadow = true; // Habilitar sombras
               
    const directionalLight3 = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight3.position.set(0, -12, 10); // Posición de la luz
    directionalLight3.castShadow = true; // Habilitar sombras
    
    
    const directionalLight4 = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight4.position.set(0, 12, 10); // Posición de la luz
    directionalLight4.castShadow = true; // Habilitar sombras
               
    const directionalLight5 = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight5.position.set(6, 0, 10); // Posición de la luz
    directionalLight5.castShadow = true; // Habilitar sombras
               
    const directionalLight6 = new THREE.DirectionalLight(0xa8a8a8, 0.5); // Color blanco, intensidad 0.3
    directionalLight6.position.set(-6, 0, 10); // Posición de la luz
    directionalLight6.castShadow = true; // Habilitar sombras
    
    
    camera.add(directionalLight, directionalLight1, directionalLight2 ,directionalLight3 ,directionalLight4 , directionalLight5 , directionalLight6); // Añadir la luz a la cámara
    scene.add(camera); 

    const loader = new GLTFLoader();
    let model;

    loader.load(
      "media/samsung_galaxy_s24_plus.glb",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo:", error);
      }
    );
// Raycaster para detectar cuándo el mouse está sobre la esfera
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let tooltip = document.createElement('div');

tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'rgba(0,0,0,0.75)';
tooltip.style.color = '#FFF';
tooltip.style.padding = '5px 10px';
tooltip.style.borderRadius = '5px';
tooltip.style.visibility = 'hidden';
tooltip.innerText = 'Camara Samsung Galaxy S24 Plus de 64 mega pixeles';
document.body.appendChild(tooltip);
let tooltip1 = document.createElement('div');
tooltip1.style.position = 'absolute';
tooltip1.style.backgroundColor = 'rgba(0,0,0,0.75)';
tooltip1.style.color = '#FFF';
tooltip1.style.padding = '5px 10px';
tooltip1.style.borderRadius = '5px';
tooltip1.style.visibility = 'hidden';
tooltip1.innerText = 'lista desplegable'+ '\n' +
'1. Camara Samsung Galaxy S24 Plus de 64 mega pixeles';
document.body.appendChild(tooltip1);
const onDocumentMouseMove = (event) => {
  
  event.preventDefault();

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  tooltip.style.left = `${event.clientX + window.scrollX + 10}px`;
  tooltip.style.top = `${event.clientY + window.scrollY + 10}px`;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log("Objeto intersectado:", object);
    if (object === sphere) {
      tooltip.style.visibility = 'visible';
    } else {
      tooltip.style.visibility = 'hidden';
    }
  } else {
    tooltip.style.visibility = 'hidden';
  }
console.log("mouse", mouse);

};
var flag = true;
window.addEventListener("mousemove", onDocumentMouseMove);
//seccion de la lista desplegrable
const onclickMouse = (event) => {


  event.preventDefault();

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log("Objeto intersectado:", object);
    if (object === sphere) {
      if(flag){
        tooltip1.style.left = `${event.clientX + window.scrollX + 15}px`;
        tooltip1.style.top = `${event.clientY + window.scrollY + 15}px`;
        tooltip1.style.visibility = 'visible';
        tooltip.style.visibility = 'hidden';
        flag = false;

      }
      else{
        tooltip1.style.visibility = 'hidden';
        tooltip.style.visibility = 'visible';
        flag = true;
      }}
     else {

     }}
};

window.addEventListener('mousedown',  onclickMouse);




//finde la seccion de la lista desplegable







const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

const handleResize = () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
};

window.addEventListener("resize", handleResize);

return () => {
  window.removeEventListener("resize", handleResize);
  //window.removeEventListener("mousemove", onDocumentMouseMove);
  container.removeChild(renderer.domElement);
  renderer.dispose();
  document.body.removeChild(tooltip);
};
}, []);

return (
<div
  ref={containerRef}
  style={{
    width: "100%",
    height: "500px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
  }}
/>
);
};

export default ThreeDScene;