
export class Stud {
    /*
    x,y is top left corener.
    */
    constructor(canvas, ctx, x, y, width, height) {

        this.canvas = canvas
        this.ctx = ctx;
        this.fill = "#663c1f";
        this.stroke = "white";

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);

        ctx.lineTo(this.x + this.width, this.y+this.height);
        ctx.lineTo(this.x, this.y+this.height);

        ctx.closePath()
        ctx.fill();
        ctx.stroke();

    }

    animate() {
        this.draw();

    }
}