const riddleUtil=require("riddleUtil")
cc.Class({
    extends: cc.Component,

    properties: {
        bulletTemplate:cc.Prefab,
        straightBulletTemplate:cc.Prefab,
        trackBulletTemplate:cc.Prefab,
        delBullet:{
            type:cc.NodePool,
            visible:false,
            default:null
        },
        
        cellManager:{
            visible:false,
            default:null
        },
        unitManager:{
            visible:false,
            default:null
        },

        idCounter:1,
        idToBullet:{
            visible:false,
            default:null
        },
    },

    onLoad:function(){
        // do this in initByNode
    },

    initByNode:function(battleField){
        this.delBullet=new cc.NodePool();
        this.idToBullet={}

        this.cellManager=battleField.cellManager;
        this.unitManager=battleField.unitManager;
    },

    skillCreateBullet:function(source,targetInter){
        var bulletNode=cc.instantiate(this.bulletTemplate);
        var bulletId=this.idCounter++;
        bulletNode.getComponent("BulletBase").initByBulletManager(this,
                source.getComponent("SlidePoint").point,bulletId,targetInter);
        this.idToBullet[bulletId]=bulletNode;
        this.node.addChild(bulletNode,0,bulletId);
        return bulletNode;
    },
    skillCreateTrackBullet:function(source,targetId){
        var bulletNode=cc.instantiate(this.trackBulletTemplate);
        var bulletId=this.idCounter++;
        bulletNode.getComponent("TrackBullet").initByBulletManager(this,
                source.getComponent("SlidePoint").point,bulletId,targetInter);
        this.idToBullet[bulletId]=bulletNode;
        this.node.addChild(bulletNode,0,bulletId);
        return bulletNode;
    },
    skillCreateStraightBullet:function(source,targetInter){
        var bulletNode=cc.instantiate(this.straightBulletTemplate);
        var bulletId=this.idCounter++;
        bulletNode.getComponent("StraightBullet").initByBulletManager(this,
                source.getComponent("SlidePoint").point,bulletId,targetInter);
        this.idToBullet[bulletId]=bulletNode;
        this.node.addChild(bulletNode,0,bulletId);
        return bulletNode;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
