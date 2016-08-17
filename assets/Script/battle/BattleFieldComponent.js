const riddleUtil=require("riddleUtil");
const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
const BulletManager=require("BulletManager");
const UnitConfigManager=require("UnitConfigManager");
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
        unitConfigManager:{
            type:UnitConfigManager,
            default:null,
        },
        bulletManager:{
            type:BulletManager,
            default:null,
        },
        timeSum:{
            visible:false,
            default:0
        },
    },

    // use this for initialization
    onLoad: function () {
        this.loadMap()
    },
    
    riddleTestBind:function(){
        riddleUtil.test.battleNode=this.node;
        riddleUtil.test.unitConfigLayer=this.node.getChildByName("mapLayer").getComponent("cc.TiledMap");
        riddleUtil.test.cellManager=this.cellManager;
        riddleUtil.test.unitManager=this.unitManager;
        riddleUtil.test.bulletManager=this.bulletManager;
        riddleUtil.test.unitConfig=this.node.getChildByName("mapLayer").getComponent("UnitConfigManager");
    },

    loadMap:function(){
        this.cellManager.initByNode(this);
        this.bulletManager.initByNode(this);
        this.unitConfigManager.initByNode(this);
        this.unitManager.initByNode(this);
        this.riddleTestBind();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timeSum+=dt;
        if(this.timeSum>1){
            this.timeSum-=1;
        }
    },
    
});
