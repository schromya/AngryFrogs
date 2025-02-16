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
    Checks if the passed rectangle (with top left corner (x,y) and given width/height)
    intersects this element with added buffer.
    */
    checkIntersection(x, y, width, height, buffer) {

        return !(
            this.x + this.width + buffer <= x ||  // This element is left of the rectangle
            x + width + buffer <= this.x ||       // This element is right of the rectangle
            this.y + this.height + buffer <= y || // This element is above the rectangle
            y + height + buffer <= this.y         // This element is below the rectangle
        );
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