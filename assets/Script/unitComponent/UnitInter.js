var teamColor={
    0:cc.color(255,255,255),
    1:cc.color(0,0,255),
    2:cc.color(255,0,0),
    3:cc.color(0,0,0),
};
cc.Class({
    extends: cc.Component,

    properties: {
        //taunt:false,
        _stealth:false,
        stealth:{
            get:function(){
                return this._stealth;
            },
            set:function(val){
                if(this._stealth==val) return ;
                else{
                    if(val){
                        this.node.opacity=70;
                    }else{
                        this.node.opacity=255;
                    }
                    this._stealth=val;
                }
            }
        },
        stealthNodeName:"stealth",
        stealthNode:{
            get:function(){
                return this.node.getChildByName(this.stealthNodeName);
            }
        },
        
        operFlag:false,
        unitId:{
            visible:false,
            get:function(){
                return this.getComponent("UnitBase").unitId;
            }
        },
        teamNodeName:"team",
        teamNode:{
            visible:false,
            get:function(){
                return this.node.getChildByName(this.teamNodeName);
            }
        },
        _team:{
            visible:false,
            default:0,
        },
        team:{
            get:function(){
                return this._team;
            },
            set:function(value){
                this.teamNode.color=teamColor[value];
                this._team=value;
            }
        },
        hurtNodeName:"hurt",
        hurtNode:{
            visible:false,
            get:function(){
                return this.node.getChildByName(this.hurtNodeName);
            }
        },
        keyNodeName:"key",
        keyNode:{
            visible:false,
            get:function(){
                return this.node.getChildByName(this.keyNodeName);
            }
        },
        key:false,
    },
    
    initWithConfig:function(config){
        this.team=config.team;
        this.key=config.key;
        if(config.team==1){
            this.operFlag=true;
            this.keyNode.active=false;
        }else{
            if(this.getComponent("UnitCategory").category=="TOWER"){
                this.getComponent("DrawItem").showObserve();
            }
            this.operFlag=false;
        }
        if(config.key){
            this.keyNode.active=true;
        }else{
            this.keyNode.active=false;
        }
    },
    canOper:function(){
        return this.operFlag;
    },
    canBeObserved:function(){
        return !this.stealth;
    },
    
    onHurtByHit:function(sourceInter,harm){
        // not used
        /*
        this.hurtNode.attr({
            scaleX:0,
            scaleY:0,
            visible:true,
            opacity:255,
        });
        this.hurtNode.runAction(cc.sequence(
            cc.scaleTo(0.1,1,1),
            cc.fadeOut(0.1)
        ));*/
    },
    onHurtByBullet:function(bullet){
    },
    
    getAttackVisible:function(){
        if(this.stealth){
            return false;
        }else{
            return true;
        }
    },
    getAttackPriority:function(){
        if(this.taunt){
            return 1;
        }else{
            return 0;
        }
    },
    getPoint:function(){
        return this.getComponent("SlidePoint").point;
    },
    getCell:function(){
        return this.getComponent("SlidePoint").cell;
    },
    getUnitId:function(){
        return this.unitId;
    },
    getTeam:function(){
        return this.team;
    },
    isMoving:function(){
        return this.getComponent("UnitMove").isMoving();
    },
});
