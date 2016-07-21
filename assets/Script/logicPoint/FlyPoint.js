const BasePoint=require("BasePoint");
cc.Class({
    extends: BasePoint,
    properties: {
        nodeBase:null,
    },

    initByNode:function(nodeBase,point){
        var cellManager=nodeBase.cellManager;
        this.cellManager=cellManager;
        this.nodeBase=nodeBase;

        this.point.x=point.x;
        this.point.y=point.y;
        var cell=cellManager.pointToCell(point);
        this.cell.x=cell.x;
        this.cell.y=cell.y;
        this.updatePosition();
    },

    // Override
    changeCell:function(oldCell,newCell){
        // do nothing
    },

    moveDirect:function(direct,offset){
        var absxy=Math.abs(direct.x)+Math.abs(direct.y);
        var dx=offset*direct.x/absxy;
        var dy=offset*direct.y/absxy;
        this.point.x+=dx;
        this.point.y+=dy;

        this.updateCell();
    },
    moveDstPoint:function(dstPoint,offset){
        var dx=dstPoint.x-this.point.x;
        var dy=dstPoint.y-this.point.y;
        if(Math.abs(dx)+Math.abs(dy)>offset){
            this.moveDirect({x:dx,y:dy},offset);
        }else{
            this.point.x=dstPoint.x;
            this.point.y=dstPoint.y;
            this.updateCell();
        }
    }
});
