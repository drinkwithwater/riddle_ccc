var SkillBase=require("Skill").SkillBase;
var COOL_TIME=1.0;
var StraightStandSkill=cc.Class({
    extends:SkillBase,
    properties:{
        coolTime:COOL_TIME,
    },
    bind:function(){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("startStand",this,this.onUnitStartStand);
        this.unitSkill.addListener("updateStand",this,this.onUnitUpdateStand);
        this.unitSkill.addListener("observeEnemies",this,this.onUnitObserveEnemies);
    },
    cast:function(target){
        this.unitInter.stealth=false;
        var bulletMiddle=this.unitSkill.createBulletMiddle();
        bulletMiddle.targetInter=target;
        this.unitBase.bulletManager.skillCreateStraightBullet(bulletMiddle);
    },
    onUnitObserveEnemies:function(targets){
        if(this.coolTime<=0){
            this.cast(targets[0]);
            this.coolTime=COOL_TIME;
        }
    },
    onUnitStartStand:function(){
        this.coolTime=COOL_TIME;
    },
    onUnitUpdateStand:function(dt){
        this.coolTime-=dt;
        if(this.coolTime<=0){
            this.coolTime=0;
        }
    },
});
var TrackStandSkill=cc.Class({
    extends:SkillBase,
    properties:{
        coolTime:COOL_TIME,
    },
    bind:function(){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("startStand",this,this.onUnitStartStand);
        this.unitSkill.addListener("updateStand",this,this.onUnitUpdateStand);
        this.unitSkill.addListener("observeEnemies",this,this.onUnitObserveEnemies);
    },
    cast:function(target){
        this.unitInter.stealth=false;
        var bulletMiddle=this.unitSkill.createBulletMiddle();
        bulletMiddle.targetInter=target;
        this.unitBase.bulletManager.skillCreateTrackBullet(bulletMiddle);
    },
    onUnitObserveEnemies:function(targets){
        if(this.coolTime<=0){
            this.cast(targets[0]);
            this.coolTime=COOL_TIME;
        }
    },
    onUnitStartStand:function(){
        this.coolTime=COOL_TIME;
    },
    onUnitUpdateStand:function(dt){
        this.coolTime-=dt;
        if(this.coolTime<=0){
            this.coolTime=0;
        }
    },
});
module.exports={
    StandSkill:StraightStandSkill,
    TrackStandSkill:TrackStandSkill
}