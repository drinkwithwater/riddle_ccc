var SkillType={
    HIT:1,
    MOVE:2,
    STAND:3,
    HURT:4,
}
var SkillObject=function(type){
    this.type=type;
}
var HitSkill=function(){
    this.type=SkillType.HIT;
    this.beforeCoolTime=1;
    this.afterCoolTime=1;
    this.update=function(dt){
    }
}
module.exports={
    SkillType:SkillType,
    SkillObject:SkillObject
}