const FlyPoint=require("FlyPoint");
const UnitManager=require("UnitManager");
const CellManager=require("CellManager");
const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        bulletId:-1,
        targetId:-1,

        flyPoint:FlyPoint,

        unitManager:UnitManager,
        cellManager:CellManager,

        speed:100,
    },
    

    initByBulletManager:function(bulletManager,point,bulletId,targetId){
        this.flyPoint=this.getComponent("FlyPoint");
        
        this.cellManager=bulletManager.cellManager;
        this.unitManager=bulletManager.unitManager;
        
        this.bulletId=bulletId;
        this.targetId=targetId;
        this.flyPoint.initByNode(this,point);
    },

    update: function (dt) {
        var target=this.unitManager.unit$(this.targetId);
        if(!_.isObject(target)){
            return ;
        }else{
            this.flyPoint.moveDstPoint(target.getComponent("SlidePoint").point,this.speed*dt);
            this.flyPoint.updatePosition();
        }
    },
});
