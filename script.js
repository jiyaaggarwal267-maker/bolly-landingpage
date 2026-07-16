// ===========================================================
// Bolly — Landing Page Interactions + 3D Bottle
// ===========================================================


import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


import { GLTFLoader } from 
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js";


import { OrbitControls } from 
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";




// ===========================================================
// Normal Website Interactions
// ===========================================================


document.addEventListener("DOMContentLoaded", () => {


const exploreBtn = document.querySelector(".btn-explore");

const arrowBtn = document.querySelector(".btn-arrow");

const cartBtn = document.querySelector(".cart-btn");


const prefersReducedMotion =
window.matchMedia("(prefers-reduced-motion: reduce)").matches;



const goExplore = () => {

const target = document.querySelector("#shop");

if(target){

target.scrollIntoView({
behavior: prefersReducedMotion ? "auto" : "smooth"
});

}

};



exploreBtn?.addEventListener(
"click",
goExplore
);



arrowBtn?.addEventListener(
"click",
goExplore
);



cartBtn?.addEventListener(
"click",
()=>{

cartBtn.classList.toggle("is-active");

}

);


});




// ===========================================================
// THREE.JS 3D BOTTLE
// ===========================================================


const container = document.getElementById(
"bottle-container"
);



if(container){


const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(

45,

container.clientWidth /
container.clientHeight,

0.1,

1000

);





const renderer = new THREE.WebGLRenderer({

alpha:true,

antialias:true

});



renderer.setPixelRatio(
window.devicePixelRatio
);



renderer.setSize(

container.clientWidth,

container.clientHeight

);



container.appendChild(
renderer.domElement
);





// Lights


const ambientLight = new THREE.HemisphereLight(

0xffffff,

0x444444,

3

);


scene.add(
ambientLight
);



const directionalLight = new THREE.DirectionalLight(

0xffffff,

2

);



directionalLight.position.set(

2,

5,

3

);



scene.add(
directionalLight
);





// Load GLB


const loader = new GLTFLoader();



loader.load(

"bottle.glb",


(gltf)=>{


const bottle = gltf.scene;



// Adjust these if needed

bottle.scale.set(

3,

3,

3

);



bottle.position.y = -1;



scene.add(
bottle
);



},



undefined,

(error)=>{


console.error(
"Error loading bottle:",
error
);


}


);






camera.position.z = 6;





// Mouse + Touch Controls


const controls = new OrbitControls(

camera,

renderer.domElement

);



controls.enableDamping = true;

controls.dampingFactor = 0.08;


controls.enableZoom = false;


controls.autoRotate = false;






// Animation


function animate(){


requestAnimationFrame(
animate
);



controls.update();



renderer.render(

scene,

camera

);


}



animate();






// Resize


window.addEventListener(

"resize",

()=>{


camera.aspect =

container.clientWidth /
container.clientHeight;



camera.updateProjectionMatrix();



renderer.setSize(

container.clientWidth,

container.clientHeight

);



}

);



}