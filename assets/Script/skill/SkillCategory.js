const Skill=require("Skill");
var CategoryToClass={
    HIT_NORMAL:Skill.HitSkill,
    STAND_NORMAL:Skill.StandSkill,
    MOVE_NORMAL:Skill.MoveSkill,
}
var skillAttr={
    HIT_NORMAL:{
        beforeCoolTime:1,
        afterCoolTime:1
    },
    STAND_NORMAL:{
        beforeCoolTime:1,
        afterCoolTime:1
    },
    MOVE_NORMAL:{
        beforeCoolTime:1,
        afterCoolTime:1
    },
    HURT_NORMAL:{
    }
}
module.exports={
    CategoryToClass:CategoryToClass
}
cc.Enum({
    HIT_NORMAL:1,
    STAND_NORMAL:2,
    MOVE_NORMAL:3,
});