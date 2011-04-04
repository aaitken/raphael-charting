if(Raphael.fbPie){alert('conflict');}
else{
    Raphael.fbPie=function(opts){

        //private
        var data=opts.data,//[[int,label]...]
            dataLength=data.length,
            dataTotal=0,
            fbPie,//this is what we return
            i,
            paper,
            prnt=opts.prnt,
            radi=opts.radi;

        //fbPie definition
        if(prnt.raphael){//Raphael insertion
            console.log('raph');
        }
        else{//DOM insertion
            fbPie={};
            fbPie.paper=paper=Raphael(prnt,radi*2,radi*2);
            fbPie.circle=fbPie.paper.circle(radi,radi,radi);
        }

        //pie slicing
        (function(){

            //private
            var L=0,//radian angle
                L2=function(mult){return L-(mult*Math.PI);},//translated radian angle per quadrant
                pth0='M'+radi+' '+radi+'L',
                x,
                xget=function(angle,trig){x=Math[trig](angle)*radi;return x;},
                y=function(x){return Math.sqrt(Math.pow(radi,2)-Math.pow(x,2));};//pythag

            //data total
            for(i=0;i<dataLength;i++){
                dataTotal+=data[i][0];
            }
            
            //wedges
            for(i=0;i<dataLength;i++){
                L+=(data[i][0]/dataTotal)*2*Math.PI;//2MathPI = 360 deg in radians
                if(L<=0.5*Math.PI){//1st quadrant
                    paper.path(pth0+(radi+xget(L,'cos'))+' '+(radi-y(x)));
                }
                else if(L<=Math.PI){//2nd quadrant
                    paper.path(pth0+(radi-xget(L2(0.5),'sin'))+' '+(radi-y(x)));
                }
                else if(L<=1.5*Math.PI){//3rd quadrant
                    paper.path(pth0+(radi-xget(L2(1),'cos'))+' '+(radi+y(x)));
                }
                else{//4th quadrant
                    paper.path(pth0+(radi+xget(L2(1.5),'sin'))+' '+(radi+y(x)));
                }
            }
        }());

        return fbPie;
    }
}
