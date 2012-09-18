window.onload = function(){
    /*
    var url = "http://gumball.wickedlysmart.com";
    var req = new XMLHttpRequest();
    req.open("GET",url);
    req.onload = function(){//onreadystatechange in Level 1m here we use level 2
        if(req.status == 200){
            updateSales(req.response);
        }
    };
    req.send(null);
    */
    setInterval(fillSalesData,5000);
    /*fillSalesData();*/
};

function updateSales(text){
    var salesDiv = document.getElementById("sales");
    var sales = JSON.parse(text);
    for(var i=0 ; i<sales.length ; i++){
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class","saleItem");
        div.innerHTML  = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
}
function updateSalesJSONP(sales){
    var salesDiv = document.getElementById("sales");
    for(var i=0 ; i<sales.length ; i++){
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class","saleItem");
        div.innerHTML  = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
}

function fillSalesData(){
    clearSalesDiv();

    var oldscript = document.getElementById("jsonp");

    var head = document.getElementsByTagName("head")[0];//elements,plural form
    var script = document.createElement("script");
    script.src = "http://gumball.wickedlysmart.com?callback=updateSalesJSONP&random=" + (new Date()).getTime();//appendix that prevents browser caching
    script.id  = "jsonp";

    //a more elegant way
    if(oldscript){//replace if there is
        head.replaceChild(script,oldscript);
    }
    else{//add if there is no previous
        head.appendChild(script);//this is called script injection
    }
}
function clearSalesDiv(){
    var div = document.getElementById("sales");
    while(div.hasChildNodes()){
        div.removeChild(div.lastChild);
    }
}
