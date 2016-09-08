
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
    getData();
}

function prev(){
    offset-=limit;
    if(offset<limit*2){document.getElementById("prev").style.display = "none";}
    num--;
    getData();
}

function init(){
    document.getElementById("next").style.display = "inline-block";
    document.getElementById("init").style.display = "none";
    document.getElementById("page").style.display = "inline-block";
    getData();
}

function getPage(){
    document.getElementById("page-num").innerHTML=" "+num+" ";
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
        var all = data.pagination.total;
        searched.innerHTML = "Найдено: "+all;
        var pages = Math.ceil(all/limit);
        getPage();
        document.getElementById("pages").innerHTML = pages;
        
        
        //stuff
        x.innerHTML="";
        
        
        //main
        if(data.items.length>0){
            for(var i=0; i<length; i++){
                
                var route   = data.items[i].location.routeName ? data.items[i].location.routeName+" ш." : " ";
                var dist    = data.items[i].location.mkadDistance ? data.items[i].location.mkadDistance+" км." : "";
                var settle  = data.items[i].location.settlementName ? data.items[i].location.settlementName + ", " + dist : " ";
                
                var price   = data.items[i].saleOffer ? "<span class='space'>" + data.items[i].saleOffer.price + " " + data.items[i].saleOffer.currency + " " +"</span>" + "<div class='border'></div>": "";
                var meters  = data.items[i].specification.area ? "<span class='space'>" + data.items[i].specification.area + " м<sup>2</sup> " +"</span>" + "<div class='border'></div>" : "";
                var sotki   = data.items[i].landDetails.area ? "<span class='space'>" + data.items[i].landDetails.area + " сот " + "</span>" + "<div class='border'></div>" : "";
                var blank   = "http://www.hdi-slc.com/wp-content/uploads/2012/07/blank-profile.jpg";
                var img     = data.items[i].images[0] ? data.items[i].images[0].url : blank;
                
                x.innerHTML+="<div class='card'>"+
                "<img src='"+img+"' />"+
                "<p class='route'>"+route+"</p>"+
                "<p class='settle'>" + settle + "</p>" +
                "<div class='info'>" + price + "</div>" +
                "<div class='info'>"+ sotki + "</div>" +
                "<div class='info'>" + meters + "</div>" +
                "</div>";
            }


        }
        else{alert("fail!");}
        document.onload=load.style.visibility = "hidden";
    })
    .fail(function(){alert("Нет объектов");});
    
}