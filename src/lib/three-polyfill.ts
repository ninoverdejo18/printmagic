import * as THREE from 'three';

// Patch THREE.BufferGeometry.prototype.computeBoundingSphere to prevent NaN crashes
if (THREE && THREE.BufferGeometry) {
  const originalComputeBoundingSphere = THREE.BufferGeometry.prototype.computeBoundingSphere;

  THREE.BufferGeometry.prototype.computeBoundingSphere = function () {
    const position = this.attributes.position;
    if (position && position.array) {
      const arr = position.array as Float32Array | number[];
      let hasNaN = false;
      for (let i = 0; i < arr.length; i++) {
        if (isNaN(arr[i]) || !isFinite(arr[i])) {
          arr[i] = 0;
          hasNaN = true;
        }
      }
      if (hasNaN && position.needsUpdate !== undefined) {
        position.needsUpdate = true;
      }
    }

    try {
      originalComputeBoundingSphere.call(this);
      if (this.boundingSphere && (isNaN(this.boundingSphere.radius) || !isFinite(this.boundingSphere.radius))) {
        this.boundingSphere.radius = 1;
        this.boundingSphere.center.set(0, 0, 0);
      }
    } catch (err) {
      console.warn("[ThreePolyfill] Sanitized NaN in computeBoundingSphere:", err);
      this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
    }
  };
}

// Make THREE globally available on window so dynamic imports (e.g. threejs-components) inherit the patch
if (typeof window !== 'undefined') {
  (window as any).THREE = THREE;
}

export default THREE;
