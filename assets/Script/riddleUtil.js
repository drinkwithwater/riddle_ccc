var riddleUtil={
    isObject:function(obj){
        var type=typeof obj;
        return type==='function'||type==='object'&&!!obj;
    },
    maDistance:function(pa,pb){
        var abs=Math.abs;
        return abs(pa.x-pb.x)+abs(pa.y-pb.y);
    },
    euDistance:function(pa,pb){
        var dx=pa.x-pb.x;
        var dy=pa.y-pb.y;
        return Math.sqrt(dx*dx+dy*dy);
    },
    shortestPath:function(from,to,canMoveFunc){
        var src={i:from.i, j:from.j};
        var dst={i:to.i, j:to.j};

        var hash=function(node){
            return node.i*1000+node.j;
        }
        var reHash=function(h){
            return {
                i:Math.floor(h/1000),
                j:h%1000
            }
        }
        src.g=0;
        src.h=gPoint.maDistance(src,dst);
        src.pre=null;
        var openFirst=0;
        var openLast=0;
        var open=[src];
        var getSmallestIndex=function(){
            var temp=open[openFirst];
            var index=openFirst;
            for(var i=openFirst+1;i<=openLast;i++){
                var point=open[i];
                if(point.g+point.h<temp.g+temp.h){
                    temp=point;
                    index=i;
                }
            }
            return index;
        }
        var closeHash={};
        var self=this;
        var expand=function(index){
            var point=open[index];
            var expandList=[
                {i:point.i+1,j:point.j},
                {i:point.i-1,j:point.j},
                {i:point.i,j:point.j+1},
                {i:point.i,j:point.j-1}
            ];
            expandList=_.filter(expandList,function(newPoint){
                var i=newPoint.i;
                var j=newPoint.j;
                if(!canMoveFunc(i,j)) return false;
                if(closeHash[hash(point)]) return false;
                return true;
            });
            _.each(expandList,function(newPoint){
                newPoint.g=point.g+1;
                newPoint.h=gPoint.maDistance(newPoint,dst);
                newPoint.pre=point;
                open.push(newPoint);
                openLast++;
            });
            open[index]=open[openFirst];
            open[openFirst]=point;
            openFirst++;
            closeHash[hash(point)]=point;
        }
        while(openFirst<=openLast){
            var chooseIndex=getSmallestIndex();
            var choose=open[chooseIndex];
            if(choose.h==1){
                var re=[dst];
                var temp=choose;
                while(true){
                    re.push(temp);
                    temp=temp.pre;
                    if(temp==null){
                        break;
                    }
                }
                return re.reverse();
            }else{
                expand(chooseIndex);
            }
        }
        return [];
    },
    test:{
    }
}
module.exports=riddleUtil;
