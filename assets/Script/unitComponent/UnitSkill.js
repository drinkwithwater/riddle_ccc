const Skill=require("Skill");
const SkillBase=Skill.SkillBase;
const riddleUtil=require("riddleUtil");
const _=require("underscore");
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
        timeSum:0,
        skillUpdateTimeSlice:0.1,
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
        unitManager:{
            visible:false,
            get:function(){
                return this.getComponent("UnitBase").unitManager;
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
        
        observeListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        
        skillList:{
            type:[SkillBase],
            default:[]
        },

        // hatred list 
        targetList:{
            visible:false,
            default:[]
        }
    },

    // use this for initialization
    onLoad: function () {
        
        
        /*
        var hitSkill=new Skill.HitSkill();
        this.addSkill(hitSkill);*/

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
        this.triggerListener("hit",operInput.targetInter);
    },
    unitStartMove:function(){
        this.triggerListener("startMove");
    },
    unitStartStand:function(){
        this.triggerListener("startStand");
    },

    update: function (dt) {
        this.timeSum+=dt;
        if(this.timeSum>=this.skillUpdateTimeSlice){
            this.skillUpdate(this.timeSum);
            this.timeSum-=this.skillUpdateTimeSlice;
        }
        
    },
    observe:function(){
        var thisCell=this.slidePoint.cell;
        var range=this.getComponent("UnitAttributes").observeRange;
        var observeCells=riddleUtil.radioRange(thisCell,range);
        var newTargetDict={};
        for(var i=0,l=observeCells.length;i<l;i++){
            var cell=observeCells[i];
            var unitInter=this.unitManager.unitInter$(cell);
            if(unitInter){
                if(unitInter.unitId==this.unitBase.unitId){
                    // same unit
                    continue;
                }else{
                    newTargetDict[unitInter.unitId]=unitInter;
                }
            }
        }
        // make the old targets be the first in list
        var targetList=this.targetList.filter(function(unitInter){
            var contain=newTargetDict.hasOwnProperty(unitInter.unitId);
            if(contain) {
                delete newTargetDict[unitInter.unitId];
                return true;
            }else{
                return false;
            }
        });
        for(var nid in newTargetDict){
            var unitInter=newTargetDict[nid];
            targetList.push(unitInter);
        }
        // set back to self's list;
        this.targetList=targetList;
        
        if(this.targetList.length>0){
            this.triggerListener("observe",this.targetList);
        }
    },
    skillUpdate:function(dt){
        this.triggerListener("update",dt);
        if(this.unitMove.isMoving()){
            this.triggerListener("updateMove",dt);
        }else{
            this.triggerListener("updateStand",dt);
        }
        this.observe();
    }

});
