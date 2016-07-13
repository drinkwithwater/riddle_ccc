const CellManager=require("CellManager");
const riddleUtil=require("riddleUtil");
cc.Class({
    extends: cc.Component,

    properties: {
        cell:{
            type:cc.Vec2,
            default:cc.p(0,0),
        },
        point:{
            type:cc.Vec2,
            default:cc.p(0,0),
        },
        cellManager:{
            type:CellManager,
            default:null
        }
    },

    // abstract, to be implemented
    initByNode:function(ownerNode,cell,point){
        /*
        this.cell.x=cell.x;
        this.cell.y=cell.y;
        if(!cc.js.isObject(point)){
            var point=cellManager.cellToPoint(cell);
        }
        this.point.x=point.x;
        this.point.y=point.y;
        this.cellManager=cellManager;*/
        console.log("error:getCellManager is not implemented");
    },

    // abstract, to be implemented
    getCellManager:function(){
        /*
        if(this.cellManager==null){
            this.cellManager=this.getComponent("UnitBase");
        }
        return this.cellManager;*/
        console.log("error:getCellManager is not implemented");
        return null;
    },

    changeCell:function(oldCell,newCell){
        console.log("error:getCellManager is not implemented");
    },

    // update cell by point, private function
    updateCell:function(){
        var newCell=this.getCellManager().pointToCell(this.point);
        var oldCell=this.cell;
        if(oldCell.x!=newCell.x||oldCell.y!=newCell.y){
            this.changeCell(oldCell,newCell);
        }
        this.cell=newCell;
    },

    cellFarFrom:function(dstCell){
        return riddleUtil.maDistance(this.cell,dstCell);
    },
    pointFarFrom:function(dstPoint){
        return riddleUtil.maDistance(this.point,dstPoint);
    },
});
