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
        battleField:{
            type:BattleFieldComponent,
            default:null,
        }
    },

    // use this for initialization
    onLoad: function () {
        // init idToUnit
        this.idToUnit={};
        // init cellToUnit
        var cellRange=this.battleField.cellRange;
        this.cellToUnit=new Array(cellRange.x);
        for(var x=0;x<cellRange.x;x++){
            this.cellToUnit[x]=new Array(cellRange.y);
        }
    },

    unit$:function(a,b){
        if(arguments.length==1){
            if(cc.js.isString(a)||cc.js.isNumber(a)){
                return this.idToUnit[a];
            }else if(cc.js.isObject(a)){
                return this.unit$(a.x,a.y);
            }
        }else if(arguments.length==2){
            var xLine=this.cellToUnit[a];
            if(!cc.js.isObject(xLine)){
                return null;
            }else{
                return xLine[b];
            }
        }
        return null;
    },
});
