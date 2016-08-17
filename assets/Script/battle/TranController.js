const BattleFieldComponent=require("BattleFieldComponent");
const riddleUtil=require("riddleUtil");
const _=require("underscore")
cc.Class({
    extends: cc.Component,

    properties: {
        battleField:{
            type:BattleFieldComponent,
            visible:false,
            default:null,
        },
        innerNode:{
            type:cc.Node,
            default:null,
        },
        lastLoction1:{
            visible:false,
            default:cc.p(0,0)
        },
        lastLocation2:{
            visible:false,
            default:cc.p(0,0),
        },
        // for mouse's right button
        rightDown:{
            visible:false,
            default:false,
        },
        // is doing transform
        doTran:{
            visible:false,
            default:false,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.battleField=this.getComponent("BattleFieldComponent")
        this.bindMouseListener();
    },

    beginTran:function(location1,location2){
        this.lastLocation1=location1;
        this.lastLocation2=location2;
    },
    tran:function(location1,location2){
        if(_.isObject(location2)){
            var a=riddleUtil.euDistance(location1,this.lastLocation1);
            var b=riddleUtil.euDistance(location2,this.lastLocation2);
            if(b<a){
                var temp=location1;
                location1=location2;
                location2=temp;
            }
        }
        this.moveTran(
            location1.x-this.lastLocation1.x,
            location1.y-this.lastLocation1.y,
        );
        if(_.isObject(location2) && _.isObject(this.lastLocation2)){
            var beforeDistance=riddleUtil.euDistance(
                this.lastLocation1,this.lastLocation2
            );
            var afterDistance=riddleUtil.euDistance(
                location1,location2
            );

            this.scaleTran(afterDistance/beforeDistance,location1);
        }
        this.lastLocation1=location1;
        this.lastLoctaion2=location2;
    },
    endTran:function(location1,location2){
        var dx=location1.x-this.lastLocation1.x;
        var dy=location1.y-this.lastLocation1.y;
        if(dx==0 && dy==0){
            return ;
        }else{
        }
    },
    
    /***********************
    *** tran api ****
    ***********************/
    // transform (x,y)->(x+dx,y+dy)
    moveTran:function(dx,dy){
        var battleNode=this.node;
        var positionX=battleNode.x+dx;
        var positionY=battleNode.y+dy;
        // todo check range
        battleNode.attr({
            x:positionX,
            y:positionY
        });
    },
    // transform (scaleX,scaleY)->(scaleX*scale,scaleY*scale)
    scaleTran:function(scale,point){
        var battleNode=this.node;
        var positionX=battleNode.x+battleNode.getScaleX()*point.x*(1-scale);
        var positionY=battleNode.y+battleNode.getScaleY()*point.y*(1-scale);
        // todo check range
        battleNode.attr({
            scaleX:scale*battleNode.getScaleX(),
            scaleY:scale*battleNode.getScaleY(),
            x:positionX,
            y:positionY
        });
    },
    
    /***********************
    *** tran listener ****
    ***********************/
    /*
    createMobileListener:function(){
        // todo
        var thisVar=this;
        var listener=cc.EventListener.create({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function(touches,event){
                if(touches.length<=1){
                    thisVar.beginTran(touches[0],getLocation());
                }else{
                    thisVar.beginTran(touches[0].getLocation(),touches[1].getLocation());
                    thisVar.doTran=true;
                }
            },
            onTouchesMoved:function(touches,event){
                if(touches.length<=1){
                    if(thisVar.doTran){
                        thisVar.tran(touches[0].getLocation());
                    }else{
                        thisVar.beganTran(touches[0].getLocation());
                    }
                }else{
                    if(thisVar.doTran){
                        thisVar.tran(touches[0].getLocation().touches[1].getLocation());
                    }else{
                        thisVar.beginTran(touches[0].getLocation(),touches[1].getLocation());
                        thisVar.doTran=true;
                    }

                }
            },
            onTouchesEnded:function(touches,event){
                thisVar.doTran=false;
            },
        });
        return listener;
    },*/
    /*
    createMouseListener:function(){
        var thisVar=this;
        var listener=cc.EventListener.create({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function(touches,event){
                thisVar.beginTran(touches[0].getLocation());
            },
            onTouchesMoved:function(touches,event){
                thisVar.tran(touches[0].getLocation());
            },
            onTouchesEnded:function(touches,event){
                thisVar.endTran(touches[0].getLocation());
            }
        });
        return listener;
    }, */
    bindMouseListener:function(){
        var tran=this;
        this.innerNode.on(cc.Node.EventType.MOUSE_DOWN,function(event){
            if(event.getButton()==cc.Event.EventMouse.BUTTON_RIGHT){
                tran.rightDown=true;
                tran.beginTran({
                    x:event.getLocationX(),
                    y:event.getLocationY()
                });
            }
        });
        this.innerNode.on(cc.Node.EventType.MOUSE_MOVE,function(event){
            if(tran.rightDown){
                tran.tran({
                    x:event.getLocationX(),
                    y:event.getLocationY()
                });
                return true;
            }else{
                return false;
            }
        });
        this.innerNode.on(cc.Node.EventType.MOUSE_UP,function(event){
            if(event.getButton()==cc.Event.EventMouse.BUTTON_RIGHT){
                tran.rightDown=false;
                tran.tran({
                    x:event.getLocationX(),
                    y:event.getLocationY()
                });
                return true;
            }else{
                return false;
            }
        });
        this.innerNode.on(cc.Node.EventType.MOUSE_WHEEL,function(event){
            var scroll=event.getScrollY();
            var point=event.getLocation();
            var point=tran.node.convertToNodeSpaceAR(point);
            if(scroll>=0){
                tran.scaleTran(1.25,point);
            }else{
                tran.scaleTran(0.8,point);
            }
        });
    }
});
