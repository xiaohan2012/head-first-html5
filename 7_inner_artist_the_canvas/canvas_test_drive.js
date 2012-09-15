function drawRect(){
    var canvas = document.getElementById("TshirtCanvas");
    if(canvas.getContext){
        var context = canvas.getContext("2d");
        context.fillRect(10,10,100,100);
        context.strokeRect(120,10,100,100);
    }
    else{
        console.log("hey, you need to upgrate your browser. I recommand Chrome!")
    }
}
