window.onload = init;

function init(){
    drawTriangleTest();
    drawCircleTest();
}

function drawTriangleTest(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(20,100);
    context.lineTo(100,100);
    context.lineTo(50,70);
    context.closePath();//close the shape

    context.lineWidth = 4;//use integer here, not px string 
    context.strokeStyle="red";//this won't work, how to set line color? EDIT: using strokeStyle
    context.stroke();
    context.fillStyle="lightblue";//Gosh, this is FILL color, not line color.
    context.fill();
}

function drawCircleTest(){
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");
    c.beginPath();
    c.arc(100,100,50,0,degree2Radian(270),true);//center x,center y,radius,start angle, end angle,conterclockwise(true) or clockwise(false)
    c.closePath();

    c.lineWidth = 4;
    c.stroke();

    c.fillStyle = "magenta";
    c.fill()
}

function degree2Radian(degree){
    return degree * Math.PI  / 180;
}
