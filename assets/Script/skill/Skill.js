var SkillType={
    NONE:0,
    HIT:1,
    MOVE:2,
    STAND:3,
    HURT:4,
}
var SkillBase=riddleUtil.Class.extend({
    type:SkillType.NONE,
    constructor:function(){
        this._super();
    },
    update:function(dt){
    },
});
var hitState={
    BEFORE:1,
    AFTER:2,
    IDLE:3,
}
var HitSkill=SkillBase.extend({
    type:SkillType.HIT,
    unitBase:null,
    beforeCoolTime:0,
    afterCoolTime:0,
    state:hitState.BEFORE,
    constructor:function(){
        this._super();
    },
    update:function(dt){
        switch(this.state){
            case hitState.BEFORE:
                this.beforeCoolTime--;
                if(this.beforeCoolTime==0){
                    this.hitFunc();
                    this.state=hitState.AFTER;
                }
                break;
            case hitState.AFTER:
                this.afterCoolTime--;
                if(this.afterCoolTime==0){
                    this.state=hitState.IDLE;
                }
                break;
            case hitState.IDLE:
                break;
            default:
                break;
        }
    },
    hitFunc=function(){
    },
});
module.exports={
    SkillType:SkillType,
    SkillBase:SkillBase
}
