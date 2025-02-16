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
    
    /*
    Makes an Ease Curve with start at (x,y) and bound 
    within the width and height.
    */
    constructor(canvas, ctx, x, y, width, height) {

        super(canvas, ctx, x, y, width, height);
        this.stroke = "#663c1f";

        const s = 0.75;  // Scaling factor for derivatives
        this.P0 = [x, y];  // Starting Point
        this.P1 = [x + width*s, y];  // Control Point 1
        this.P2 = [x + width - width*s, y + height];  // Control Point 1
        this.P3 = [this.x+this.width, this.y+this.height];  // Ending position

    }

    /* 
    Returns the [x,y] point of the cubic bezeir curve given t between
    0 and 1
    */
    bezier(t) {
        // Bount at 0 and 1

        t = Math.min(1, Math.max(t, 0))
        const Px = this.P0[0] * (-1*t**3 + 3*t**2 - 3*t + 1)
                  + this.P1[0] * (3*t**3 - 6*t**2 + 3*t)
                  + this.P2[0] * (-3*t**3 + 3*t**2)
                  + this.P3[0] * (t**3);

        const Py = this.P0[1] * (-1*t**3 + 3*t**2 - 3*t + 1)
                  + this.P1[1] * (3*t**3 - 6*t**2 + 3*t)
                  + this.P2[1] * (-3*t**3 + 3*t**2)
                  + this.P3[1] * (t**3);   
        
        return [Px, Py];
    }


    /* 
    Checks if the passed point(x,y) intersects this element with added buffer.
    */
    checkIntersection(x, y, buffer = 0) {

        const T_STEP = 0.001;
        const threshold = 5 + buffer;

        for (let t=0; t<=1; t+=T_STEP) {
            const P = this.bezier(t);
            // console.log(x, y, P);
            if (Math.sqrt((P[0]-x)**2 + (P[1]-y)**2) <= threshold) return true;
        }
        return false;
    }

    /*
    Makes Ease Curve from a cubic bezeir curve.
    */    
   draw() {
        const ctx = this.ctx;

        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 10

        ctx.beginPath();
        ctx.moveTo(this.P0[0], this.P0[1]);
        ctx.bezierCurveTo(this.P1[0], this.P1[1], 
            this.P2[0], this.P2[1],
            this.P3[0], this.P3[1]
            )

        ctx.stroke();

        
    }

}