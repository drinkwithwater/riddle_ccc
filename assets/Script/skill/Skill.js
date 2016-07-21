var Base=cc.Class();
var SkillBase=cc.Class({
    name:"SkillBase",
    extends:Base,
    properties:{
        unit:null,
        unitAttack:null,
        bulletManager:null,
    },
    ctor:function(){
        this.unit=arguments[0];
        this.unitAttack=this.unit.getComponent("UnitAttack");
        this.bulletManager=this.unitAttack.bulletManager;
    },
    standUpdate:function(dt){
    },
    moveUpdate:function(dt){
    },
    cast:function(){
        console.log("cast skill");
        this.bulletManager.skillCreateBullet(this.unit,this.targetId)
    },
    update:function(dt){
    }
});

var hitState={
    BEFORE:1,
    AFTER:2,
    IDLE:3,
}
var HitSkill=cc.Class({
    extends:SkillBase,
    properties:{
        damageCoe:1,
        preTime:0.5,
        
        startFlag:false,
        targetId:null,
    },
    onUnitHit:function(targetId){
        this.unitAttack.attackLock();
        this.preTime=0.5;
        this.startFlag=true;
        this.targetId=targetId;
    },
    update:function(dt){
        if(this.startFlag){
            if(this.preTime<=0){
                this.cast();
                this.startFlag=false;
                this.preTime=0.5;
                this.targetId=null;
                this.unitAttack.attackUnlock();
            }else{
                this.preTime-=dt;
            }
        }
    },
});
var MoveSkill=cc.Class({
    extends:SkillBase,
    properties:{
        beforeCoolTime:0,
        afterCoolTime:0,
        state:hitState.BEFORE,
    },
    moveUpdate:function(dt){
        this.coolTime-=dt;
        if(this.coolTime<=0){
            this.cast();
            this.coolTime=1;
        }
    }
});
var StandSkill=cc.Class({
    extends:SkillBase,
    properties:{
        coolTime:0,
        state:hitState.BEFORE,
    },
    standUpdate:function(dt){
        this.coolTime-=dt;
        if(this.coolTime<=0){
            this.cast();
            this.coolTime=1;
        }
    },
});
module.exports={
    SkillBase:SkillBase,
    HitSkill:HitSkill
}
