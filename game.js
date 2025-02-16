import { Frog } from './Frog.js';
import { Stud } from './EnvironmentalElement.js';

////////////////////////// MAIN //////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');


const environmentElems = [
    new Stud(canvas, ctx, 1000, 700, 30, -50),
    new Stud(canvas, ctx, 1030, 700, 30, -50),
    new Stud(canvas, ctx, 1000, 648, 60, -30),
    new Stud(canvas, ctx, 1065, 700, 20, -200),
    new Stud(canvas, ctx, 1200, 700, 20, -200),
    new Stud(canvas, ctx, 1040, 500, 250, -20),
    new Stud(canvas, ctx, 1040, 480, 200, -20),
    
    
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



