var fbPie=Raphael.amaPie({
    prnt:document.getElementById('pieChart'),
    radi:170,
    strk:'#999',
    wdth:2,
    fill:'#eee',
    data:[
        [50,'IE'],
        [50,'Firefox'],
        [20,'Firefox'],
        [20,'Firefox']
    ]
});

var center={
    x:fbPie.set[0].getPointAtLength(fbPie.set[0].getTotalLength()).x,
    y:fbPie.set[0].getPointAtLength(fbPie.set[0].getTotalLength()).y
};

for (var i=0;i<fbPie.set.length;i++){
    fbPie.wedges[i].addEventListener('click',function(){alert(this.label[1]+' - '+this.label[0])},false);
    fbPie.wedges[i].addEventListener('mouseover',function(){

       fbPie.set[i].scale(.95,.95,center.x,center.y);
    },false);
}

/*alert(fbPie.set.length);

fbPie.set[0].scale(.95,.95,fbPie.set[0].getPointAtLength(fbPie.set[0].getTotalLength()).x,fbPie.set[0].getPointAtLength(fbPie.set[0].getTotalLength()).y);
fbPie.wedges[0].addEventListener('click',function(){alert(this.label[1]+' - '+this.label[0])},false);*/

