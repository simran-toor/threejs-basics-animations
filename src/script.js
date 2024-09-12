import * as THREE from 'three'
import gsap from 'gsap'

//CANVAS
const canvas = document.querySelector('canvas.webgl');

//SCENE
const scene = new THREE.Scene()

//OBJECT
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//SIZES
const sizes = {
    width: 800,
    height: 600
}

//CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//TIME
// let time = Date.now()
// const clock = new THREE.Clock()

//ANIMATIONS 
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })

const tick = () => 
{
    //TIME
        // const currentTime = Date.now()
        // const deltaTime = currentTime - time
        // time = currentTime
        // console.log(deltaTime)
    // const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    //UPDATE OBJECT
        // mesh.position.x -= 0.01
        // mesh.position.y += 0.01
        // mesh.rotation.y += 0.002 * deltaTime
        // mesh.rotation.y = elapsedTime
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)
    // camera.lookAt(mesh.position)

    //RENDER
    renderer.render(scene, camera)

    //CALL TICK AGAIN ON NEXT FRAME
    window.requestAnimationFrame(tick)
}

tick()