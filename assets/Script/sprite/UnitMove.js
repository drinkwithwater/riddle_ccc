const UserInputList=require("UserInputList");
const InputObject=require("UserInput").InputObject;
const InputType=require("UserInput").InputType;
const UnitAttack=require("UnitAttack");
const SlidePoint=require("SlidePoint");
const UnitTypeComponent=require("UnitTypeComponent");
const CellManager=require("CellManager");
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
        moveDirect:{
            type:cc.Vec2,
            default:null,
        },
        slidePoint:{
            type:SlidePoint,
            default:null,
        },
        unitTypeComponent:{
            type:UnitTypeComponent,
            default:null,
        },
        moveFlag:false,
        //
        cellManager:{
            type:CellManager,
            default:null,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.userInputList=this.node.getComponent("UserInputList");
        this.userInputList.clear();
        this.unitAttack=this.node.getComponent("UnitAttack");
        this.slidePoint=this.node.getComponent("SlidePoint");
    },

    // call by the owner unit
    initByUnit:function(){
    },


    // private
    updateStand:function(dt){
        var offset=dt*this.unitTypeComponent.getSpeed();
        var thisPoint=this.slidePoint;
        thisPoint.moveSelfCell(thisPoint.cell,offset);
    },
    // private
    updateMove:function(curInput,nextInput,dt){
        var cellDistance=thisPoint.cellFarFrom(curInput.cell);
        var offset=dt*this.unitTypeComponent.getSpeed();
        if(cellDistance==0){
            this.userInputList.shift();
            if(!cc.js.isObject(nextInput)){
                this.userInputList.clear();
                this.updateStand(dt);
                return ;
            }else if(nextInput.type==InputType.OPER){
                this.updateStand(dt);
                return ;
            }else if(nextInput.type==InputType.MOVE){
                if(!this.cellManager.canMove(nextInput.cell)){
                    this.userInputList.clear();
                    this.updateStand(dt);
                    return ;
                }else{
                    thisPoint.moveNearCell(nextInput.cell,offset);
                }
            }
        }else if(cellDistance==1){
            thisPoint.moveNearCell(curInput.cell,offset);
        }else if(cellDistance==2){
            //TODO
        }else{
            this.userInputList.clear();
            this.updateStand(dt);
        }
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
            if(!cc.js.isObject(curInput)){
                this.userInputList.clear();
                this.updateStand(dt);
                return ;
            }else if(curInput.type==InputType.MOVE){
                var cellDistance=thisPoint.cellFarFrom(curInput.cell);
                if((cellDistance>0)&&(!this.cellManager.canMove(curInput.cell))){
                    // curInput.cell can not be move to
                    this.userInputList.clear();
                    this.updateStand(dt);
                    return ;
                }else{
                    this.updateMove(curInput,nextInput,dt);
                    return ;
                }
            }else if(curInput.type==InputType.OPER){
                if(!cc.js.isObject(this.unitManager.unit$(curInput.cell))){
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
    getMoveDirect:function(){
        return this.moveDirect;
    }
});
