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
    inside: '#FF61E6',
    outside: '#7C56FF'
}
export const galaxy3Colors = {
    inside: '#76EBF2',
    outside: '#7C56FF'
}
export const galaxy4Colors = {
    inside: '#462080',
    outside: '#FF61E6'
}
export const galaxy5Colors = {
    inside: '#ffffff',
    outside: '#FF61E6'
}
/**
 * Galaxy
 */
export const galaxy1Params = {
    count: 100000,
    size: 0.03,
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
    randomnessPower: 10,
    insideColor: galaxy2Colors.inside,
    outsideColor: galaxy2Colors.outside,
    type: 2,
    opacity: 0.1,
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
    size: 0.01,
    radius: 8,
    branches: 8,
    spin: 5,
    randomness: 1.5,
    randomnessPower: 1,
    insideColor: galaxy4Colors.inside,
    outsideColor: galaxy4Colors.outside,
    type: 4,
    opacity: 0.5,
    focusDistance: 0.05,
    focalLength: 0.05,
    width: 480,
    height: 480,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
}

export const galaxy5Params = {
    count: 100000,
    size: 0.05,
    radius: 35,
    branches: 8,
    spin: 5,
    randomness: 2.5,
    randomnessPower: 10,
    insideColor: galaxy5Colors.inside,
    outsideColor: galaxy5Colors.outside,
    type: 3,
    opacity: 0.5,
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





