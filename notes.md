# 06 ANIMATIONS 

* Animations in Three.js work like stop motion:
    * you move the object and do a render
    * then move the objects a little more and do another render etc.
    * the more you move the objects between renders, the faster they'll appear to move 
* Screens run at a specific frequency (frame rate) and most screens run at 60 frames per second 
    * approx a frame every 16ms
    * some screens can run much faster 
    * can cause computer to have difficulties processing things causing it to run more slowly 
* We want to execute a function that willmove objects and do the render on each frame regardless of the frame rate 
* Native JS way of doing this is by using `window.requestAnimationFrame(...)` 

## REQUEST ANIMATION FRAME 
* Primary purpose of `requestAnimationFrame(...)` is not to run code on each frame 
* If this function also uses `requestAnimationFrame` to execute that same function on the next frame, you end up with a function being executed on each frame forever which is what we want
    * create function called `tick`
    * call this function once 
    * in this function use `window.requestAnimationFrame(...)` to cal this same function on the next frame
    ```
    //Animate
    
    const tick = () =>
    {
        console.log('tick')

        window.requestAnimationFrame(tick)
    }

    tick()
    ```
    * `tick` function is being passed in `window.requestAnimationFrame` it is not being called (`tick()`)
    * now there is an infinate loop 
    * can see on console `'tick'` is being called on each frame 
    * comp with high frame rate will show `'tick'` appearing at higher frequency 
    * move the `renderer.render(...)` call inside that function and increase the cube rotation
    ```
    //Animate

    const tick = () =>
    {
        // Update objects
        mesh.rotation.y += 0.01

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
    ```
    * issue: if this code is tested on comp with high frame rate, cube will rotate faster and vice versa 

### ADAPTATION TO THE FRAMERATE 
* To adapt animation to the FPS, we need to know how much time has passed since the last tick
    * use `Date.now()` to get the current timestamp: `const time = Date.now()`
        * timestamp corresponds to how much time has passed since 01/01/1970 (the beginning of time for Unix)
        * in JS unit is milliseconds
    * subtract current timestamp to that of the prevous frame to get `deltaTime` and use this value when animating objects
    ```
    // Animtae
    let time = Date.now()

    const tick = () =>
    {
            // Time
        const currentTime = Date.now()
        const deltaTime = currentTime - time
        time = currentTime

        // Update objects
        mesh.rotation.y += 0.01 * deltaTime

        // ...
    }

    tick()
    ```
    * by updating the object `      mesh.rotation.y += 0.01 * deltaTime` the cube rotates faster
    * update multiplier to slow cube down `0.002 * deltaTime`

## USING CLOCK 
* Built in tool in Three.js called `Clock` that handles time calculations
    * instantiate a `Clock` variable and use the built-in methods like `getElapsedTime()` 
    * this returns how many seconds have passed since `Clock` was created
    ```
    //Animate
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        mesh.rotation.y = elapsedTime

        // ...
    }

    tick()
* can be used to move things with the `position` property 
    * combine with `Math.sin(...)`
    ```
    //Animate
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        mesh.position.x = Math.cos(elapsedTime)
        mesh.position.y = Math.sin(elapsedTime)

        // ...
    }

    tick()
    ```
* can use these techniques to animate any `Object3D` like camera: `camera.lookAt(mesh.position)`

## USING A LIBRARY
* Sometimes you'll want to animate your scene in a very specific way that will require using another library 
* `GSAP` is a very famous one
    * add `GSAP` library to project using `npm install --save gsap@3.5.1` in terminal
    * import into script.js
    ```
    import './style.css'
    import * as THREE from 'three'
    import gsap from 'gsap'
    ```
* Create tween to test things out (animation from A to B)
    * comment code related to previous animations but keep the `tick` function with the render 
    ```
    //Animate
    gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

    const tick = () =>
    {
        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
    ```
* GSAP has built-in `requestAnimationFrame` but still need to keep doing the renders of scene on each frame if you want to see the cube moving 

## CHOOSING THE RIGHT SOLUTION   
* Choosing between native JS and an animation library:
    * creating a carousel that spins forever doesn't require a libary 
    * but if animating the swing of a sword a library is probably preferred 