const SlidePoint=require("SlidePoint");
const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
cc.Class({
    extends: cc.Component,

    properties: {
        unitId:{
            type:Number,
            default:0,
        },
        cellManager:{
            type:CellManager,
            default:null,
        },
        UnitManager:{
            type:UnitManager,
            default:null,
        },
        initFinished:false,
    },

    // use this for initialization
    onLoad: function () {
    },

    initByUnitManager:function(unitManager,cell,id){
        var cellManager=unitManager.cellManager;
        this.cellManager=cellManager;
        this.unitManager=unitManager;
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
