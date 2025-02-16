import { Frog } from './Frog.js';
import { Stud, CurvedBeam } from './EnvironmentalElement.js';

////////////////////////// MAIN //////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');


const environmentElems = [

    
    new Stud(canvas, ctx, 1040, 300, 300, 20),
    new Stud(canvas, ctx, 900, 500, 300, 20),
    new Stud(canvas, ctx, 1000, 618, 300, 20),

    new CurvedBeam(canvas, ctx, 300, 300, 500, 300),
    
    
];


const frog =  new Frog(canvas, ctx, 200, 700, environmentElems);


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



