const Skill=require("Skill");
const hitSkills=require("hitSkills");
const moveSkills=require("moveSkills");
const standSkills=require("standSkills");
const hurtSkills=require("hurtSkills");
var CategoryToClass={
    HIT:hitSkills.HitSkill,
    SHOT:hitSkills.ShotSkill,
    STAND:standSkills.StandSkill,
    TRACK_STAND:standSkills.TrackStandSkill,
    MOVE:moveSkills.MoveSkill,
    STEALTH:hitSkills.StealthSkill,
    HURT:hurtSkills.HurtSkill
}
var Category=cc.Enum({
    /*
    HIT:1,
    SHOT:2,
    STAND:3,
    MOVE:4,*/
});
module.exports={
    CategoryToClass:CategoryToClass,
}