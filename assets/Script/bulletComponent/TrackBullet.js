const BulletBase=require("BulletBase");
const FlyPoint=require("FlyPoint");
const UnitManager=require("UnitManager");
const CellManager=require("CellManager");
const _=require("underscore");
cc.Class({
    extends: BulletBase,

    properties: {
        target:null,
    },
    

    initByBulletManager:function(bulletManager,point,bulletId,targetInter){
        this._super.apply(this,arguments);
    },

    update: function (dt) {
        var targetInter=this.targetInter;
        this.flyPoint.moveDstPoint(targetInter.getPoint(),this.speed*dt);
        this.flyPoint.updatePosition();
    },

});

