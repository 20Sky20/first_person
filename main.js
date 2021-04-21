import * as THREE from './pkg/three.module.js'; 

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    // INIT
    const render = new THREE.WebGLRenderer({canvas: document.querySelector('canvas')}); 
    render.setClearColor ('#0ff');
    render.shadowMap.enabled = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, render.donElement.clientWidth / render.donElement.clientHeight, 0.1, 1000); 
    camera.position.z = 5;
    const resize = () => {
        camera.aspect = render.donElement.clientWidth / render.donElement.clientHeight;
        camera.updateProjectionMatrix();
        render.setSize(render.donElement.clientWidth * window.devicePixelRatio, render.donElement.clientHeight * window.devicePixelRatio, false);
    }
    resize();
    window.addEventListener('resize', resize);

    // LIGHTING
    const directional_light = new THREE.DirectionalLight(0xFFFFFF, 0.95);
    directional_light.castShadow = true;
    directional_light.position.x = 3;
    directional_light.position.z = 4;
    directional_light.position.y = 5;
    scene.add(directional_light);

    // GROUND
    const ground_geometry = new THREE.PlaneGeometry(10000, 10000);
    const ground_material = new THREE.MeshStandardMaterial({
        color: 0x008844,
        metalness: 0,
        roughness: 1,
    });
    const ground = new THREE.Mesh(ground_geometry, ground_material);
    ground.rotation.x = -0.5 * Math.PI;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);
    

    // CUBE
    const cube_geometry = new THREE.BoxGeometry();
    const cube_material = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        metalness: 0.1,
        roughness: 0.75,
    });
    const cube = new THREE.Mesh(cube_geometry, cube_material);
    cube.castShadow = true;
    scene.add(cube);


    // ANIMATION LOOP
    const animate = timestamp =>{

        // REQUEST NEXT FRAME
        window.requestAnimationFrame(animate);

        // ROTATE CUBE
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;


        // RENDER
        render.render(scene, camera);

    };
    window.requestAnimationFrame(animate);

}); 
