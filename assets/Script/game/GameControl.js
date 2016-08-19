var mapUrl=[
    "map/map1",
    "map/map2"
]
var mapCount=mapUrl.length;
cc.Class({
    extends: cc.Component,

    properties: {
        startNode:cc.Node,
        preNode:cc.Node,
        nextNode:cc.Node,
        battleNode:cc.Node,
        battlePrefab:cc.Prefab,
        mapIndex:0,
    },

    // use this for initialization
    onLoad: function () {
        var self=this;
        self.battleNode.getComponent("BattleFieldComponent").loadMap();
        /*
        this.startNode.on(cc.Node.EventType.TOUCH_START,function(event){
            var bfc=self.battleNode.getComponent("BattleFieldComponent");
            bfc.loadMap();
        });*/
        this.preNode.on(cc.Node.EventType.TOUCH_START,function(event){
            if(self.mapIndex>0){
                self.mapIndex-=1;
                self.loadMapByIndex(self.mapIndex);
            }else{
                console.log("no pre map");
            }
        });
        this.nextNode.on(cc.Node.EventType.TOUCH_START,function(event){
            if(self.mapIndex<mapCount-1){
                self.mapIndex+=1;
                self.loadMapByIndex(self.mapIndex);
            }else{
                console.log("no next map");
            }
        });
    },
    loadMapByIndex:function(index){
        var url=mapUrl[index];
        this.battleNode.removeFromParent();
        var battleNode=cc.instantiate(this.battlePrefab);
        this.battleNode=battleNode;
        battleNode.getComponent("BattleFieldComponent").loadMapByUrl(url);
        this.node.addChild(battleNode,0,index);
    }
});
