
// vars
    var limit = 12;
    var offset = limit;
    var url = "https://api.jqestate.ru/v1/properties/country?pagination[limit]="+limit+"&pagination[offset]="+offset;
    var num=1;

// functions

function next(){
    offset+=limit;
    if(offset>=limit*2){document.getElementById("prev").style.display = "inline-block";}
    num++;
    getPage();
    getData();    
}

function prev(){

    offset-=limit;
    if(offset<limit*2){document.getElementById("prev").style.display = "none";}
    num--;
    getPage();
    getData();    
}

function init(){
    document.getElementById("next").style.display = "inline-block";
    document.getElementById("init").style.display = "none";
    document.getElementById("page").style.display = "inline-block";
    getData();
    getPage();
}

function getPage(){
    document.getElementById("page-num").innerHTML=num;
}

function getData(){
    
    var load=document.getElementById("load");
    var x=document.getElementById("x");
    var searched=document.getElementById("searched");
    load.style.visibility = "visible";
    $.ajax({
    url:"https://api.jqestate.ru/v1/properties/country?pagination[limit]="+limit+"&pagination[offset]="+offset })
    
    .done(function( data ) {
        //vars
        var length  = data.items.length;
        searched.innerHTML = "Найдено: "+data.pagination.total;
        
        //stuff
        x.innerHTML="";
        load.style.visibility = "hidden";
        
        //main
        if(data.items.length>0){
            for(var i=0; i<length; i++){
                
                var route   = data.items[i].location.routeName ? data.items[i].location.routeName+" ш" : "";
                var settle  = data.items[i].location.settlementName ? data.items[i].location.settlementName : "";
                var dist    = data.items[i].location.mkadDistance ? data.items[i].location.mkadDistance+" км" : "";
                var price   = data.items[i].saleOffer ? data.items[i].saleOffer.price + " " + data.items[i].saleOffer.currency : "";
                var meters  = data.items[i].specification.area ? data.items[i].specification.area + " м<sup>2</sup>" :"";
                var sotki   = data.items[i].landDetails.area ? data.items[i].landDetails.area + " сот" : "";
                var blank   = "http://www.hdi-slc.com/wp-content/uploads/2012/07/blank-profile.jpg";
                var img     = data.items[i].images[0] ? data.items[i].images[0].url : blank;
                
                x.innerHTML+="<div class='card'>"+
                "<img src='"+img+"' />"+
                "<p class='route'>"+route+"</p>"+
                "<p class='settle'>"+settle+", "+dist+"</p>"+
                "<p class='info'>"+price+" "+"</p>"+
                "<p class='info'>"+sotki+" "+"</p>"+
                "<p class='info'>"+meters+"</p>"+
                "</div>";
            }
        }
        else{alert("fail!");}
    })
    .fail(function(){alert("Нет объектов");});
}