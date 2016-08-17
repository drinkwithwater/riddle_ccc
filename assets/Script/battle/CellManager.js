const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        tiledLayerName:"cellItem",
        tiledMapAdapter:{
            visible:false,
            get:function(){
                return this.getComponent("TiledMapAdapter");
            }
        },
        cellRange:{
            visible:false,
            get:function(){
                return this.tiledMapAdapter.tileRange;
            }
        },
        // on cell's width and height for logic point
        cellSize:{
            default:cc.p(10,10),
        },
        // UnitManager
        unitManager:{
            visible:false,
            default:null
        },
    },
    
    onLoad:function(){
        // do this in initByNode
    },

    // called by BattleFieldComponent
    initByNode:function(battleField){
        this.unitManager=battleField.unitManager;
    },

    canMove:function(cell){
        
        var cellRange=this.cellRange;
        if(cell.x<0||cell.x>=cellRange.x) return false;
        if(cell.y<0||cell.y>=cellRange.y) return false;
        
        // check cell in tiled map
        var item=this.getItemAt(cell);
        if(item) return false;
        // check cell in unit
        var unit=this.unitManager.unit$(cell);
        if(_.isObject(unit)){
            return false;
        }else{
            return true;
        }
    },

    /**************************
    * cell detail information *
    **************************/
    getItemAt:function(cell){
        var properties=this.tiledMapAdapter.getLayerPropertiesAt(this.tiledLayerName,cell);
        if(_.isObject(properties)){
            if(_.has(properties,"item")){
                return properties.item;
            }
        }
        return null;
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
        var tileSize=this.tiledMapAdapter.tileSize;
        var offset=this.centerPositionAR();
        return cc.p((cell.x+0.5)*tileSize.x-offset.x,(cell.y+0.5)*tileSize.y-offset.y);
    },
    cellToPosition:function(){
        // not do
    },
    positionToCell:function(position){
        var tileSize=this.tiledMapAdapter.tileSize;
        var cell=cc.p(Math.floor(position.x/tileSize.x),Math.floor(position.y/tileSize.y));
        return cell;
    },

    positionToPoint:function(){
    },
    pointToPositionAR:function(point){
        var tileSize=this.tiledMapAdapter.tileSize;
        var cellSize=this.cellSize;

        var offset=this.centerPositionAR();

        return cc.p(
                point.x*tileSize.x/cellSize.x-offset.x,
                point.y*tileSize.y/cellSize.y-offset.y);
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
    },
});
