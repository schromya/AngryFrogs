
// export {};



class Frog {
    constructor(canvas, ctx, x, y) {
        this.ctx = ctx;
        this.canvas = canvas
        this.fill = "#4B5320";
        this.stroke = "black";

        // (x,y) is the upper left of the frog body as a square
        this.x = x;
        this.y = y;

        // Where frog leg feet "sticK". The top of the legs
        // stay attached to the frog body.
        this.footLeftX = 100;
        this.footLeftY = 200;
        this.footRightX = 180;
        this.footRightY = 200;

        // Body dimensions (legs stretch beyond)
        this.WIDTH = 90;
        this.HEIGHT = 80;

        // For movement
        this.inBounds = false;
    }


    /*
    Frog body "square" is 90 wide x 80 tall, legs stretch beyond
    */
    drawFrog() {
        const x = this.x;
        const y = this.y;

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

        //Legs
        this.drawFrogLeg(x+10, y+65, this.footLeftX, this.footLeftY);
        this.drawFrogLeg(x+70, y+65, this.footRightX, this.footRightY);
        // this.drawFrogLeg(x+20, y+20, this.footRightX, this.footRighttY);

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
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+10, y);

        ctx.lineTo(footX+10, footY)
        ctx.lineTo(footX, footY)
        ctx.closePath()
        ctx.fill();

    }




    animate() {
        ctx.scale(2/3,2/3)
        this.drawFrog()

    }
}


////////////////////////// MAIN //////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const frog =  new Frog(canvas, ctx, 100, 100);
frog.animate();
