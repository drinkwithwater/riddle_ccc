const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
const BulletManager=require("BulletManager");
cc.Class({
    extends: cc.Component,

    properties: {
        cellManager:{
            type:CellManager,
            default:null,
        },
        unitManager:{
            type:UnitManager,
            default:null,
        },
        bulletManager:{
            type:BulletManager,
            default:null,
        },
        timeSum:{
            default:0
        },
    },

    // use this for initialization
    onLoad: function () {
        this.loadMap()
    },

    loadMap:function(){
        this.cellManager.initByNode(this);
        this.unitManager.initByNode(this);
        this.bulletManager.initByNode(this);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timeSum+=dt;
        if(this.timeSum>1){
            this.timeSum-=1;
        }
    },
    
});
