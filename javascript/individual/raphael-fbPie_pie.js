//pie chart
GNS.pie={

    //legend and indicators
    context:Raphael(document.getElementById('pieChart'),300,200),

    //pie chart
    chart:Raphael.amaPie({
        prnt:document.getElementById('pieChart'),
        radi:75,
        strk:'#999',
        wdth:1,
        fill:'#eee',
        data:[
            [25,'Firefox'],
            [125,'Firefox'],
            [37,'Firefox'],
            [10,'Firefox']
        ]
        /*
        * paper
        * set
        * wedges
        * mwLs
        * data
        * dataTotal
        * center.x
        * center.y
        */
    })
};

//implementations's methods
GNS.pie.mths=(function(){

    //private
    var that=GNS.pie,
        chart=that.chart;

    return {
        rotate:function(index){
            chart.set.animate({rotation:Raphael.deg(chart.mwLs[index])+','+chart.center.x+','+chart.center.y},400);
            chart.set[index].animate({fill:'#bbb'},400);
        },
        pull:function(index,dir){

            //private
            var h=10,//hypotenuse
                hsq=Math.pow(h,2),
                mwL=chart.mwLs[index],
                n=function(correction){return Math.sin(mwL-correction*Math.PI)*h},
                x,
                y;

            //x,y determination
            if(mwL<=0.5*Math.PI){//90 deg
                y=-n(0);
                x=Math.sqrt(hsq-Math.pow(y,2));
            }
            else if(mwL<=Math.PI){
                x=-n(0.5);
                y=-Math.sqrt(hsq-Math.pow(x,2));
            }
            else if(mwL<=1.5*Math.PI){
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

            chart.set[index].animate({translation:x+','+y},100)
        }
    }
}());
