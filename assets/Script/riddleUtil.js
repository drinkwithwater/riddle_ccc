const _=require("underscore")
var riddleUtil={
    xyWrap:function(pos,y){
        if(y){
            return {
                x:pos,
                y:y
            }
        }else{
            return pos;
        }
    },
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
        var maDistance=this.maDistance;
        var src={x:from.x, y:from.y};
        var dst={x:to.x, y:to.y};

        var hash=function(node){
            return node.x*1000+node.y;
        }
        var reHash=function(h){
            return {
                x:Math.floor(h/1000),
                y:h%1000
            }
        }
        src.g=0;
        src.h=maDistance(src,dst);
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
                {x:point.x+1,y:point.y},
                {x:point.x-1,y:point.y},
                {x:point.x,y:point.y+1},
                {x:point.x,y:point.y-1}
            ];
            expandList=_.filter(expandList,function(newPoint){
                var x=newPoint.x;
                var y=newPoint.y;
                if(!canMoveFunc({x:x,y:y})) return false;
                if(closeHash[hash(point)]) return false;
                return true;
            });
            _.each(expandList,function(newPoint){
                newPoint.g=point.g+1;
                newPoint.h=maDistance(newPoint,dst);
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
                return _.map(re.reverse(),function(point){
                    return cc.p(point.x,point.y);
                });
            }else{
                expand(chooseIndex);
            }
        }
        return [];
    },
    test:{
        dosth:function(){
            var bm=this.bulletManager;
            var unit=this.unit;
            return bm.unitCreateBullet(unit,1);
        }
    },
    _:_,
}

module.exports=riddleUtil;
