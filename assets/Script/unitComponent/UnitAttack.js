const BEFORE_ATTACK=2;
const AFTER_ATTACK=3;
cc.Class({
    extends: cc.Component,

    properties: {
        coolDown:0,
        attackFlag:false,
        unitManager:null,
        cellManager:null,
        bulletManager:null,
    },

    // use this for initialization
    onLoad: function () {
    },
    
    start:function(){
        this.unitManager=this.getComponent("UnitBase").unitManager;
        this.cellManager=this.getComponent("UnitBase").cellManager;
        this.bulletManager=this.getComponent("UnitBase").bulletManager;
    },

    update: function (dt) {
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


});
