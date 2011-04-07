var fbPieCanvas=Raphael($('#pieChart')[0]);
fbPieCanvas.height=300;
fbPieCanvas.width=500;

//definition
var fbPie=Raphael.amaPie({
    prnt:document.getElementById('pieChart'),
    radi:90,
    strk:'#999',
    wdth:1,
    fill:'#eee',
    data:[
        [25,'Firefox'],
        [125,'Firefox'],
        [37,'Firefox'],
        [10,'Firefox']
    ]
});

//behaviors via w3c event model
//events NOT delegated
var scale=function(index,scale){
    fbPie.set[index].animate({scale:scale+','+scale+','+fbPie.center.x+','+fbPie.center.y},50)
}
var rotate=function(index){
    fbPie.set.animate({rotation:Raphael.deg(fbPie.mwLs[index])+','+fbPie.center.x+','+fbPie.center.y},400);
    fbPie.set[index].animate({fill:'#999'},400);
}
var pull=function(index,dir){

    //private
    var h=10,//hypotenuse
        hsq=Math.pow(h,2),
        n=function(correction){return Math.sin(fbPie.mwLs[index]-correction*Math.PI)*h},
        x,
        y;

        //x,y determination
        if(fbPie.mwLs[index]<=0.5*Math.PI){//90 deg
            y=-n(0);
            x=Math.sqrt(hsq-Math.pow(y,2));
        }
        else if(fbPie.mwLs[index]<=Math.PI){
            x=-n(0.5);
            y=-Math.sqrt(hsq-Math.pow(x,2));
        }
        else if(fbPie.mwLs[index]<=1.5*Math.PI){
            y=n(1);
            x=-Math.sqrt(hsq-Math.pow(y,2));
        }
        else{
            x=n(1.5);
            y=Math.sqrt(hsq-Math.pow(x,2));
        }

        //direction
        if(dir==='inward'){
            x=-x;
            y=-y;
        }

    fbPie.set[index].animate({translation:x+','+y},100)
};


for (var i=0;i<fbPie.set.length;i++){

    //click
    fbPie.wedges[i].addEventListener('click',(function(j){
        return function(){
            for(var i=0;i<fbPie.wedges.length;i++){
                $(fbPie.wedges[i]).unbind();
            }
            rotate(j);
            $('#pieChart').addClass('active');
        };
    }(i)));

    //hover
    $(fbPie.wedges[i]).hover(
        (function(j){
            return function(){
                pull(j,'outward');

            };
        }(i)),
        (function(j){
            return function(){
                pull(j,'inward');
            };
        }(i))
    )
}

var style=$(document.createElement('style')).text('\
    path{cursor:pointer}\
    .active path{cursor:default}\
').prependTo($('svg:eq(0)'))


