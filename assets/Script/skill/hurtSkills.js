var SkillBase=require("Skill").SkillBase;
var HurtSkill=cc.Class({
    extends:SkillBase,
    properties:{
        preTime:0.5,
        
        startFlag:false,
        targetInter:null,
    },
    cast:function(targetInter){
        //console.log("cast",new Date().getMilliseconds());
        this.unitInter.stealth=false;
        var bulletMiddle=this.unitSkill.createBulletMiddle();
        bulletMiddle.targetInter=targetInter;
        targetInter.onHurtByBack(bulletMiddle.sourceInter,bulletMiddle.harm);
    },
    bind:function(unit){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("hurt",this,this.onUnitHurt);
    },
    onUnitHurt:function(targetInter){
        this.cast(targetInter);
    }
});
module.exports={
    HurtSkill:HurtSkill,
}