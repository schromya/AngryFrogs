
export {};



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');




// Frog body
function drawFrogBody(fill, x, y) {
    ctx.fillStyle = fill;
    ctx.strokeStyle = "black"
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.arc(100+x, 100+y, 40, Math.PI-0.5, 0);
    ctx.lineTo(300+x, 100+y)
    ctx.arc(400+x, 100+y, 40, Math.PI, 0.5);
    ctx.lineTo(450+x, 200+y)
    ctx.lineTo(430+x, 300+y)
    ctx.lineTo(70+x, 300+y)
    ctx.lineTo(50+x, 200+y)
    ctx.closePath();
    ctx.fill();
    ctx.stroke()
}

drawFrogBody("#4B5320", 0, 0)


// Eyes
ctx.strokeStyle = "#FFF";
ctx.lineWidth = 4

ctx.beginPath();
ctx.arc(100, 100, 20, 2* Math.PI, 0);
ctx.stroke();

ctx.beginPath();
ctx.arc(400, 100, 20, 2* Math.PI, 0);
ctx.stroke();


// Mouth
ctx.beginPath();
ctx.arc(250, 300, 150, Math.PI, 0);
ctx.stroke();

