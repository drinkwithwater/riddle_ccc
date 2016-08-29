const riddleUtil=require("riddleUtil");
const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
const BulletManager=require("BulletManager");
const UnitConfigManager=require("UnitConfigManager");
const DrawLayer=require("DrawLayer");
cc.Class({
    extends: cc.Component,

    properties: {
        gameCtrl:null,
        tiledMap:{
            type:cc.TiledMap,
            default:null,
        },
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
        drawLayer:{
            type:DrawLayer,
            default:null,
        },
        timeSum:{
            visible:false,
            default:0
        },
    },

    loadMapByUrl:function(url){
        var self=this;
        cc.loader.loadRes(url,cc.TiledMapAsset,function(err,tmxAsset){
            if(err){
                console.log(err);
            }
            self.tiledMap.tmxAsset=tmxAsset;
            self.loadMap();
        });
    },
    // use this for initialization
    onLoad: function () {
        //this.loadMap()
    },
    
    riddleTestBind:function(){
        riddleUtil.test.battleNode=this.node;
        riddleUtil.test.unitConfigLayer=this.node.getChildByName("mapLayer").getComponent("cc.TiledMap");
        riddleUtil.test.cellManager=this.cellManager;
        riddleUtil.test.unitManager=this.unitManager;
        riddleUtil.test.bulletManager=this.bulletManager;
        riddleUtil.test.unitConfig=this.node.getChildByName("mapLayer").getComponent("UnitConfigManager");
        riddleUtil.test.drawLayer=this.drawLayer;
    },

    loadMap:function(){
        this.cellManager.initByNode(this);
        this.bulletManager.initByNode(this);
        this.unitConfigManager.initByNode(this);
        this.unitManager.initByNode(this);
        this.drawLayer.initByNode(this);
        this.riddleTestBind();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timeSum+=dt;
        if(this.timeSum>1){
            this.timeSum-=1;
        }
    },

    gameWin:function(){
        if(this.gameCtrl){
            this.gameCtrl.win();
        }
    }
    
});
