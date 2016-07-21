const Skill=require("Skill");
cc.Class({
    extends: cc.Component,

    properties: {
        coolDown:0,
        
        attackFlag:false,
        
        slidePoint:null,
        
        unitManager:null,
        bulletManager:null,

        hitSkill:null,
        
        moveSkill:null,
        standSkill:null,
        hurtSkill:null,
    },

    // use this for initialization
    onLoad: function () {
        this.unitManager=this.getComponent("UnitBase").unitManager;
        this.bulletManager=this.getComponent("UnitBase").battleField.bulletManager;
        this.slidePoint=this.getComponent("SlidePoint");

        this.hitSkill=new Skill.HitSkill(this.node);
    },

    attackLock:function(){
        this.attackFlag=true;
    },
    attackUnlock:function(){
        this.attackFlag=false;
    },
    

    // call by UnitMove
    canMove:function(){
        return !this.attackFlag;
    },

    // attack when CD end
    canAttack:function(){
    },


    // abstract
    hitAttack:function(operInput){
        var target=this.unitManager.unit$(operInput.targetId);
        if(this.hitSkill){
            this.hitSkill.onUnitHit(operInput.targetId);
        }
    },

    update: function (dt) {
        if(this.hitSkill){
            this.hitSkill.update(dt);
        }
        /*
        if(this.slidePoint.isStanding()){
            this.standSkill.standUpdate(dt);
            this.moveSkill.standUpdate(dt);
        }else{
            this.moveSkill.moveUpdate(dt);
        }*/
    },

});
