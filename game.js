
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

    }


    // Frig "square" is 100x80
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

        ctx.restore();
    }

    // (x,y) is lower left of eye socket.
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


    animate() {
        ctx.scale(2,2)
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
