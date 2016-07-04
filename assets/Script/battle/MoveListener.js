cc.Class({
    extends: cc.Component,

    properties: {
        mapNode:{
            type:cc.Node,
            default:null,
        },
        cellTiledLayer:{
            type:cc.TiledLayer,
            default:null,
        },
        focusItem:{
            type:cc.Node,
            default:null,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.bindMouseListener();
    },
    bindMouseListener:function(){
        var thisNode=this;
        var mapNode=this.mapNode;
        this.mapNode.on(cc.Node.EventType.MOUSE_DOWN,function(event){
            if(event.getButton()==cc.Event.EventMouse.BUTTON_LEFT){
                var cell=thisNode.locationToCell(event.getLocation());
                console.log("move listener:",cell.x,cell.y);
            }
        });
        var focusItem=this.focusItem;
        this.mapNode.on(cc.Node.EventType.MOUSE_MOVE,function(event){
            var cell=thisNode.locationToCell(event.getLocation());
            var center=thisNode.cellToCenter(cell);
            focusItem.attr({
                x:center.x,
                y:center.y,
                active:true
            });
        });
        this.mapNode.on(cc.Node.EventType.MOUSE_LEAVE,function(event){
            focusItem.active=false;
        });
    },
    locationToCell:function(eventLocation){
        var tileSize=this.cellTiledLayer.getMapTileSize();
        var point=this.mapNode.convertToNodeSpace(eventLocation);
        var cell=cc.p(Math.floor(point.x/tileSize.width),Math.floor(point.y/tileSize.height));
        return cell;
    },
    cellToCenter:function(cell){
        var tileSize=this.cellTiledLayer.getMapTileSize();
        var mapSize=this.mapNode.getContentSize();
        var mapAnchor=this.mapNode.getAnchorPoint();
        var dx=mapSize.width*mapAnchor.x;
        var dy=mapSize.height*mapAnchor.y;
        return cc.p((cell.x+0.5)*tileSize.width-dx,(cell.y+0.5)*tileSize.height-dy);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
