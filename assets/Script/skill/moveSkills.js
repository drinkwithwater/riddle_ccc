var SkillBase=require("Skill").SkillBase;
var MoveSkill=cc.Class({
    extends:SkillBase,
    properties:{
        coolTime:0,
    },
    bind:function(){
        this._super.apply(this,arguments);
        this.unitSkill.addListener("startMove",this,this.onUnitStartMove);
        this.unitSkill.addListener("updateMove",this,this.onUnitUpdateMove);
    },
    onUnitStartMove:function(){
        this.coolTime=1;
    },
    onUnitMoveUpdate:function(dt){
        this.coolTime-=dt;
        if(this.coolTime<=0){
            this.cast();
            this.coolTime=1;
        }
    },
});
module.exports={
    MoveSkill:MoveSkill
}