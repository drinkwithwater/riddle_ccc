cc.Class({
    extends: cc.Component,

    properties: {
        tiledMap:{
            visible:false,
            get:function(){
                return this.getComponent("cc.TiledMap");
            }
        },
        tileRange:{
            visible:false,
            get:function(){
                var range=this.tiledMap.getMapSize();
                return cc.p(range.width,range.height);
            }
        },
        tileSize:{
            visible:false,
            get:function(){
                var size=this.tiledMap.getTileSize();
                return cc.p(size.width,size.height);
            }
        },
    },

    getLayerPropertiesAt:function(tiledLayerName,cell){
        var x=cell.x;
        var y=this.tileRange.y-1-cell.y;
        var tiledLayer=this.node.getChildByName(tiledLayerName).getComponent("cc.TiledLayer");
        var gid=tiledLayer.getTileGIDAt(x,y);
        var properties=this.tiledMap.getPropertiesForGID(gid);
        return properties;
    },

});