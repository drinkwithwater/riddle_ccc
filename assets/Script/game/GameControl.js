var mapUrl=[
    "map/speed",
    "map/hatred",
]
var mapCount=mapUrl.length;
var winWord=null;
cc.Class({
    extends: cc.Component,

    properties: {
        restartNode:cc.Node,
        preNode:cc.Node,
        nextNode:cc.Node,
        battleNode:cc.Node,
        battlePrefab:cc.Prefab,
        winLabel:cc.Label,
        mapIndex:0,
    },

    // use this for initialization
    onLoad: function () {
        winWord=this.winLabel.string;
        this.winLabel.string="";
        var self=this;
        self.battleNode.getComponent("BattleFieldComponent").loadMap();
        self.battleNode.zIndex=-1;
        this.restartNode.on(cc.Node.EventType.TOUCH_START,function(event){
            var bfc=self.battleNode.getComponent("BattleFieldComponent");
            self.loadMapByIndex(self.mapIndex);
        });
        this.preNode.on(cc.Node.EventType.TOUCH_START,function(event){
            if(self.mapIndex>0){
                self.mapIndex-=1;
                self.loadMapByIndex(self.mapIndex);
            }else{
                console.log("no pre map");
            }
            if(self.mapIndex==0){
                self.preNode.interactable=false;
            }
            self.nextNode.interactable=true;
        });
        this.nextNode.on(cc.Node.EventType.TOUCH_START,function(event){
            if(self.mapIndex<mapCount-1){
                self.mapIndex+=1;
                self.loadMapByIndex(self.mapIndex);
            }else{
                console.log("no next map");
            }
            if(self.mapIndex==mapCount-1){
                self.nextNode.interactable=false;
            }
            self.preNode.interactable=true;
        });
        self.preNode.interactable=false;
    },
    loadMapByIndex:function(index){
        this.winLabel.string="";
        var url=mapUrl[index];
        this.battleNode.removeFromParent();
        var battleNode=cc.instantiate(this.battlePrefab);
        this.battleNode=battleNode;
        battleNode.getComponent("BattleFieldComponent").loadMapByUrl(url);
        this.node.addChild(battleNode,-1,index);
    }
});
