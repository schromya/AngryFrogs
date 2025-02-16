export class EnvironmentalElement {
    /*
    x,y is top left corner. This element has rectangle boundaries.
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


    draw() {}


    /* 
    Checks if the passed point(x,y ) intersects this element with added buffer.
    Allows height/width to be negative
    */
    checkIntersection(x, y, buffer = 0) {
        const minX = Math.min(this.x, this.x + this.width);
        const maxX = Math.max(this.x, this.x + this.width);
        const minY = Math.min(this.y, this.y + this.height);
        const maxY = Math.max(this.y, this.y + this.height);
        return (
            x >= minX - buffer &&
            x <= maxX + buffer &&
            y >= minY - buffer &&
            y <= maxY + buffer
        )
    }

    animate() {
        this.draw();
    }
}



export class Stud extends EnvironmentalElement {
    constructor(canvas, ctx, x, y, width, height) {

        super(canvas, ctx, x, y, width, height);
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

}




export class CurvedBeam extends EnvironmentalElement {
    constructor(canvas, ctx, x, y, width, height) {

        super(canvas, ctx, x, y, width, height);
        this.stroke = "#663c1f";

    }

    /*
    Makes Ease Curve from bezeir curve
    */
    draw() {
        const s = 0.75; // derivative scaling factor
        const ctx = this.ctx;
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 10

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.width*s, this.y, 
            this.x + this.width - this.width*s, this.y + this.height, 
            this.x+this.width, this.y+this.height)

        ctx.stroke();

    }

}