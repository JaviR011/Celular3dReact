import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




const ThreeDScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Dimensiones del contenedor
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Crear escena y cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.2);

    // Crear renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff); // Fondo blanco
    container.appendChild(renderer.domElement);

    // Controles orbitales
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

           
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


    // Cargar modelo GLB
    const loader = new GLTFLoader();
    loader.load(
      "media/samsung_galaxy_s24_plus.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo:", error);
      }
    );

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Ajustar tamaño al redimensionar
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar recursos al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "500px", // Ajusta la altura del contenedor
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default ThreeDScene;
