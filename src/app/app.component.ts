import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  materials = null;

  constructor() {

  }

  ngOnInit() {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 10000);
    this.camera.position.z = 1000;

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    this.scene.add(light);

    const ambient = new THREE.AmbientLight ( 0x555555 );
    this.scene.add(ambient);

    this.createRubixMaterial();

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const meshFaceMaterial = new THREE.MultiMaterial( this.materials );
    this.mesh = new THREE.Mesh(geometry, meshFaceMaterial);

    this.scene.add(this.mesh);

  }

  createRubixMaterial() {
    const material1 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../assets/rubics1.jpg') } );
    const material2 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../assets/rubics2.jpg') } );
    const material3 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../assets/rubics3.jpg') } );
    const material4 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../assets/rubics4.jpg') } );
    const material5 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../assets/rubics5.jpg') } );
    const material6 = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('../assets/rubics6.jpg') } );

    this.materials = [material1, material2, material3, material4, material5, material6];
  }

  ngAfterViewInit() {
      this.renderer.setSize(600, 400);
      this.renderer.domElement.style.display = 'block';
      this.renderer.domElement.style.margin = 'auto';
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

      this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
  }

}
