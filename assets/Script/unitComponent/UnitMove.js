const UserInputList=require("UserInputList");
const InputObject=require("UserInput").InputObject;
const InputType=require("UserInput").InputType;
const UnitAttack=require("UnitAttack");
const SlidePoint=require("SlidePoint");
const UnitAttributes=require("UnitAttributes");
const CellManager=require("CellManager");
const UnitBase=require("UnitBase")
const riddleUtil=require("riddleUtil");
const _=require("underscore");
const FIX_RANGE=5;
cc.Class({
    extends: cc.Component,

    properties: {
        userInputList:{
            type:UserInputList,
            default:null,
        },
        unitAttack:{
            type:UnitAttack,
            default:null,
        },
        /*
        moveDirect:{
            type:cc.Vec2,
            default:null,
        },*/
        slidePoint:{
            type:SlidePoint,
            default:null,
        },
        unitAttr:{
            type:UnitAttributes,
            default:null,
        },
        moveFlag:false,
        //
        unitBase:{
            type:UnitBase,
            default:null,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.userInputList=this.getComponent("UserInputList");
        this.userInputList.clear();
        this.unitAttack=this.getComponent("UnitAttack");
        this.slidePoint=this.getComponent("SlidePoint");
        this.unitBase=this.getComponent("UnitBase");
        this.unitAttr=this.getComponent("UnitAttributes");
    },



    updatePosition:function(){
        var positionAR=this.unitBase.cellManager.pointToPositionAR(this.slidePoint.point);
        this.node.attr({
            x:positionAR.x,
            y:positionAR.y
        });
    },
    // private
    updateStand:function(dt){
        var offset=dt*this.unitAttr.getSpeed();
        var thisPoint=this.slidePoint;
        thisPoint.moveSelfCell(thisPoint.cell,offset);
        this.updatePosition();
    },
    // private
    updateMove:function(curInput,nextInput,dt){
        var thisPoint=this.slidePoint;
        var cellDistance=thisPoint.cellFarFrom(curInput.cell);
        var offset=dt*this.unitAttr.getSpeed();
        if(cellDistance==0){
            this.userInputList.shift();
            if(!_.isObject(nextInput)){
                this.userInputList.clear();
                this.updateStand(dt);
                return ;
            }else if(nextInput.type==InputType.OPER){
                this.updateStand(dt);
                return ;
            }else if(nextInput.type==InputType.MOVE){
                if(!this.unitBase.unitManager.canMove(nextInput.cell)){
                    this.userInputList.clear();
                    this.updateStand(dt);
                    return ;
                }else{
                    thisPoint.moveNearCell(nextInput.cell,offset);
                }
            }else{
            }
        }else if(cellDistance==1){
            thisPoint.moveNearCell(curInput.cell,offset);
        }else if(cellDistance==2){
            var unitManager=this.unitBase.unitManager;
            var path=riddleUtil.shortestPath(thisPoint.cell,curInput.cell,function(cell){
                return unitManager.canMove(cell);
            });
            if(path.length>=2 && path.length<=FIX_RANGE){
                thisPoint.moveNearCell(path[1],offset);
            }else{
                this.userInputList.clear();
                this.updateStand(dt);
                return ;
            }
        }else{
            this.userInputList.clear();
            this.updateStand(dt);
            return ;
        }
        this.updatePosition();
    },
    // private
    updateOper:function(curInput,nextInput,dt){
        if(this.slidePoint.isStanding()){
            this.unitAttack.hitAttack(curInput);
            this.userInputList.shift();
        }else{
            this.updateStand(dt);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(!this.unitBase.initFinished){
            return ;
        }
        if(!this.unitAttack.canMove()){
            // when the unit is attacking, it can not move;
            return ;
        }else if(this.userInputList.isFinished()){
            // user input list is empty.
            this.updateStand(dt);
            return ;
        }else{
            var curInput=this.userInputList.getCurrentInput();
            var nextInput=this.userInputList.getNextInput();
            if(!_.isObject(curInput)){
                this.userInputList.clear();
                this.updateStand(dt);
                return ;
            }else if(curInput.type==InputType.MOVE){
                var cellDistance=this.slidePoint.cellFarFrom(curInput.cell);
                if((cellDistance>0)&&(!this.unitBase.unitManager.canMove(curInput.cell))){
                    // curInput.cell can not be move to
                    this.userInputList.clear();
                    this.updateStand(dt);
                    return ;
                }else{
                    this.updateMove(curInput,nextInput,dt);
                    return ;
                }
            }else if(curInput.type==InputType.OPER){
                if(!_.isObject(this.unitBase.unitManager.unit$(curInput.cell))){
                    // no unit in curInput.cell
                    this.userInputList.clear();
                    this.updateStand(dt);
                    return ;
                }else{
                    this.updateOper(curInput,nextInput,dt);
                    return ;
                }
            }
        }
    },

    isMoving:function(){
        return this.moveFlag;
    },
    /*
    getMoveDirect:function(){
        return this.moveDirect;
    }*/
});
