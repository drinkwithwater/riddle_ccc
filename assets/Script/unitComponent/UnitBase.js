const SlidePoint=require("SlidePoint");
const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
cc.Class({
    extends: cc.Component,

    properties: {
        unitId:{
            type:cc.Integer,
            visible:false,
            default:0,
        },
        cellManager:{
            type:CellManager,
            visible:false,
            default:null,
        },
        unitManager:{
            type:UnitManager,
            visible:false,
            default:null,
        },
        initFinished:{
            visible:false,
            default:false
        },
    },


    initByUnitManager:function(unitManager,unitConfig){
        var cell=unitConfig.cell;
        var unitId=unitConfig.unitId;
        var category=unitConfig.category;
        var cellManager=unitManager.cellManager;
        this.cellManager=cellManager;
        this.unitManager=unitManager;
        this.battleField=unitManager.battleField;
        this.bulletManager=this.battleField.bulletManager;
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
        
        this.getComponent("UnitCategory").initWithConfig(unitConfig);
        
        // set finish flag
        this.initFinished=true;

    },

    cellChangeHandler:function(oldCell,newCell){
        this.unitManager.unitChangeCell(this.node,oldCell,newCell);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
