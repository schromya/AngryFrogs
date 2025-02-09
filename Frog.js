
export class Frog {
    constructor(canvas, ctx, groundX, groundY) {
        //TODO possibly rename groundX to positionX
        
        this.canvas = canvas
        this.ctx = ctx;
        this.fill = "#4B5320";
        this.stroke = "black";

        // Body dimensions 
        this.LEG_HEIGHT = 30;
        this.BODY_HEIGHT = 70; // Bezeir curve of stomach technically goes over this but this is good enough

        this.WIDTH = 90;
        this.HEIGHT = this.LEG_HEIGHT + this.BODY_HEIGHT;

        // (x,y) is the upper left of the frog body as a square
        this.x = groundX;
        this.y = groundY - this.HEIGHT;

        this.groundX = groundX;
        this.groundY = groundY;
        
        this.isLegsCollapsed = false;
    
        
        // For movement
        this.inBounds = false;

        // For jump
        this.isJumping = false;
        this.x0 = 0;
        this.y0 = 0;  // Initial Y before jump
        this.yPrev = 0;
        this.v0 = 110;  // Initial Velocity of jump
        this.O = 0; // Angle of jump TODO CALCULATE
        this.t = 0;


        
    }


    /*
    Frog body "square" is 90 wide x 80 tall, legs stretch beyond
    */
    drawFrog() {
        const x = this.x;
        const y = this.y;
        const ctx = this.ctx;

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
            this.drawFrogLeg(x+10, y+this.BODY_HEIGHT, x+5, y+this.BODY_HEIGHT+this.LEG_HEIGHT);
            this.drawFrogLeg(x+70, y+this.BODY_HEIGHT, x+75, y+this.BODY_HEIGHT+this.LEG_HEIGHT);
        } else { // Legs attached to ground
            this.drawFrogLeg(x+10, y+this.BODY_HEIGHT , this.groundX, this.groundY);
            this.drawFrogLeg(x+70, y+this.BODY_HEIGHT , this.groundX+80, this.groundY);
        }


        ctx.restore();
    }

    /*
    (x,y) is lower left of eye socket.
    */
    drawFrogEye(x, y) {
        const ctx = this.ctx;

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
        const ctx = this.ctx;

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
        if (this.y + this.HEIGHT >= this.groundY && isDecreasing) {
            this.isJumping = false; 
            this.isLegsCollapsed = false;
            this.groundX = this.x;
        } 

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