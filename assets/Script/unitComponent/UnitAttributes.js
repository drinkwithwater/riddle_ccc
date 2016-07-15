cc.Class({
    extends: cc.Component,

    properties: {
        speed:50,
    },

    // use this for initialization
    onLoad: function () {
    },
    getSpeed:function(){
        return this.speed;
    },

});
