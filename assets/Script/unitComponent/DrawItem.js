var fillColor=cc.color(255,0,0,1);
var edgeColor=cc.color(255,0,0,100);
cc.Class({
    extends: cc.Component,

    properties: {
        drawNode:{
            visible:false,
            type:cc.DrawNode,
            default:null
        },
        init:false,
        unitBase:{
            get:function(){
                return this.getComponent("UnitBase");
            }
        },
    },

    // because the draw node can not be empty, I create draw node when need draw sth...
    getDrawNode:function(){
        if(!this.init){
            this.drawNode=new cc.DrawNode();
            this.node._sgNode.addChild(this.drawNode);
            this.init=true;
        }
        return this.drawNode;
    },

    showObserve:function(){
        var drawNode=this.getDrawNode();
        var radio=this.unitBase.cellManager.tileSize*
            this.getComponent("UnitAttributes").observeRange;
        var a=cc.p(0,radio);
        var b=cc.p(radio,0);
        var c=cc.p(0,-radio);
        var d=cc.p(-radio,0);
        drawNode.drawPoly([a,b,c,d],fillColor,1,edgeColor);
    },
});
