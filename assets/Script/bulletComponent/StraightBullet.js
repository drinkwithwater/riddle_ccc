const BulletBase=require("BulletBase");
const _=require("underscore");
const riddleUtil=require("riddleUtil");
cc.Class({
    extends: BulletBase,

    properties: {
        colideDelta:5,
        direct:cc.p(0,0),
        speed:{
            get:function(){
                return 60;
            }
        },
    },
    

    initByBulletManager:function(bulletManager,bulletId,bulletMiddle){
        this._super.apply(this,arguments);
        var selfPoint=this.flyPoint.point;
        var targetPoint=this.targetInter.getPoint();
        this.direct=cc.p(
            targetPoint.x-selfPoint.x,
            targetPoint.y-selfPoint.y
        );
    },
    colide:function(){
        var thisCell=this.flyPoint.cell;
        var observeCells=riddleUtil.radioRange(thisCell,1);
        var colideUnits=[];
        for(var i=0,l=observeCells.length;i<l;i++){
            var cell=observeCells[i];
            var unitInter=this.unitManager.unitInter$(cell);
            if(unitInter){
                if(unitInter.unitId==this.sourceInter.unitId){
                    // source unit
                    continue;
                }else if(unitInter.team==this.sourceInter.team){
                    // same team
                    continue;
                }else{
                    var delta=riddleUtil.euDistance(unitInter.getPoint(),this.flyPoint.point);
                    if(delta<=this.colideDelta){
                        colideUnits.push(unitInter);
                    }
                }
            }
        }
        var self=this;
        if(colideUnits.length>0){
            this.died=true;
            this.actionExplode(function(){
                self.bulletManager.removeBullet(self.bulletId)
            });
        }
    },

    update: function (dt) {
        if(this.died) return ;
        this.flyPoint.moveDirect(this.direct,this.speed*dt);
        this.flyPoint.updatePosition();
        if(!this.died) {
            this.colide();
        }
        if(!this.died){
            var passed=riddleUtil.maDistance(this.startPoint,this.flyPoint.point);
            if(passed>this.distance){
                this.died=true;
                this.bulletManager.removeBullet(this.bulletId);
            }
        }
    },

});