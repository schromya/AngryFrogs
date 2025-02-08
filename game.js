
// export {};



class Frog {
    constructor(canvas, ctx, x, y, groundX, groundY) {
        this.ctx = ctx;
        this.canvas = canvas
        this.fill = "#4B5320";
        this.stroke = "black";

        // (x,y) is the upper left of the frog body as a square
        this.x = x;
        this.y = y;

        this.groundX = groundX;
        this.groundY = groundY;
        


        this.isLegsCollapsed = false;
        

        // Body dimensions (legs stretch beyond)
        this.WIDTH = 90;
        this.HEIGHT = 80;

        // For movement
        this.inBounds = false;

        // For jump
        this.isJumping = false;
        this.x0 = 0;
        this.y0 = 0;  // Initial Y before jump
        this.yPrev = 0;
        this.v0 = 120;  // Initial Velocity of jump
        this.O = 0; // Angle of jump TODO CALCULATE
        this.t = 0;


        
    }


    /*
    Frog body "square" is 90 wide x 80 tall, legs stretch beyond
    */
    drawFrog() {
        let x = this.x;
        let y = this.y;

        ctx.save();
        
        ctx.fillStyle = this.fill;

        //Body
        ctx.beginPath();
        ctx.moveTo(x+10, y+30);
        ctx.lineTo(x+80, y+30);
        ctx.bezierCurveTo(x+80, y+30, x+90, y+50, x+80, y+70);
        ctx.bezierCurveTo(x+80, y+70, x+50, y+80, x+10, y+70);
        ctx.bezierCurveTo(x+10, y+70, x, y+50, x+10, y+30);
        ctx.fill();

        //Eyes
        this.drawFrogEye(x+10, y);
        this.drawFrogEye(x+50, y);

        
        //Mouth
        ctx.save();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.roundRect(x+20, y+45, 50, 2, 2);
        ctx.fill();
        ctx.restore();



        // Legs attached to body
        if (this.isLegsCollapsed) {
            this.drawFrogLeg(x+10, y+65, x+5, y+95);
            this.drawFrogLeg(x+70, y+65, x+75, y+95);
        } else { // Legs attached to ground
            this.drawFrogLeg(x+10, y+65, this.groundX, this.groundY);
            this.drawFrogLeg(x+70, y+65, this.groundX+80, this.groundY);
        }


        ctx.restore();
    }

    /*
    (x,y) is lower left of eye socket.
    */
    drawFrogEye(x, y) {

        // Eye Socket
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y+30);
        ctx.bezierCurveTo(x, y+30, x+15, y, x+30, y+30);
        ctx.fill();

        // Eyeball
        
        ctx.strokeStyle = "white";
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x+15, y+30, 7.5, 0, 2*Math.PI);
        ctx.stroke();
        ctx.restore();

    }

    /* 
    x, y is where the leg (rectangle) connects to the frog. Tx,y
    is the top, left of the rectangle
    */
    drawFrogLeg(x,y, footX, footY) {
        // TODO: Make these frog legs bent in the middle
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+10, y);

        ctx.lineTo(footX+10, footY)
        ctx.lineTo(footX, footY)

        ctx.closePath()
        ctx.fill();

    }

    /*
    Makes the frog jump in projectile motion. Based off the
    set initial velocity and the angle of the body and legs
    */
    jump() {
        
        const g = 9.81;  // Gravity is updward bc axis is flipped

        this.y = this.v0 * Math.sin(this.O) * this.t + 0.5 * g * this.t**2 + this.y0;
        this.x = this.v0 * Math.cos(this.O) * this.t + this.x0;

        this.t += .2; //TODO change this

        // "Collapse" legs one body jumps above ground
        if (this.y + this.HEIGHT <= this.groundY) this.isLegsCollapsed = true;


        // Jump ends once reach ground y position 
        const isDecreasing = this.y > this.yPrev;
        if (this.y + this.HEIGHT >= this.groundY && isDecreasing) this.isJumping = false; 

        this.yPrev = this.y;
        
    }

    /*
    Checks whether the passed mouse x and y positions
    are touching the frog.
    */
    setIfInBounds(xMouse, yMouse) {

        if (xMouse >= this.x && 
            xMouse <= this.x + this.WIDTH &&
            yMouse >= this.y && 
            yMouse <= this.y + this.HEIGHT) {
                this.inBounds = true;
               
        } else {
            this.inBounds = false;
        }
    }

    /*
    Moves the middle of the frog body (NOT LEGS) based to the new mouse x and y
    positions if mouse was previously in bound for onClick.
    */
    onMouseMove(xMouse, yMouse) {
        if (this.inBounds) {
            this.x = xMouse - this.WIDTH / 2;
            this.y = yMouse - this.HEIGHT / 2;
        }
    }


    onMouseRelease() {
        this.inBounds = false;
        this.t = 0;
        this.y0 = this.y;
        this.yPrev = this.y0;
        this.x0 = this.x;

        //Calculate angle of frog
        this.O =  Math.atan2((this.groundX - this.y), (this.groundY - this.x));

        this.isJumping = true;
    }


    animate() {
        if (this.isJumping) {
            this.jump();
        }
        
        this.drawFrog();


    }
}


////////////////////////// MAIN //////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const frog =  new Frog(canvas, ctx, 200, 600, 200, 700);

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
    frog.animate();
    window.requestAnimationFrame(animationLoop);
}
window.requestAnimationFrame(animationLoop);



