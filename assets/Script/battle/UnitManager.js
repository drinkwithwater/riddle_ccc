const CellManager=require("CellManager");
const riddleUtil=require("riddleUtil");
const _=require("underscore");
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
        battleField:null,
    },

    // use this for initialization
    onLoad: function () {
    },

    // called by BattleFieldComponent
    initByNode:function(battleField){
        this.battleField=battleField;
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
        riddleUtil.test.unit=sprite;

        var sprite2=this.node.getChildByName("testSprite2");
        this.idToUnit[1]=sprite2;
        this.cellToUnit[5][5]=sprite2;
        sprite2.getComponent("UnitBase").initByUnitManager(this,cc.p(5,5),1);
    },
    createUnit:function(){
        // todo
    },

    canMove:function(cell){
        var unit=this.unit$(cell);
        if(_.isObject(unit)){
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
            if(_.isString(a)||_.isNumber(a)){
                return this.idToUnit[a];
            }else if(_.isObject(a)){
                return this.unit$(a.x,a.y);
            }else{
                return null;
            }
        }else if(arguments.length==2){
            var xLine=this.cellToUnit[a];
            if(_.isArray(xLine)){
                return xLine[b];
            }else{
                return null;
            }
        }else{
            return null;
        }
    },
});
