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

gltfLoader.load('luciphone.gltf', (gltf) => {
    scene.add(gltf.scene)

    gltf.scene.scale.set(0.9, 0.9, 0.9)
    gltf.scene.rotation.set(11, 5, 6)
    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation, 'x').min(0).max(11)
    gui.add(gltf.scene.rotation, 'y').min(0).max(11)
    gui.add(gltf.scene.rotation, 'z').min(0).max(11)

    gui.add(gltf.scene.position, 'y').min(0).max(11)
    gui.add(gltf.scene.position, 'x').min(0).max(11)
    gui.add(gltf.scene.position, 'z').min(-10).max(11)

    tl.to(gltf.scene.rotation, { y:  4.8, duration: 1})
    tl.to(gltf.scene.position, { x:  .1, duration: 1})

})

// // Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// // Materials

// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

// // Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)



// Lights

const firstLight = new THREE.AmbientLight(0xffffff, 1)
const secondLight = new THREE.PointLight(0x00509f, 4)
const treeLight = new THREE.PointLight(0xffff90, 4)

firstLight.position.x = 1
firstLight.position.y = 2
firstLight.position.z = 1
scene.add(firstLight)

secondLight.position.x = 1
secondLight.position.y = 10
secondLight.position.z = 1
scene.add(secondLight)

treeLight.position.x = 10
treeLight.position.y = 1
treeLight.position.z = 1
scene.add(treeLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.z = 5
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