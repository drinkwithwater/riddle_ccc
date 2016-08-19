const FlyPoint=require("FlyPoint");
const UnitManager=require("UnitManager");
const CellManager=require("CellManager");
const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        bulletId:-1,
        targetInter:null,

        flyPoint:{
            visible:false,
            get:function(){
                return this.getComponent("FlyPoint");
            }
        },

        unitManager:UnitManager,
        cellManager:CellManager,

        speed:100,
    },
    

    initByBulletManager:function(bulletManager,point,bulletId,targetInter){
        
        this.cellManager=bulletManager.cellManager;
        this.unitManager=bulletManager.unitManager;
        
        this.bulletId=bulletId;
        this.targetInter=targetInter;
        this.flyPoint.initByNode(this,point);
    },

    update: function (dt) {
        var targetInter=this.targetInter;
        this.flyPoint.moveDstPoint(targetInter.getPoint(),this.speed*dt);
        this.flyPoint.updatePosition();
    },

});
