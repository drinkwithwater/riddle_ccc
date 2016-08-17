const CellManager=require("CellManager");
const riddleUtil=require("riddleUtil");
const _=require("underscore");
const UnitConfigManager=require("UnitConfigManager");
cc.Class({
    extends: cc.Component,

    properties: {
        idCounter:1,
        idToUnit:{
            type:Object,
            visible:false,
            default:null,
        },
        cellToUnit:{
            type:Array,
            visible:false,
            default:null,
        },

        cellManager:{
            type:CellManager,
            visible:false,
            default:null,
        },
        
        battleField:{
            visible:false,
            default:null,
        },
        
        // init by unit config map
        unitTemplate: cc.Prefab,
        unitConfigManager:{
            type:UnitConfigManager,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        // do this in initByNode
    },

    // called by BattleFieldComponent
    initByNode:function(battleField){
        this.battleField=battleField;
        this.cellManager=battleField.cellManager;
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
        /*
        var sprite=this.node.getChildByName("testSprite");
        this.idToUnit[0]=sprite;
        this.cellToUnit[0][0]=sprite;
        sprite.getComponent("UnitBase").initByUnitManager(this,cc.p(0,0),0);
        */

        /*
        var sprite2=this.node.getChildByName("testSprite2");
        this.idToUnit[1]=sprite2;
        this.cellToUnit[5][5]=sprite2;
        sprite2.getComponent("UnitBase").initByUnitManager(this,cc.p(5,5),1);*/
        //this.createUnit(cc.p(5,5),"SOLDIER");
        this.initWithUnitConfig();
    },
    initWithUnitConfig:function(){
        var cellRange=this.cellManager.cellRange;
        for(var i=0;i<cellRange.x;i++){
            for(var j=0;j<cellRange.y;j++){
                var cell=cc.p(i,j);
                var unitConfig=this.unitConfigManager.getUnitConfigAt(cell);
                if(unitConfig){
                    unitConfig.cell=cell;
                    this.createUnit(unitConfig);
                }
            }
        }
    },
    createUnit:function(unitConfig){
        var cell=unitConfig.cell;
        var unitId=this.idCounter++;
        unitConfig.unitId=unitId;
        var unitNode=cc.instantiate(this.unitTemplate);
        this.idToUnit[unitId]=unitNode;
        this.cellToUnit[cell.x][cell.y]=unitNode;
        unitNode.getComponent("UnitBase").initByUnitManager(this,unitConfig);
        this.node.addChild(unitNode,0,unitId);
        return unitNode;
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
