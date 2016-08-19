var teamColor={
    0:cc.color(255,255,255),
    1:cc.color(0,0,255),
    2:cc.color(255,0,0),
    3:cc.color(0,0,0),
};
cc.Class({
    extends: cc.Component,

    properties: {
        taunt:false,
        stealth:false,
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
    }
});
