//Global namespace - no clobbering
var GNS=GNS||{};

GNS.namespace=function(name){
    var parts=name.split('.'),
        parent=GNS,
        i;

    //strip redundant leading global
    if(parts[0]==='GNS'){
        parts=parts.slice(1);
    }

    for(i=0;i<parts.length;i++){
        //create property if it doesn't exist
        if(typeof parent[parts[i]]==='undefined'){
            parent[parts[i]]={};
        }
        parent=parent[parts[i]];
    }
    return parent;
};