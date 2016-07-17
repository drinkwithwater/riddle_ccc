const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        mapTiled:{
            type:cc.TiledMap,
            default:null,
        },
        cellRange:{
            default:cc.p(10,10),
        },
        cellSize:{
            default:cc.p(10,10),
        },
        // UnitManager
        unitManager:null,
    },

    // use this for initialization
    onLoad: function () {
    },

    // called by BattleFieldComponent
    initByNode:function(battleField){
        var mapTiled=this.node.getComponent("cc.TiledMap");
        // set cellRange
        var mapRange=mapTiled.getMapSize();
        this.cellRange=cc.p(mapRange.width,mapRange.height);
        this.unitManager=battleField.unitManager;
    },

    canMove:function(cell){
        // todo, check cell in tiled
        var unit=this.unitManager.unit$(cell);
        if(_.isObject(unit)){
            return false;
        }else{
            return true;
        }
    },



    /************************
    * cell, point, position *
    *************************/
    //
    pointToCell:function(point){
        return cc.p(
                Math.floor(point.x/this.cellSize.x),
                Math.floor(point.y/this.cellSize.y));
    },

    // center point of the cell
    cellToPoint:function(cell){
        var xCellSize=this.cellSize.x;
        var yCellSize=this.cellSize.y;
        return cc.p(
                (cell.x+0.5)*xCellSize,
                (cell.y+0.5)*yCellSize);
    },

    cellToPositionAR:function(cell){
        var tileSize=this.mapTiled.getTileSize();
        var offset=this.centerPositionAR();
        return cc.p((cell.x+0.5)*tileSize.width-offset.x,(cell.y+0.5)*tileSize.height-offset.y);
    },
    cellToPosition:function(){
        // not do
    },
    positionToCell:function(position){
        var tileSize=this.mapTiled.getTileSize();
        var cell=cc.p(Math.floor(position.x/tileSize.width),Math.floor(position.y/tileSize.height));
        return cell;
    },

    positionToPoint:function(){
    },
    pointToPositionAR:function(point){
        var tileSize=this.mapTiled.getTileSize();
        var cellSize=this.cellSize;

        var offset=this.centerPositionAR();

        return cc.p(
                point.x*tileSize.width/cellSize.x-offset.x,
                point.y*tileSize.height/cellSize.y-offset.y);
    },
    centerPositionAR:function(){
        var mapSize=this.node.getContentSize();
        var mapAnchor=this.node.getAnchorPoint();
        var dx=mapSize.width*mapAnchor.x;
        var dy=mapSize.height*mapAnchor.y;
        return {
            x:dx,
            y:dy
        };
    }



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
