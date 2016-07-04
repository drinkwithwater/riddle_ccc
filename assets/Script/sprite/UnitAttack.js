cc.Class({
    extends: cc.Component,

    properties: {
        coolDown:0,
        attackFlag:false,
    },

    // use this for initialization
    onLoad: function () {
    },

    update: function (dt) {
    },

    // call by UnitMove
    canMove:function(){
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
    hitAttack:function(direct){
    },


});
