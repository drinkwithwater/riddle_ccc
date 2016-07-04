cc.Class({
    extends: cc.Component,

    properties: {
        cellSize:{
            type:cc.Vec2,
            default:cc.p(10,10),
        }
    },

    // use this for initialization
    onLoad: function () {
    },
    //
    pointToCell:function(point){
    },

    // center point of the cell
    cellToPoint:function(cell){
    },

    cellToPosition:function(){
    },
    positionToCell:function(){
    },

    positionToPoint:function(){
    },
    pointToPosition:function(){
    }



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
