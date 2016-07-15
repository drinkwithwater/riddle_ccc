cc.Class({
    extends: cc.Component,

    properties: {
        allBullet:{
            type:cc.NodePool,
            default:null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.allBullet=new cc.NodePool();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
