var SkillBase=cc.Class({
    name:"SkillBase",
    properties:{
        unit:null,
        unitBase:null,
        unitSkill:null,
    },
    ctor:function(){
    },
    bind:function(unit){
        this.unit=unit;
        this.unitSkill=this.unit.getComponent("UnitSkill");
        this.unitBase=this.unit.getComponent("UnitBase");
    },
    cast:function(){
        console.log("cast skill");
    },
    update:function(dt){
    }
});
module.exports={
    SkillBase:SkillBase,
}