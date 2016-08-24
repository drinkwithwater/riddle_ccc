var SkillBase=require("Skill").SkillBase;
var HitSkill=cc.Class({
    extends:SkillBase,
    properties:{
        damageCoe:1,
        preTime:0.5,
        
        startFlag:false,
        targetInter:null,
    },
    cast:function(targetInter){
        //console.log("cast",new Date().getMilliseconds());
        this.unitInter.stealth=false;
        var bulletMiddle=this.unitSkill.createBulletMiddle();
        bulletMiddle.targetInter=targetInter;
        this.unitBase.bulletManager.skillAttackNoBullet(bulletMiddle);
    },
    bind:function(unit){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("hit",this,this.onUnitHit);
        this.unitSkill.addListener("update",this,this.onUnitUpdate);
    },
    onUnitHit:function(targetInter){
        if(!this.startFlag){
            //console.log("hit",new Date().getMilliseconds());
            this.unitSkill.attackLock();
            this.preTime=0.5;
            this.startFlag=true;
            this.targetInter=targetInter;
        }else{
            //console.log("empty hit");
        }
    },
    onUnitUpdate:function(dt){
        if(this.startFlag){
            if(this.preTime<=0){
                this.cast(this.targetInter);
                this.startFlag=false;
                this.preTime=0.5;
                this.targetInter=null;
                this.unitSkill.attackUnlock();
            }else{
                this.preTime-=dt;
            }
        }
    },
});
var ShotSkill=cc.Class({
    extends:SkillBase,
    properties:{
        damageCoe:1,
        preTime:0.5,
        
        startFlag:false,
        targetInter:null,
    },
    cast:function(){
        //this.unitBase.bulletManager.skillCreateStraightBullet(this.unit,this.targetInter)
    },
    bind:function(unit){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("hit",this,this.onUnitHit);
        this.unitSkill.addListener("update",this,this.onUnitUpdate);
    },
    onUnitHit:function(targetInter){
        if(this.startFlag){
            return ;
        }else{
            this.unitSkill.attackLock();
            this.preTime=0.5;
            this.startFlag=true;
            this.targetInter=targetInter;
        }
    },
    onUnitUpdate:function(dt){
        if(this.startFlag){
            if(this.preTime<=0){
                this.cast();
                this.startFlag=false;
                this.preTime=0.5;
                this.targetInter=null;
                this.unitSkill.attackUnlock();
            }else{
                this.preTime-=dt;
            }
        }
    },
});
var StealthSkill=cc.Class({
    extends:SkillBase,
    properties:{
    },
    cast:function(){
    },
    bind:function(unit){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("init",this,this.onUnitInit);
    },
    onUnitInit:function(){
        this.unitInter.stealth=true;
    },
});
module.exports={
    HitSkill:HitSkill,
    ShotSkill:ShotSkill,
    StealthSkill:StealthSkill
}