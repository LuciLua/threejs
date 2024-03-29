import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import { AmbientLight } from 'three'

const gltfLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let tl = gsap.timeline()


// Luci Phone

// gltfLoader.load('predioexport.gltf', (gltf) => {
gltfLoader.load('luciphone.gltf', (gltf) => {
    scene.add(gltf.scene)

    gltf.scene.rotation.set(6.3, 11, 6.3)
    gltf.scene.position.set(0, 0, -3)
    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation, 'x').min(-15).max(15)
    gui.add(gltf.scene.rotation, 'y').min(-15).max(15)
    gui.add(gltf.scene.rotation, 'z').min(-15).max(15)

    gui.add(gltf.scene.position, 'y').min(-15).max(15)
    gui.add(gltf.scene.position, 'x').min(-15).max(15)
    gui.add(gltf.scene.position, 'z').min(-15).max(15)

    // tl.to(gltf.scene.position, { x:  0.5, duration: 1})
    // tl.to(gltf.scene.rotation, { y: 105, duration: 200})

    window.addEventListener('keydown', event =>{
   
        if(event.key == 'w'){
            gltf.scene.position.y += 0.3
        }
        
        if(event.key == 's'){
            gltf.scene.position.y -= 0.3
        }
    
        if(event.key == 'a'){
            gltf.scene.rotation.y -= 0.3
        }
        if(event.key == 'd'){
            gltf.scene.rotation.y += 0.3
        }
    
    })
    
})

// Objects
const geometry = new THREE.PlaneBufferGeometry( 3,3,64,64); //plano
const geometrySphere = new THREE.TorusBufferGeometry( 3,3,64,64); // torus

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0x602aff) //roxo


// Textures loader

const loader = new THREE.TextureLoader()

// Texture

const texture = loader.load('/luciphone.png')


const materialTransparente = new THREE.MeshStandardMaterial({
    color: '#ff00ff02',
    map: texture,
})


// Mesh
const plane = new THREE.Mesh(geometry, materialTransparente)
scene.add(plane)
const sphere = new THREE.Mesh(geometrySphere,material)
scene.add(sphere)

sphere.position.set(0,10,-10)
sphere.rotation.set(0,5,6)
sphere.scale.set(0.5,0.5,0.5)

plane.rotation.set(99,0,0)
plane.position.set(0,-3.8,-2)



// Lights

const firstLight = new THREE.AmbientLight(0xffffff)
const secondLight = new THREE.PointLight(0x0a509f, 10)

firstLight.position.x = 1
firstLight.position.y = 1
firstLight.position.z = 1
firstLight.intensity = 10
scene.add(firstLight)

secondLight.position.x = 50
secondLight.position.y = 10
secondLight.position.z = 1
secondLight.intensity = 3

scene.add(secondLight)


// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('keydown', event =>{
    if(event.key == 1){
        secondLight.intensity++
    }
    if(event.key == 2){
        secondLight.intensity--
    }

    if(event.key == 3){
        firstLight.intensity++
    }
    if(event.key == 4){
        firstLight.intensity--
    }

    if(event.key == 5){
        secondLight.position.y++
    }
    if(event.key == 6){
        secondLight.position.y--
    }

})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 8
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()