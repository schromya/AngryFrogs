import { Frog } from './Frog.js';
import { Stud, CurvedBeam, Ground } from './EnvironmentalElement.js';

////////////////////////// MAIN //////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const groundY = 700;


const environmentElems = [

    // Actual Ground
    new Ground(canvas, ctx, 0, groundY, canvas.width, canvas.height-groundY),

    // Floating Ground
    new Ground(canvas, ctx, 200, 100, 200, 20),
    new Ground(canvas, ctx, 450, 400, 100, 20),
    new Ground(canvas, ctx, 800, 450, 100, 20),
    new Ground(canvas, ctx, 600, 200, 150, 20),
    new Ground(canvas, ctx, 900, 300, 150, 20),
    new Ground(canvas, ctx, 1040, 100, 150, 20),
    new Ground(canvas, ctx, 1040, 100, 150, 20),
    new Ground(canvas, ctx, 1300, 600, 100, 20),
    
    
    new CurvedBeam(canvas, ctx, 0, 300, 500, 300),
    new Stud(canvas, ctx, 495, 592, 300, 16),

    new CurvedBeam(canvas, ctx, 1000, 500, 400, -200),
    new Stud(canvas, ctx, 1400, 292, 100, 16),

];


const frog =  new Frog(canvas, ctx, 200, groundY, environmentElems);


/* 
Get the mouse position relative to a canvas. Source: Gleicher.
*/
function mousePosition(evt) {
    const x = evt.clientX;
    const y = evt.clientY;
    const canvasbox = canvas.getBoundingClientRect();
    return [x - canvasbox.left, y - canvasbox.top];
}


canvas.addEventListener("mousedown", (event) => {
    const pos = mousePosition(event);
    frog.setIfInBounds(...pos);
});

canvas.addEventListener("mousemove", (event) => {
    const pos = mousePosition(event);
    frog.onMouseMove(...pos);
});

canvas.addEventListener("mouseup", (event) => {
    frog.onMouseRelease();
});



// the animation loop - we can have 1 function for both elements
function animationLoop(timestamp) {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    environmentElems.forEach((elem) => elem.animate());
    frog.animate();

    window.requestAnimationFrame(animationLoop);
}
window.requestAnimationFrame(animationLoop);



