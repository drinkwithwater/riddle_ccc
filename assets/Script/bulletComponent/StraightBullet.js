const BulletBase=require("BulletBase");
const _=require("underscore");
cc.Class({
    extends: BulletBase,

    properties: {
        direct:cc.p(0,0),
    },
    

    initByBulletManager:function(bulletManager,point,bulletId,targetInter){
        this._super.apply(this,arguments);
        this.speed=10;
        var unitPoint=targetInter.getPoint();
        this.direct=cc.p(
            unitPoint.x-point.x,
            unitPoint.y-point.y
        );
    },

    update: function (dt) {
        this.flyPoint.moveDirect(this.direct,this.speed*dt);
        this.flyPoint.updatePosition();
    },

});