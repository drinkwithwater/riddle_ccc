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
        drawLayer:{
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
        //this.delBullet=new cc.NodePool();
        this.idToBullet={}

        this.cellManager=battleField.cellManager;
        this.unitManager=battleField.unitManager;
        this.drawLayer=battleField.drawLayer;
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
    skillCreateTrackBullet:function(bulletMiddle){
        var bulletNode=cc.instantiate(this.trackBulletTemplate);
        var bulletId=this.idCounter++;
        bulletNode.getComponent("TrackBullet").initByBulletManager(this, bulletId, bulletMiddle);
        this.idToBullet[bulletId]=bulletNode;
        this.node.addChild(bulletNode,0,bulletId);
        return bulletNode;
    },
    skillCreateStraightBullet:function(bulletMiddle){
        var bulletNode=cc.instantiate(this.straightBulletTemplate);
        var bulletId=this.idCounter++;
        bulletNode.getComponent("StraightBullet").initByBulletManager(this, bulletId, bulletMiddle);
        this.idToBullet[bulletId]=bulletNode;
        this.node.addChild(bulletNode,0,bulletId);
        return bulletNode;
    },
    skillAttackNoBullet:function(bulletMiddle){
        var fromPoint=bulletMiddle.sourceInter.getPoint();
        var toPoint=bulletMiddle.targetInter.getPoint();
        this.drawLayer.animateAttack(fromPoint,toPoint);
    },
    removeBullet:function(bulletId){
        // TODO use node pool to manager nodes
        var bullet=this.idToBullet[bulletId]
        delete this.idToBullet[bulletId];
        bullet.removeFromParent();
    }
    
});
