window.onload = function(){
    var previewBtn = document.getElementById("previewButton");
    previewBtn.onclick = previewHandler;
    makeImage();
};
var context;
var canvas;

function getTShirtOptions(){
    var form = document.getElementById("shirt-options");
    var options = {}
    for(var i=0 ; i < form.length ; i++){
        var selectObj = form[i];
        if(selectObj.selectedIndex >=0){
            options[selectObj.getAttribute("id")] = selectObj[selectObj.selectedIndex].value
        }
    }
    return options;
}
function previewHandler(){
    canvas = document.getElementById("shirt-canvas");
    context = canvas.getContext("2d");

    fillBgColor(canvas,context);

    var opts = getTShirtOptions();
    if(opts["shape"] == "squares"){
        for(var i=0;i<20;i++){
            drawSqaure(canvas , context);
        }
    }
    else if(opts["shape"] == "circles"){
        for(var i=0;i<20;i++){
            drawCircle(canvas , context);
        }
    }
    drawText(canvas,context);
    drawTwitterBird(canvas,context);
}
function drawSqaure(canvas , context){
    var width   = Math.floor(Math.random() * 40);
    var x       = Math.floor(Math.random() * canvas.width);
    var y       = Math.floor(Math.random() * canvas.height);
    context.fillStyle = "lightgreen";
    context.fillRect(x,y,width,width);

}

function drawCircle(canvas , c){
    var radius  = 10 + Math.floor(Math.random() * 30);
    var x       = Math.floor(Math.random() * canvas.width);
    var y       = Math.floor(Math.random() * canvas.height);
    c.beginPath();
    c.arc(x , y , radius , 0 , degree2Radian(360) , true);
    /*c.stroke();*/
    c.fillStyle = "lightgreen";
    c.fill();
}

function drawText(canvas , c){
    var opts = getTShirtOptions();
    var fgColor = opts["foregroundColor"];
    var tweet = opts["tweets"];
    //draw the upper left text
    c.fillStyle = fgColor;
    c.font = "15px monospace";//fontsize should come first, or it won't take effect
    c.textAlign = "left";//change this to right, then surprise!
    c.fillText("I see this tweet:",20,40);
    
    //the tweet
    c.font = "italic 30pt Calibri";
    c.strokeStyle = "red";
    c.lineWidth = 2;
    c.strokeText(tweet,80,canvas.height - 80 , 400);//the last parameter indicates the max length of the text, if above, then text be scaled

    //the bottom text
    c.fillStyle = fgColor;
    c.font = "15px monospace";//fontsize should come first, or it won't take effect
    c.textAlign = "right";//change this to right, then surprise!
    c.fillText("and then this cool T-shirt!",canvas.width - 20 , canvas.height - 40);


}

function drawTwitterBird(canvas,context){
    var twitterBird = new Image();
    twitterBird.src = "twitter-bird.png";//preload the image
    twitterBird.onload = function(){;//when the image is loaded, then draw it. Or strange thing will show
        context.drawImage(twitterBird,20,canvas.height - 80,70,70);
    }
}

function fillBgColor(canvas , context){
    var bgcolor = getTShirtOptions()["backgroundColor"];
    context.fillStyle = bgcolor;
    context.fillRect(0,0,canvas.width,canvas.height);
}

function degree2Radian(degree){
    return degree * Math.PI  / 180;
}

function updateTweets(tweets){
    var selectObj = document.getElementById("tweets");
    for(var i=0;i<tweets.length;i++){
        var option = document.createElement("option");
        option.text = tweets[i].text.substring(0,50);
        option.value = tweets[i].text.replace("\"","'");
        selectObj.appendChild(option);
    }
    selectObj.selectedIndex = 4;
}

function makeImage() {
    var canvas = document.getElementById("shirt-canvas");
    canvas.onclick = function () {
        window.location = canvas.toDataURL("image/png");//In Chrime, the file should be run in localhost or a host
    };
}

