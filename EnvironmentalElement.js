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

        this.xInteraction = null;
        this.yInteraction = null;
    }

    /*
    Should be overwritten.
    */
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
        if (x >= minX - buffer &&
            x <= maxX + buffer &&
            y >= minY - buffer &&
            y <= maxY + buffer) {

            this.xInteraction = x;
            this.yInteraction = y;
            return true;
        } 

        return false
    }

    /*
    Defaults to keeping the same position of the last intersection and 
    an angle of 0 (horizontal) so object remains still on rectangle. 
    Returns [x, y, angle (in rads)].
    */
    getNextInteractionPoint() {
        return [this.xInteraction, this.yInteraction, 0]
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
        ctx.save();
            ctx.fillStyle = this.fill;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y);

            ctx.lineTo(this.x + this.width, this.y+this.height);
            ctx.lineTo(this.x, this.y+this.height);

            ctx.closePath()
            ctx.fill();
        ctx.restore();

    }

}


export class Ground extends Stud {
    constructor(canvas, ctx, x, y, width, height) {

        super(canvas, ctx, x, y, width, height);
    }


    draw() {

        const ctx = this.ctx;
        ctx.save();
            super.draw()
            
            const arc_width = this.height/5;
            ctx.fillStyle = "#94A344";
            ctx.beginPath()
            ctx.arc(this.x, this.y, arc_width, 0, Math.PI/2)
            ctx.lineTo(this.x, this.y)
            ctx.closePath();
            ctx.fill();

            for (let i = this.x + arc_width*1.5; i < this.x+this.width; i += arc_width*1.5) {
                
                ctx.beginPath()
                ctx.arc(i, this.y, arc_width, 0, Math.PI)
                ctx.fill();
            }

            ctx.beginPath()
            ctx.arc(this.x+this.width, this.y, arc_width, Math.PI/2, Math.PI)
            ctx.lineTo(this.x + this.width, this.y)
            ctx.closePath();
            ctx.fill();

        ctx.restore();

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

        const tStep = 0.001;
        const threshold = 8 + buffer;

        for (let t=0; t<=1; t+=tStep) {
            const P = this.bezier(t);
 
            if (Math.sqrt((P[0]-x)**2 + (P[1]-y)**2) <= threshold) {
                this.tInteraction = t;
                return true;
            } 

        }
        return false;
    }


    /*
    Returns an interaction point and angle that is down the curve
    so object can "slide" down curve. Returns [x, y, angle (in rads)].
    */
    getNextInteractionPoint() {
        if (this.tInteraction) {
            const tStep = 0.01;

            const P = this.bezier(this.tInteraction);

            if (this.tInteraction < 1) this.tInteraction += tStep
            const nextP = this.bezier(this.tInteraction);

            const O =  Math.atan2(nextP[1] - P[1], nextP[0] - P[0]); // Angle of slope
            
            return [nextP[0], nextP[1], O]
        }
    }


    /*
    Makes Ease Curve from a cubic bezeir curve.
    */    
   draw() {
        const ctx = this.ctx;

        ctx.save();
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = 16

            ctx.beginPath();
            ctx.moveTo(this.P0[0], this.P0[1]);
            ctx.bezierCurveTo(this.P1[0], this.P1[1], 
                this.P2[0], this.P2[1],
                this.P3[0], this.P3[1]
                )

            ctx.stroke();
        ctx.restore();

        
    }

}