const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
cc.Class({
    extends: cc.Component,

    properties: {
        cellManager:{
            type:CellManager,
            default:null,
        },
        unitManager:{
            type:UnitManager,
            default:null,
        },
        timeSum:{
            default:0
        },
    },

    // use this for initialization
    onLoad: function () {
        this.loadMap()
    },

    loadMap:function(){
        this.cellManager.initByNode();
        this.unitManager.initByNode();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timeSum+=dt;
        if(this.timeSum>1){
            this.timeSum-=1;
        }
    },
    // transform (x,y)->(x+dx,y+dy)
    moveTran:function(dx,dy){
        var battleNode=this.node;
        var positionX=battleNode.x+dx;
        var positionY=battleNode.y+dy;
        // todo check range
        battleNode.attr({
            x:positionX,
            y:positionY
        });
    },
    // transform (scaleX,scaleY)->(scaleX*scale,scaleY*scale)
    scaleTran:function(scale,point){
        var battleNode=this.node;
        var positionX=battleNode.x+battleNode.getScaleX()*point.x*(1-scale);
        var positionY=battleNode.y+battleNode.getScaleY()*point.y*(1-scale);
        // todo check range
        battleNode.attr({
            scaleX:scale*battleNode.getScaleX(),
            scaleY:scale*battleNode.getScaleY(),
            x:positionX,
            y:positionY
        });
    },
});
