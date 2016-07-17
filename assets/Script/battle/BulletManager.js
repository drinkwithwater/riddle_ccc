const riddleUtil=require("riddleUtil")
cc.Class({
    extends: cc.Component,

    properties: {
        delBullet:cc.NodePool,
        bulletTemplate:cc.Prefab,
        
        cellManager:null,
        unitManager:null,

        idCounter:0,
        idToBullet:Object,
    },

    // use this for initialization
    onLoad: function () {
        this.delBullet=new cc.NodePool();
        this.idToBullet={}

        riddleUtil.test.bulletManager=this;
    },

    initByNode:function(battleField){
        this.cellManager=battleField.cellManager;
        this.unitManager=battleField.unitManager;
    },

    unitCreateBullet:function(source,targetId){
        var bulletNode=cc.instantiate(this.bulletTemplate);
        var bulletId=this.idCounter++;
        riddleUtil.test.bullet=bulletNode;
        bulletNode.getComponent("BulletBase").initByBulletManager(this,
                source.getComponent("SlidePoint").point,bulletId,targetId);
        this.idToBullet[bulletId]=bulletNode;
        this.node.addChild(bulletNode,0,bulletId);
        return bulletNode;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
