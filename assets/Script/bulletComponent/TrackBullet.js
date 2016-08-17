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
    

    initByBulletManager:function(bulletManager,point,bulletId,targetId){
        this._super.apply(this,arguments);
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

