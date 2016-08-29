const _=require("underscore")
const skillCategory=require("skillCategory");
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
        hp:8,
        ap:1,
        speed:25,
        bulletSpeed:10,
        observeRange:1,
        skills:["HIT"],
    },
    TOWER:{
        hp:3,
        ap:2,
        speed:25,
        bulletSpeed:10,
        observeRange:2,
        skills:["STAND"],
    },
    ARROW:{
        hp:3,
        ap:1,
        speed:25,
        bulletSpeed:10,
        skills:[],
    },
    SWORD:{
        hp:2,
        ap:3,
        speed:25,
        bulletSpeed:10,
        skills:[],
    },
    HORSE:{
        hp:2,
        ap:1,
        speed:25,
        bulletSpeed:10,
        skills:[],
    },
    BOW:{
        hp:2,
        ap:3,
        speed:25,
        bulletSpeed:10,
        observeRange:2,
        skills:["TRACK_STAND"],
    },
    KNIFE:{
        hp:1,
        ap:4,
        speed:25,
        bulletSpeed:10,
        skills:["HIT","STEALTH"],
    },
    STICK:{
        hp:3,
        ap:2,
        speed:25,
        bulletSpeed:10,
        skills:["HIT"],
    },
    AXE:{
        hp:2,
        ap:2,
        speed:25,
        bulletSpeed:10,
        skills:["HURT"],
    },
    WING:{
        hp:1,
        ap:4,
        speed:50,
        bulletSpeed:10,
        skills:["HIT"],
    },
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
        category:null,
    },

    initWithConfig:function(unitConfig){
        var category=unitConfig.category;
        this.category=category;
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
        var staticAttr=CategoryToStatic[category];
        // init skill & attribute
        if(staticAttr){
            this.skillInit(staticAttr.skills);
            this.attributeInit(staticAttr);
        }
        
        if(this.team!=1){
            if(this.category=="TOWER"||this.category=="BOW"){
                this.getComponent("DrawItem").showObserve();
            }
        }
        
    },
    
    attributeInit:function(staticAttr){
        var attr=this.getComponent("UnitAttributes");
        _.each(staticAttr,function(v,k){
            if(k=="hp"){
                attr.hp=v;
                attr.maxHp=v;
            }else if(k!="skill"){
                attr[k]=v;
            }
        });
    },
    skillInit:function(skills){
        var unitSkill=this.getComponent("UnitSkill");
        for(var i=0,l=skills.length;i<l;i++){
            var skillName=skills[i];
            var SkillClass=skillCategory.CategoryToClass[skillName];
            unitSkill.addSkill(new SkillClass());
        }
    },
    update:function(dt){
    }
});
