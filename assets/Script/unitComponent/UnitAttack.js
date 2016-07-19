cc.Class({
    extends: cc.Component,

    properties: {
        coolDown:0,
        attackFlag:false,
        
        slidePoint:null,
        
        unitManager:null,
        cellManager:null,
        bulletManager:null,
    },

    // use this for initialization
    onLoad: function () {
        this.unitManager=this.getComponent("UnitBase").unitManager;
        this.cellManager=this.getComponent("UnitBase").cellManager;
        this.bulletManager=this.getComponent("UnitBase").bulletManager;
        this.slidePoint=this.getComponent("SlidePoint");
    },
    

    // call by UnitMove
    canMove:function(){
        return true;
    },

    // attack when CD end
    canAttack:function(){
    },

    // abstract
    moveAttack:function(dt,direct){
    },

    // abstract
    standAttack:function(){
    },

    // abstract
    hitAttack:function(operInput){
    },

    update: function (dt) {
        if(this.slidePoint.isStanding()){
        }
    },

});
