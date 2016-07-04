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
            default:null,
        },
        cellManager:{
            type:CellManager,
            default:null
        }
    },

    // update cell by point, private function
    updateCell:function(){
        var newCell=this.cellManager.pointToCell(this.point);
        this.cell.x=newCell.x;
        this.cell.y=newCell.y;
    },

    cellFarFrom:function(dstCell){
        return riddleUtil.maDistance(this.cell,dstCell);
    },
    pointFarFrom:function(dstPoint){
        return riddleUtil.maDistance(this.point,dstPoint);
    },
});
