const FlyPoint=require("FlyPoint");
const UnitManager=require("UnitManager");
const CellManager=require("CellManager");
const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        bulletId:-1,
        sourceInter:null,
        targetInter:null,

        startPoint:null,
        flyPoint:{
            visible:false,
            get:function(){
                return this.getComponent("FlyPoint");
            }
        },

        unitManager:UnitManager,
        cellManager:CellManager,
        bulletManager:null,

        harm:0,
        distance:0,
        
        died:false,
    },
    
    actionExplode:function(func){
        var node=this.node;
        node.runAction(cc.sequence(
            cc.scaleTo(0.1,2,2),
            cc.callFunc(func)
        ));
    },

    initByBulletManager:function(bulletManager,bulletId,bulletMiddle){
        
        this.cellManager=bulletManager.cellManager;
        this.unitManager=bulletManager.unitManager;
        this.bulletManager=bulletManager;
        
        this.bulletId=bulletId;
        
        this.sourceInter=bulletMiddle.sourceInter;
        this.targetInter=bulletMiddle.targetInter;
        this.harm=bulletMiddle.harm;
        this.distance=bulletMiddle.distance;
        
        
        this.startPoint=bulletMiddle.point;
        this.flyPoint.initByNode(this,bulletMiddle.point);
    },

});
