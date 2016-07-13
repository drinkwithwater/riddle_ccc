const CellManager=require("CellManager");
const BattleFieldComponent=require("BattleFieldComponent");
cc.Class({
    extends: cc.Component,

    properties: {
        idToUnit:{
            type:Object,
            default:null,
        },
        cellToUnit:{
            type:Array,
            default:null,
        },

        cellManager:{
            type:CellManager,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
    },

    // called by BattleFieldComponent
    initByNode:function(){
        // init idToUnit
        this.idToUnit={};
        // init cellToUnit
        var cellRange=this.cellManager.cellRange;
        this.cellToUnit=new Array(cellRange.x);
        for(var x=0;x<cellRange.x;x++){
            this.cellToUnit[x]=new Array(cellRange.y);
        }
        this.initByTest();
    },
    initByTest:function(){
        var sprite=this.node.getChildByName("testSprite");
        this.idToUnit[0]=sprite;
        this.cellToUnit[0][0]=sprite;
        sprite.getComponent("UnitBase").initByUnitManager(this,cc.p(0,0),0);
    },
    createUnit:function(){
        // todo
    },

    canMove:function(cell){
        var unit=this.unit$(cell);
        if(cc.js.isObject(unit)){
            return false;
        }else{
            return true;
        }
    },

    unitChangeCell:function(unit,oldCell,newCell){
        this.cellToUnit[oldCell.x][oldCell.y]=undefined;
        this.cellToUnit[newCell.x][newCell.y]=unit;
    },

    unit$:function(a,b){
        if(arguments.length==1){
            if(cc.js.isString(a)||cc.js.isNumber(a)){
                return this.idToUnit[a];
            }else if(cc.js.isObject(a)){
                return this.unit$(a.x,a.y);
            }else{
                return null;
            }
        }else if(arguments.length==2){
            var xLine=this.cellToUnit[a];
            if(cc.js.isArray(xLine)){
                return xLine[b];
            }else{
                return null;
            }
        }else{
            return null;
        }
    },
});
