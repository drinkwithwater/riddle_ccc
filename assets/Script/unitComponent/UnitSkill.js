const Skill=require("Skill");
const SkillBase=Skill.SkillBase;
var Listener=cc.Class({
    name:"Listener",
    properties:{
        listener:null,
        callback:null,
    },
    ctor:function(){
        this.listener=arguments[0];
        this.callback=arguments[1];
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        attackFlag:{
            visible:false,
            default:false,
        },
        unitBase:{
            visible:false,
            get:function(){
                return this.getComponent("UnitBase");
            }
        },
        unitMove:{
            visible:false,
            get:function(){
                return this.getComponent("UnitMove");
            }
        },
        slidePoint:{
            visible:false,
            get:function(){
                return this.getComponent("SlidePoint");
            }
        },

        initListeners:{
            type:[Listener],
            visible:false,
            default:[],
        },
        hitListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        hurtListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        
        updateListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        
        startMoveListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        updateMoveListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        
        startStandListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        updateStandListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        
        skillList:{
            type:[SkillBase],
            default:[]
        },
        
    },

    // use this for initialization
    onLoad: function () {
        
        
        var hitSkill=new Skill.HitSkill();
        this.addSkill(hitSkill);

        /*
        var standSkill=new Skill.StandSkill();
        this.addSkill(standSkill);*/
        
        this.triggerListener("init");
    },

    addSkill:function(skill){
        this.skillList.push(skill);
        skill.bind(this.node);
    },
    
    addListener:function(name,listener,callback){
        this[name+"Listeners"].push(new Listener(
            listener,callback
        ));
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

    triggerListener:function(name,argument){
        var nameListeners=this[name+"Listeners"];
        for(var i=0,l=nameListeners.length;i<l;i++){
            var argFrom1=[].slice.call(arguments,1);
            nameListeners[i].callback.apply(
                nameListeners[i].listener,
                argFrom1
            );
        }
    },

    
    unitHit:function(operInput){
        var target=this.unitBase.unitManager.unit$(operInput.targetId);
        this.triggerListener("hit",operInput.targetId);
    },
    unitStartMove:function(){
        this.triggerListener("startMove");
    },
    unitStartStand:function(){
        this.triggerListener("startStand");
    },

    update: function (dt) {
        this.triggerListener("update",dt);
        if(this.unitMove.isMoving()){
            this.triggerListener("updateMove",dt);
        }else{
            this.triggerListener("updateStand",dt);
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
