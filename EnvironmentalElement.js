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


    // /* 
    // Checks if the passed rectangle (with top left corner (x,y) and given width/height)
    // intersects this element with added buffer.
    // */
    // checkIntersection(x, y, width, height, buffer) {

    //     return !(
    //         this.x + this.width + buffer <= x ||  // This element is left of the rectangle
    //         x + width + buffer <= this.x ||       // This element is right of the rectangle
    //         this.y + this.height + buffer <= y || // This element is above the rectangle
    //         y + height + buffer <= this.y         // This element is below the rectangle
    //     );
    // }

    
    /* 
    Checks if the passed point(x,y )
    intersects this element with added buffer.
    */
    checkIntersection(x, y, buffer = 0) {
        console.log(`Point: (${x}, ${y})`);
        console.log(`Rect: (${this.x}, ${this.y}, ${this.width}, ${this.height})`);
        console.log(`Buffer: ${buffer}`);
        
        const check = (
            x >= this.x - buffer &&
            x <= this.x + this.width + buffer &&
            y >= this.y - buffer &&
            y <= this.y + this.height + buffer
        )
        console.log("1", x >= this.x - buffer)
        console.log("2", x <= this.x + this.width + buffer)
        console.log("3", y >= this.y - buffer)
        console.log("4", y <= this.y + this.height + buffer)

        return(check)
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