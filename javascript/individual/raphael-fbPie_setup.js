(function(){

    //private
    var chart=GNS.pie.chart,
        mths=GNS.pie.mths;

    for (var i=0;i<chart.set.length;i++){

    //click
    chart.wedges[i].addEventListener('click',(function(j){
        return function(){
            for(var i=0;i<chart.wedges.length;i++){
                $(chart.wedges[i]).unbind();
            }
            mths.rotate(j);
            $('#pieChart').addClass('active');
        };
    }(i)));

    //hover
    $(chart.wedges[i]).hover(
        (function(j){
            return function(){
                mths.pull(j,'outward');

            };
        }(i)),
        (function(j){
            return function(){
                mths.pull(j,'inward');
            };
        }(i))
    )
    }

    var style=$(document.createElement('style')).text('\
    path{cursor:pointer}\
    .active path{cursor:default}\
    ').prependTo($('svg:eq(0)'))
}());


