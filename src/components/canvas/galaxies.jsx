import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Base
 */

// Debug
// const gui = new dat.GUI({width: 400})


// Scene
const scene = new THREE.Scene()
export const galaxyColors = {
    inside: '#462080',
    outside: '#FF61E6'
}
export const galaxy2Colors = {
    inside: '#462080',
    outside: '#7C56FF'
}
export const galaxy3Colors = {
    inside: '#76EBF2',
    outside: '#7C56FF'
}
export const galaxy4Colors = {
    inside: '#462080',
    outside: '#7C56FF'
}
export const galaxy5Colors = {
    inside: '#7C56FF',
    outside: '#462080'
}
/**
 * Galaxy
 */
export const galaxy1Params = {
    count: 100000,
    size: 0.033,
    radius: 4.86,
    branches: 8,
    spin: 8,
    randomness: 1,
    randomnessPower: 8,
    insideColor: galaxyColors.inside,
    outsideColor: galaxyColors.outside,
    type: 1,
    opacity: 1,
    focusDistance: 0.05,
    focalLength: 0.05,
    width: 480,
    height: 480,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
}
export const galaxy2Params = {
    count: 200000,
    size: 0.01,
    radius: 20,
    branches: 8,
    spin: 8,
    randomness: 9,
    randomnessPower: 1,
    insideColor: galaxy2Colors.inside,
    outsideColor: galaxy2Colors.outside,
    type: 2,
    opacity: 1,
    focusDistance: 0.05,
    focalLength: 0.05,
    width: 480,
    height: 480,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
}
// gui.addColor(galaxy2Params, 'insideColor').onFinishChange()

export const galaxy3Params = {
    count: 100000,
    size: 0.01,
    radius: 20,
    branches: 3,
    spin: 32,
    randomness: 13,
    randomnessPower: 20,
    insideColor: galaxy3Colors.inside,
    outsideColor: galaxy3Colors.outside,
    type: 3,
    opacity: 1,
    focusDistance: 0.05,
    focalLength: 0.05,
    width: 480,
    height: 480,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
}

export const galaxy4Params = {
    count: 100000,
    size: 0.005,
    radius: 1,
    branches: 8,
    spin: 5,
    randomness: 4,
    randomnessPower: 20,
    insideColor: galaxy4Colors.inside,
    outsideColor: galaxy4Colors.outside,
    type: 4,
    opacity: 1,
    focusDistance: 0.05,
    focalLength: 0.05,
    width: 480,
    height: 480,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
}

export const galaxy5Params = {
    count: 75000,
    size: 0.03,
    radius: 35,
    branches: 8,
    spin: 5,
    randomness: 1.7,
    randomnessPower: 10,
    insideColor: galaxy5Colors.inside,
    outsideColor: galaxy5Colors.outside,
    type: 3,
    opacity: 0.1,
    focusDistance: 0.05,
    focalLength: 0.05,
    width: 480,
    height: 480,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
}
let geometry = null
let material = null
let points = null

export const generateGalaxy = (params) => {
    // Destroy old galaxy
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(params.count * 3)
    const colors = new Float32Array(params.count * 3)
    const colorInside = new THREE.Color(params.insideColor)
    const colorOutside = new THREE.Color(params.outsideColor)

    // Type 1
    if (params.type === 1) {
        for (let i = 0; i < params.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * params.radius
            const spinAngle = radius * params.spin
            const branchAngle = (i % params.branches) / params.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = Math.sin(spinAngle + radius) * (radius - Math.PI * 2)
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / params.radius * 1.1)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b


            if (i < 20) {
                console.log(params.type, i, branchAngle)
            }
        }
    } else if (params.type === 2) {
        for (let i = 0; i < params.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * params.radius
            const spinAngle = radius * params.spin
            const branchAngle = (i % params.branches) / params.branches * Math.PI * 0.5

            const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = (Math.PI * 0.12) * radius + randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / params.radius * 1.1)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b


            if (i < 20) {
                console.log(params.type, i, branchAngle)
            }
        }

    } else if (params.type === 3) {
        for (let i = 0; i < params.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * params.radius
            const spinAngle = radius * params.spin
            const branchAngle = (i % params.branches) / params.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = Math.cos(spinAngle + radius) * radius + randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / params.radius * 1.05)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b


            if (i < 20) {
                console.log(params.type, i, branchAngle)
            }
        }
    } else if (params.type === 4) {
        for (let i = 0; i < params.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * params.radius
            const spinAngle = radius * params.spin
            const branchAngle = (i % params.branches) / params.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = Math.sin(branchAngle - spinAngle) * radius + randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / params.radius * 1.5)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b


            if (i < 20) {
                console.log(params.type, i, branchAngle)
            }
        }
    } else if (params.type === 5) {
        for (let i = 0; i < params.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * params.radius
            const spinAngle = radius * params.spin
            const branchAngle = (i % params.branches) / params.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = Math.sin(branchAngle - spinAngle) * radius + randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / params.radius * 1.5)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b


            if (i < 20) {
                console.log(params.type, i, branchAngle)
            }
        }
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    /**
     * Materials
     */
    material = new THREE.PointsMaterial({
        size: params.size,
        sizeAttenuation: true,
        // depth: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    return points

}




