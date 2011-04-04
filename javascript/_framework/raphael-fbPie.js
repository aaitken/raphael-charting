if(Raphael.amaPie){alert('conflict');}
else{
    Raphael.amaPie=function(opts){

        //private
        var amaPie={},//this is object whose properties we reveal and return
            data=opts.data,//[[int,label]...]
            paper,
            prnt=opts.prnt,//parent
            radi=opts.radi;//radius

        //amaPie definition
        if(prnt.raphael){//Raphael insertion
            console.log('raph');
        }
        else{//DOM insertion
            amaPie.paper=paper=Raphael(prnt,radi*2,radi*2);//the raphael 'canvas'
            amaPie.set=paper.set();//similar to native svg 'g' element - array of Raph objects
            amaPie.wedges=[];//collection of DOM elements
        }

        //pie slicing
        (function(){

            //private
            var arcFlags,//large-arc-flag and sweep-flag per http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
                dataLength=data.length,
                dataTotal=0,
                dataPct,
                i,
                L=0,//radian angle
                L2=function(mult){return L-(mult*Math.PI);},//translated radian angle per quadrant
                pnt0=2*radi+','+radi,
                pnt1,
                pth0='M'+radi+','+radi+'L',
                x,
                xget=function(angle,trig){x=Math[trig](angle)*radi;return x;},
                y=function(x){return Math.sqrt(Math.pow(radi,2)-Math.pow(x,2));};//pythag


            //data total
            for(i=0;i<dataLength;i++){
                dataTotal+=data[i][0];
            }
            
            //wedges
            for(i=0;i<dataLength;i++){
                dataPct=data[i][0]/dataTotal;
                arcFlags=dataPct>0.5?'1,1':'0,1';
                L+=(dataPct)*2*Math.PI;//2MathPI = 360 deg in radians
                pnt1=(function(){
                    if(L<=0.5*Math.PI){//1st quadrant
                        return (radi+xget(L,'cos'))+','+(radi-y(x));
                    }
                    else if(L<=Math.PI){//2nd quadrant
                        return (radi-xget(L2(0.5),'sin'))+','+(radi-y(x));
                    }
                    else if(L<=1.5*Math.PI){//3rd quadrant
                        return (radi-xget(L2(1),'cos'))+','+(radi+y(x));
                    }
                    else{//4th quadrant
                        return (radi+xget(L2(1.5),'sin'))+','+(radi+y(x));
                    }
                }());
                amaPie.set.push(paper.path(pth0+pnt1+'A'+radi+','+radi+' '+'0 '+arcFlags+' '+pnt0+'Z').attr({
                    stroke:opts.strk,
                    'stroke-width':opts.wdth,
                    fill:opts.fill
                }));
                amaPie.wedges[i]=amaPie.set[i].node;
                amaPie.wedges[i].label=data[i];//mutation adds original source data to DOM element
                pnt0=pnt1;
            }
        }());

        //scale down to avoid clipping and allow room for animation
        amaPie.set.scale(0.9,0.9,radi,radi);

        //reveal and return
        return {
            paper:amaPie.paper,
            set:amaPie.set,
            wedges:amaPie.wedges
        };
    }
}
