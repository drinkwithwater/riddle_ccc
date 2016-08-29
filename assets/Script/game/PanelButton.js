cc.Class({
    extends: cc.Component,

    properties: {
        panelNode:{
            visible:false,
            get:function(){
                return this.node.getChildByName("Panel");
            }
        }
    },

    // use this for initialization
    onLoad: function () {
        var self=this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            self.panelNode.active=!(self.panelNode.active);
        });
        this.panelNode.active=false;
    },

});
