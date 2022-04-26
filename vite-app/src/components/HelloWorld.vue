<template>
    <div id="pageBg" class="page-bg">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            count: 0
        }
    },
    mounted() {
        /* eslint-disable */
        let point = null;
        let center = null;
        let r = null;
        let particleSystem = null;
        let DNA = null;

        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog('#0F1E5A', 200, 300);
        scene.background = new THREE.Color('#0F1E5A');
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        function rotateAround(point, center, angle) {
            angle = (angle) * (Math.PI / 180);
            // Convert to radians
            var rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
            var rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
            return {
                x: rotatedX,
                y: rotatedY
            }
        }

        function randint(min, max) {
            return Math.floor(Math.random() * max) + min
        }

        function RGB(r, g, b) {
            function colorcheck(c) {
                if (c > 255) {
                    c = 255
                }
                if (c < 0) {
                    c = 0
                }
                return c
            }

            r = colorcheck(r);
            g = colorcheck(g);
            b = colorcheck(b);
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        }

        function rgb2hex(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? '0x' + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }

        function rgb2color(r, g, b) {
            return rgb2hex(RGB(r, g, b))
        }

        var color = {};
        // RGBA(23, 196, 221, 1)
        color.r = 23;
        color.g = 196;
        color.b = 221;
        color.rs = 23;
        color.gs = 196;
        color.bs = 221;
        color.rt = 23;
        color.gt = 196;
        color.bt = 221;

        function randoffset(off) {
            return randint(-off, off * 2)
        }

        function createCanvasMaterial(color, size) {
            var matCanvas = document.getElementById('canvas');
            console.log(matCanvas);
            console.log(document.getElementById('canvas'));
            matCanvas.width = matCanvas.height = size;
            var matContext = matCanvas.getContext('2d');
            // create exture object from canvas.
            var texture = new THREE.Texture(matCanvas);
            // Draw a circle
            var center = size / 2;
            matContext.beginPath();
            matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
            matContext.closePath();
            matContext.fillStyle = color;
            matContext.fill();
            // need to set needsUpdate
            texture.needsUpdate = true;
            // return a texture made from the canvas
            return texture;
        }

        // Create elements here:

        let DNAs = [];

        function newDNA(position, rotation, length) {
            let DNA = [];
            DNA.doublehelix = {};
            DNA.ladder = {};
            // DNA.doublehelix.count = 10 * length

            DNA.doublehelix.particles = new THREE.Geometry();
            DNA.ladder.particles = new THREE.Geometry();
            DNA.doublehelix.colors = [];
            DNA.ladder.colors = [];
            let addp = 0;
            let height = 0;
            let density = 20;
            let curve = 7;

            // now create the individual particles
            for (let p = 0; p < 375; p++) {
                // create a particle with random
                height += 1 / density;
                var pX = 5;
                var pY = height + (randoffset(10) / 10);
                var pZ = 0;
                point = {
                    x: pX,
                    y: 0
                };
                center = {
                    x: 0,
                    y: 0
                };
                addp += 180 + (curve / density);
                r = rotateAround(point, center, addp);
                addp %= 360;
                pX = r.x;
                pZ = r.y;
                var particle = new THREE.Vector3(pX, pY, pZ);

                // add it to the geometry
                DNA.doublehelix.particles.vertices.push(particle);
            }

            addp = 0;
            height = 0;
            let ladderspace = 4;
            for (let p = 0; p <= 375; p++) {
                // create a particle with random
                for (let i = 0; i < density * 2; i++) {
                    var pX = randoffset(50) / 10;
                    var pY = height + (randoffset(4) / 10);
                    var pZ = 0;
                    point = {
                        x: pX,
                        y: 0
                    };
                    center = {
                        x: 0,
                        y: 0
                    };
                    addp += 180;
                    r = rotateAround(point, center, addp);
                    addp %= 360;
                    pX = r.x;
                    pZ = r.y;
                    var particle = new THREE.Vector3(pX, pY, pZ);

                    // add it to the geometry
                    DNA.ladder.particles.vertices.push(particle);
                }
                addp += curve * ladderspace;
                addp %= 360;
                height += ladderspace
            }
            // material
            DNA.doublehelix.material = new THREE.PointsMaterial({
                size: 1,
                color: '#0000ff',
                transparent: true,
                depthWrite: false,
                opacity: 0.5
            });
            DNA.ladder.material = new THREE.PointsMaterial({
                size: 1,
                color: '#0000ff',
                transparent: true,
                depthWrite: false,
                opacity: 0.5
            });
            // create the particle system
            DNA.doublehelix.system = new THREE.Points(DNA.doublehelix.particles, DNA.doublehelix.material);
            DNA.ladder.system = new THREE.Points(DNA.ladder.particles, DNA.ladder.material);
            // add it to the scene
            DNA.doublehelix.system.add(DNA.ladder.system);
            // DNA.doublehelix.system.add(new THREE.Axes())
            scene.add(DNA.doublehelix.system);

            DNA.doublehelix.system.position.x = position[0];
            DNA.doublehelix.system.position.y = position[1];
            DNA.doublehelix.system.position.z = position[2];

            DNA.doublehelix.system.rotation.x = rotation[0];
            DNA.doublehelix.system.rotation.y = rotation[1];
            DNA.doublehelix.system.rotation.z = rotation[2];
            return DNA;
        }

        for (var i = 0; i < 200; i++) {
            var position = [100, 375, randint(0, 1000)];
            var rotation = [randint(0, 360), randint(0, 360), randint(0, 360)];
            DNAs.push(newDNA(position, rotation, 300))
        }

        // The number of particles in a particle system is not easily changed.
        var particleCount = 1;

        // Particles are just individual vertices in a geometry
        // Create the geometry that will hold all of the vertices
        var particles = new THREE.Geometry();

        // Create the vertices and add them to the particles geometry
        for (var p = 0; p < particleCount; p++) {
            // This will create all the vertices in a range of -200 to 200 in all directions
            var x = randoffset(100);
            var y = randoffset(100);
            var z = randint(0, 1000);

            // Create the vertex
            var particle = new THREE.Vector3(x, y, z);

            // Add the vertex to the geometry
            particles.vertices.push(particle);
        }

        // Create the material that will be used to render each vertex of the geometry
        var particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 10,
            map: createCanvasMaterial('#ffffff', 256),
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            opacity: 0.1
        });

        // Create the particle system
        particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        function animateParticles() {
        }

        // end of elements
        camera.position.z = -300;
        particleSystem.position.z = -300;
        camera.position.y = 0;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var render = function () {
            requestAnimationFrame(render);
            mainloop();
            renderer.render(scene, camera);
            // composer.render();
        };
        var nextDNA = 0;
        var speed = 0.7;
        var time = 0;

        function mainloop() {
            time += 1;
            camera.position.z += speed;
            camera.rotation.z += 0.002;
            camera.position.y = Math.sin(time / 100) * 20;
            camera.rotation.y = Math.sin(time / 100) / 10;
            camera.position.x = Math.sin(time / 100) * 20;
            // camera.rotation.x = Math.sin(time/100)/10
            particleSystem.position.z += speed;
            particleSystem.rotation.z -= 0.001;
            nextDNA -= 1;
            var r = Math.round(color.r);
            var g = Math.round(color.g);
            var b = Math.round(color.b);

            var darker = 3;

            // camera.rotation.z -= 0.01
            // toDo 去除颜色变换
            // scene.fog = new THREE.Fog(RGB(Math.round(r / darker), Math.round(g / darker), Math.round(b / darker)), 200, 300);
            // scene.background = new THREE.Color(RGB(Math.round(r / darker), Math.round(g / darker), Math.round(b / darker)));
            for (var i = 0; i < DNAs.length; i++) {
                DNA = DNAs[i];
                // var translation = new THREE.Matrix4().makeTranslation(DNA.doublehelix.system.position.x,
                //                                                      DNA.doublehelix.system.position.y,
                //                                                      DNA.doublehelix.system.position.z);
                // var transformation = rotation_matrix.multiply(translation);
                // DNA.doublehelix.system.applyMatrix(transformation);
                DNA.doublehelix.system.translateY(0.1);
                DNA.doublehelix.system.material.color.setHex(rgb2color(r, g, b));
                DNA.ladder.system.material.color.setHex(rgb2color(r, g, b));
                if (DNA.doublehelix.system.position.z < camera.position.z - 500) {
                    scene.remove(DNA.doublehelix.system);
                    DNAs.splice(i, 1)
                }
            }
            // camera.position.y += 0.5;

            var verts = particleSystem.geometry.vertices;
            particleSystem.material.color.setHex(rgb2color(r, g, b));
            for (var i = 0; i < verts.length; i++) {
                var vert = verts[i];
                if (vert.z < 0) {
                    vert.z = 1000;
                }
                vert.z -= speed * 0.7
            }
            particleSystem.geometry.verticesNeedUpdate = true;
        }

        render();
        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        /* eslint-disable */
    }
}
</script>
<style>
.page-bg {
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

canvas {
    display: block;
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
</style>
