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
        updateTimeSlice:0.05,
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
        unitInter:{
            visible:false,
            get:function(){
                return this.getComponent("UnitInter");
            }
        },
        cellManager:{
            visible:false,
            get:function(){
                return this.getComponent("UnitBase").cellManager;
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
        
        observeEnemiesListeners:{
            type:[Listener],
            visible:false,
            default:[]
        },
        observeFriendsListeners:{
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
    isAttacking:function(){
        return this.attackFlag;
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

    
    unitInit:function(){
        this.triggerListener("init");
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
        if(this.timeSum>=this.updateTimeSlice){
            this.sliceUpdate(this.timeSum);
            this.timeSum=0;
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

        
        var selfTeam=this.unitInter.team;
        // observe enemy
        var targetEnemies=targetList.filter(function(unitInter){
            return unitInter.team!=selfTeam;
        }).filter(function(unitInter){
            return unitInter.canBeObserved();
        });
        if(targetEnemies.length>0){
            this.triggerListener("observeEnemies",targetEnemies);
        }
        
        // filter friend
        var targetFriends=targetList.filter(function(unitInter){
            return unitInter.team==selfTeam;
        });
        if(targetFriends.length>0){
            this.triggerListener("observeFriends",targetFriends);
        }
        
    },
    sliceUpdate:function(dt){
        this.triggerListener("update",dt);
        if(this.unitMove.isMoving()){
            this.triggerListener("updateMove",dt);
        }else{
            this.triggerListener("updateStand",dt);
        }
        this.observe();
    },
    createBulletMiddle:function(){
        var attr=this.getComponent("UnitAttributes");
        var distance=(0.5+attr.observeRange)*this.cellManager.cellSize;
        return {
            sourceInter:this.unitInter,
            point:this.unitInter.getPoint(),
            harm:attr.ap,
            distance:distance,
        };
    },

});
