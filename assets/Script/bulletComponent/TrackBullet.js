const BulletBase=require("BulletBase");
const FlyPoint=require("FlyPoint");
const UnitManager=require("UnitManager");
const CellManager=require("CellManager");
const _=require("underscore");
const riddleUtil=require("riddleUtil");
cc.Class({
    extends: BulletBase,

    properties: {
        colideDelta:1,
        speed:{
            get:function(){
                return 120;
            }
        },
    },
    

    initByBulletManager:function(bulletManager,bulletId,bulletMiddle){
        this._super.apply(this,arguments);
    },

    update: function (dt) {
        if(this.died) return ;
        var point=this.targetInter.getPoint();
        var thisPoint=this.flyPoint.point;
        var delta=riddleUtil.euDistance(thisPoint,point);
        if(delta<this.colideDelta){
            this.died=true;
            var self=this;
            this.actionExplode(function(){
                self.bulletManager.removeBullet(self.bulletId)
            });
        }else{
            this.flyPoint.moveDstPoint(point,this.speed*dt);
            this.flyPoint.updatePosition();
        }
    },

});

