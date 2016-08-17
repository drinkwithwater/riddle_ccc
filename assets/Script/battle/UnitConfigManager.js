const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        tiledLayerName:"unitConfig",
        tiledMapAdapter:{
            visible:false,
            get:function(){
                return this.getComponent("TiledMapAdapter");
            }
        },
    },

    initByNode:function(battleField){
    },
    
    getUnitConfigAt:function(cell){
        var category=this.getCategoryAt(cell);
        if(category){
            return {
                category:category,
                spriteFrame:null,
            };
        }else{
            return null;
        }
    },
    getCategoryAt:function(cell){
        var properties=this.tiledMapAdapter.getLayerPropertiesAt(this.tiledLayerName,cell);
        if(_.isObject(properties)){
            if(_.has(properties,"category")){
                return properties.category;
            }
        }
        return null;
    }
});
