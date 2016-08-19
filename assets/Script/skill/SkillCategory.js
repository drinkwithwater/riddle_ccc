const Skill=require("Skill");
const hitSkills=require("hitSkills");
const moveSkills=require("moveSkills");
const standSkills=require("standSkills");
var CategoryToClass={
    HIT:hitSkills.HitSkill,
    SHOT:hitSkills.ShotSkill,
    STAND:standSkills.StandSkill,
    MOVE:moveSkills.MoveSkill,
}
var Category=cc.Enum({
    HIT:1,
    SHOT:2,
    STAND:3,
    MOVE:4,
});
module.exports={
    CategoryToClass:CategoryToClass,
    Category:Category
}