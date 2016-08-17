const CellManager=require("CellManager");
const riddleUtil=require("riddleUtil");
cc.Class({
    extends: cc.Component,

    properties: {
        cell:{
            visible:false,
            default:cc.p(0,0),
        },
        point:{
            visible:false,
            default:cc.p(0,0),
        },
        cellManager:{
            type:CellManager,
            visible:false,
            default:null
        }
    },

    // abstract, to be implemented
    initByNode:function(ownerNode,cell,point){
        console.log("error:initByNode is not implemented");
    },

    changeCell:function(oldCell,newCell){
        console.log("error:changeCell is not implemented");
    },

    // update node position by point
    updatePosition:function(){
        var positionAR=this.cellManager.pointToPositionAR(this.point);
        this.node.attr({
            x:positionAR.x,
            y:positionAR.y
        });
    },

    // update cell by point, private function
    updateCell:function(){
        var newCell=this.cellManager.pointToCell(this.point);
        var oldCell=this.cell;
        if(oldCell.x!=newCell.x||oldCell.y!=newCell.y){
            this.changeCell(oldCell,newCell);
        }
        this.cell=newCell;
        this.updatePosition();
    },

    cellFarFrom:function(dstCell){
        return riddleUtil.maDistance(this.cell,dstCell);
    },
    pointFarFrom:function(dstPoint){
        return riddleUtil.maDistance(this.point,dstPoint);
    },
});
