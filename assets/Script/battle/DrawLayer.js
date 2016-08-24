var DRAW_TAG="drawNode";
const LINE_WIDTH=5;
const LINE_COLOR=cc.color(255,255,255);
cc.Class({
    extends: cc.Component,

    properties: {
        cellManager: {
            visible:false,
            default:null
        }
    },

    initByNode:function(battleField){
        this.cellManager=battleField.cellManager;
        //var draw=new cc.DrawNode();
        //draw.drawDot(cc.p(100,100),100,cc.color(255,255,255));
        //this.node._sgNode.addChild(draw,0,"tag");
        //var drawNode=new cc.DrawNode();
        //this.node._sgNode.addChild(drawNode,0,DRAW_TAG);
    },
    animateAttack:function(fromPoint,toPoint){
        var from=this.cellManager.pointToPositionAR(fromPoint);
        var to=this.cellManager.pointToPositionAR(toPoint);
        var drawNode=new cc.DrawNode();
        drawNode.drawSegment(from,to,LINE_WIDTH,LINE_COLOR);
        this.node._sgNode.addChild(drawNode);
        drawNode.runAction(cc.sequence(
            cc.fadeOut(0.2),
            cc.callFunc(function(){
                drawNode.removeFromParent();
            })
        ));
    },
    drawDiamond:function(center,radio,color){
        var a=cc.p(center.x,center.y+radio);
        var b=cc.p(center.x,center.y-radio);
        var c=cc.p(center.x+radio,center.y);
        var d=cc.p(center.x-radio,center.y);
        this.drawNode.drawPoly([a,b,c,d],cc.p(0,0,0,255),10,color);
    },
    // use this for initialization
    onLoad: function () {
        //this.node._sgNode.addChild(drawNode);
    },

});
