const _=require("underscore");
cc.Class({
    extends: cc.Component,

    properties: {
        tiledLayerName:"unitConfig",
        teamTiledLayerName:"teamConfig",
        keyTiledLayerName:"keyUnit",
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
        var team=this.getTeamAt(cell);
        var key=this.getKeyAt(cell);
        if(category){
            return {
                category:category,
                spriteFrame:null,
                team:team,
                key:key,
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
    },
    getTeamAt:function(cell){
        var properties=this.tiledMapAdapter.getLayerPropertiesAt(this.teamTiledLayerName,cell);
        if(_.isObject(properties)){
            if(_.has(properties,"team")){
                return properties.team;
            }
        }
        return null;
    },
    getKeyAt:function(cell){
        var properties=this.tiledMapAdapter.getLayerPropertiesAt(this.keyTiledLayerName,cell);
        if(_.isObject(properties)){
            if(_.has(properties,"key")){
                return properties.key;
            }
        }
        return null;
    },
    hideConfigLayer:function(){
        var teamConfigNode=this.tiledMapAdapter.getLayerNode(this.teamTiledLayerName);
        teamConfigNode.active=false;
        var unitConfigNode=this.tiledMapAdapter.getLayerNode(this.tiledLayerName);
        unitConfigNode.active=false;
        var keyConfigNode=this.tiledMapAdapter.getLayerNode(this.keyTiledLayerName);
        keyConfigNode.active=false;
        
    }
});
