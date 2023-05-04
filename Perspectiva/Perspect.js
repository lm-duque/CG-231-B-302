// ** CREACION DE ESCENA **
scene = new THREE.Scene(); // Crear la instancia escena
camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000); // Crear cámara    
camera.position.x = 70; // Posición en eje X
camera.position.y = 60; // Posición en eje Y
camera.position.z = 200; // Posición en eje Z
camera.rotation.set(0, -0.5, 0);
camera.lookAt(scene.position); // Posicionar cámara

renderer = new THREE.WebGLRenderer({ antialias: true }); // Crear la instanacia renderizador
renderer.setClearColor(0xDDDDDD, 1.0); // Color fondo pantalla
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// ** CREACIÓN CUADRÍCULA **
// Cuadrícula de tamaño 5x5 (200/40 ó size/divisions)
var size = 200; // Tamaño divisiones
var arrowSize = 100; // Tamaño flecha eje
var divisions = 40; // Cantidad divisiones
var origin = new THREE.Vector3(0, 0, 0); // Definir origen
var x = new THREE.Vector3(1, 0, 0); // Vector unitario en X
var y = new THREE.Vector3(0, 1, 0); // Vector unitario en Y
var z = new THREE.Vector3(0, 0, 1); // Vector unitario en Z
var color1 = new THREE.Color(0x737373); // Color ejes principales
var color2 = new THREE.Color(0x333333); // Color línea divisiones
var colorR = new THREE.Color(0xAA0000); // Color Rojo - Red
var colorG = new THREE.Color(0x00AA00); // Color Verde - Green
var colorB = new THREE.Color(0x0000AA); // Color Azul -Blue
// Ejes X, Y, Z
var arrowX = new THREE.ArrowHelper(x, origin, arrowSize, colorR, 10, 1); // Creación flecha en eje X
var arrowY = new THREE.ArrowHelper(y, origin, arrowSize, colorG, 10, 1); // Creación flecha en eje Y
var arrowZ = new THREE.ArrowHelper(z, origin, arrowSize, colorB, 10, 1); // Creación flecha en eje Z
// Rejilla
var gridHelperXZ = new THREE.GridHelper(size, divisions, color1, color2); // Creación grilla

// ** FUNCIÓN FIGURA **
function Figura(numLados, longitudAristas) {
    var angulo = (2 * Math.PI) / numLados;

    var vertices = [];
    var n;

    // Cordenadas
    for (var i = 0; i < numLados; i++) {
      var x = Math.cos(i * angulo) * longitudAristas / 2;
      var y = Math.sin(i * angulo) * longitudAristas / 2;
      vertices.push(new THREE.Vector3(x, y, 0));
    }

    // Vertices
var vertices = [];
for (var i = 0; i < n; i++) {
  var x = Math.cos(2 * Math.PI * i / n);
  var y = Math.sin(2 * Math.PI * i / n);
  var z = Math.random() * 2; // Agregar profundidad
  vertices.push(new THREE.Vector3(x, y, z));
}

var faces = [];
for (var i = 0; i < n - 2; i++) {
  faces.push(new THREE.Face3(0, i + 1, i + 2));
}
faces.push(new THREE.Face3(0, n - 1, 1));

// Crear la geometria
var geometry = new THREE.Geometry();
geometry.vertices = vertices;
geometry.faces = faces;
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Calcular caras
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    // Material de la geometria

    var mesh = new THREE.Mesh(geometry, material);
   
    return mesh;
  }
  //Llamar funcion
  var figura = Figura(10, 20);

  //Agregar 
  scene.add(gridHelperXZ);
  scene.add(arrowX);
  scene.add(arrowY);
  scene.add(arrowZ);
  scene.add(figura);
  

  //Animate
  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  render();


// Objetos en la escena
scene.add(camera);
scene.add(gridHelperXZ); // Agregar grilla
scene.add(arrowX); // Agregar flecha eje X
scene.add(arrowY); // Agregar flecha eje Y
scene.add(arrowZ); // Agregar flecha eje Z
scene.add(cube);




