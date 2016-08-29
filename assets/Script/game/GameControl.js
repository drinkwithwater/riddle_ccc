const riddleUtil=require("riddleUtil");
var mapUrl=[
    "map/first",
    "map/hatred",
    "map/speed",
    "map/battle1",
    "map/battle2",
]
var mapInfo=[
    "1",
    "2",
    "3",
    "4",
    "5",
]
var mapCount=mapUrl.length;
var winWord=null;
var battleNodePosition=null;
cc.Class({
    extends: cc.Component,

    properties: {
        restartNode:cc.Node,
        preNode:cc.Node,
        nextNode:cc.Node,
        battleNode:cc.Node,
        battlePrefab:cc.Prefab,
        mapIndex:0,
        infoLabel:cc.Label,
        winLabel:cc.Label,
        cnText:{
            visible:false,
            get:function(){
                return this.getComponent("CnText");
            }
        }
    },

    // use this for initialization
    onLoad: function () {
        winWord=this.winLabel.string;
        this.winLabel.string="";
        var self=this;
        self.battleNode.getComponent("BattleFieldComponent").loadMap();
        self.battleNode.zIndex=-1;
        battleNodePosition=self.battleNode.position;
        this.restartNode.on(cc.Node.EventType.TOUCH_START,function(event){
            var bfc=self.battleNode.getComponent("BattleFieldComponent");
            self.loadMapByIndex(self.mapIndex);
        });
        this.preNode.on(cc.Node.EventType.TOUCH_START,function(event){
            self.preMap();
        });
        this.nextNode.on(cc.Node.EventType.TOUCH_START,function(event){
            self.nextMap();
        });
        self.preNode.active=false;
        this.bindTest();
        this.loadMapByIndex(0);
    },
    loadMapByIndex:function(index){
        this.winLabel.string="";
        this.infoLabel.string=this.cnText.missionInfo[index];
        var url=mapUrl[index];
        this.battleNode.removeFromParent();
        var battleNode=cc.instantiate(this.battlePrefab);
        this.battleNode=battleNode;
        battleNode.getComponent("BattleFieldComponent").loadMapByUrl(url);
        battleNode.getComponent("BattleFieldComponent").gameCtrl=this;
        this.node.addChild(battleNode,-1,index);
        battleNode.position=battleNodePosition;
    },
    bindTest:function(){
        riddleUtil.test.gameNode=this;
        riddleUtil.test.nextNode=this.nextNode;
    },
    preMap:function(){
        var self=this;
        if(self.mapIndex>0){
            self.mapIndex-=1;
            self.loadMapByIndex(self.mapIndex);
        }else{
            console.log("no pre map");
        }
        if(self.mapIndex==0){
            self.preNode.active=false;
        }
        self.nextNode.active=true;
        self.nextNode.getComponent("cc.Button").interactable=true;
    },
    nextMap:function(){
        var self=this;
        if(self.mapIndex<mapCount-1){
            self.mapIndex+=1;
            self.loadMapByIndex(self.mapIndex);
        }else{
            console.log("no next map");
        }
        if(self.mapIndex==mapCount-1){
            self.nextNode.active=false;
        }
        self.preNode.active=true;
        self.preNode.getComponent("cc.Button").interactable=true;
    },
    win:function(){
        var self=this;
        if(self.mapIndex>=mapCount-1){
            this.winLabel.string=this.cnText.missionComplete+"\n"+this.cnText.noNextMap;
        }else{
            this.winLabel.string=this.cnText.missionComplete+"\n"+this.cnText.nextMap;
            this.winLabel.node.once(cc.Node.EventType.TOUCH_START,function(event){
                self.nextMap();
            });
        }
    }
});
