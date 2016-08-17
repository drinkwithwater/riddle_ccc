const SkillCategory=require("SkillCategory");
var Category=cc.Enum({
    SOLDIER:1,
    TOWER:2,
    ARROW:3,
    SWORD:4,
    HORSE:5,
    KNIFE:6,
    STICK:7,
    BOW:8,
    AXE:9,
    WING:10,
});
var CategoryToStatic={
    SOLDIER:{
        hp:2,
        ap:1,
        speed:10,
        skill:["HIT_NORMAL"],
    },
    TOWER:{
        hp:2,
        ap:1,
        speed:10,
        skill:["STAND_NORMAL"],
    },
    ARROW:{
        hp:2,
        ap:1,
        speed:10,
        skill:["STAND_NORMAL"],
    },
    SWORD:{
        hp:2,
        ap:1,
        speed:10,
        skill:["STAND_NORMAL"],
    },
    HORSE:{
        hp:2,
        ap:1,
        speed:10,
        skill:["STAND_NORMAL"],
    },
    KNIFE:6,
    STICK:7,
    BOW:8,
    AXE:9,
    WING:10,
}
// url in resources/*, type: cc.SpriteFrame
var CategoryToUrl={
    SOLDIER:"unit/soldier",
    TOWER:"unit/tower",
    ARROW:"unit/arrow",
    SWORD:"unit/sword",
    HORSE:"unit/horse",
    KNIFE:"unit/knife",
    STICK:"unit/stick",
    BOW:"unit/bow",
    AXE:"unit/axe",
    WING:"unit/wing",

    NULL:"unit/desktop",
}
cc.Class({
    extends: cc.Component,

    properties: {
    },

    initWithConfig:function(unitConfig){
        var category=unitConfig.category;
        var sprite=this.getComponent("cc.Sprite");
        if(unitConfig.spriteFrame){
            sprite.spriteFrame=unitConfig.spriteFrame;
        }else{
            var imageUrl=CategoryToUrl[category];
            if(!imageUrl){
                imageUrl=CategoryToUrl.NULL;
            }
            cc.loader.loadRes(imageUrl,cc.SpriteFrame,function(err,spriteFrame){
                if(err){
                    console.log(err);
                }
                sprite.spriteFrame=spriteFrame;
            });
        }
    },
});
