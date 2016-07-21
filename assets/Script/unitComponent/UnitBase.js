const SlidePoint=require("SlidePoint");
const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
cc.Class({
    extends: cc.Component,

    properties: {
        unitId:{
            type:cc.Integer,
            default:0,
        },
        cellManager:{
            type:CellManager,
            default:null,
        },
        unitManager:{
            type:UnitManager,
            default:null,
        },
        initFinished:false,
    },


    initByUnitManager:function(unitManager,cell,unitId){
        var cellManager=unitManager.cellManager;
        this.cellManager=cellManager;
        this.unitManager=unitManager;
        this.battleField=unitManager.battleField;
        // set unit id
        this.unitId=unitId;
        // set logic point
        this.getComponent("SlidePoint").initByNode(this,cell);
        // set sprite position
        var positionAR=cellManager.cellToPositionAR(cell);
        this.node.attr({
            x:positionAR.x,
            y:positionAR.y
        });
        // set finish flag
        this.initFinished=true;
    },

    attr:function(key){
        if(this.hasOwnProperty(key)){
            return this[key];
        }else{
            return null;
        }
    },
    cellChangeHandler:function(oldCell,newCell){
        this.unitManager.unitChangeCell(this.node,oldCell,newCell);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
