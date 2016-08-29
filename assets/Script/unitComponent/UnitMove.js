const UserInputList=require("UserInputList");
const InputObject=require("UserInput").InputObject;
const InputType=require("UserInput").InputType;
const UnitSkill=require("UnitSkill");
const SlidePoint=require("SlidePoint");
const UnitAttributes=require("UnitAttributes");
const CellManager=require("CellManager");
const UnitBase=require("UnitBase")
const riddleUtil=require("riddleUtil");
const _=require("underscore");
const FIX_RANGE=2;
cc.Class({
    extends: cc.Component,

    properties: {
        timeSum:0,
        updateTimeSlice:0.02,
        userInputList:{
            visible:false,
            get:function(){
                return this.getComponent("UserInputList");
            }
        },
        unitSkill:{
            visible:false,
            get:function(){
                return this.getComponent("UnitSkill");
            }
        },
        slidePoint:{
            visible:false,
            get:function(){
                return this.getComponent("SlidePoint");
            }
        },
        unitAttr:{
            visible:false,
            get:function(){
                return this.getComponent("UnitAttributes");
            }
        },
        
        _moveFlag:{
            visible:false,
            default:false,
        },
        moveFlag:{
            visible:false,
            get:function(){
                return this._moveFlag;
            },
            set:function(flag){
                if(this._moveFlag==flag){
                    return ;
                }else{
                    if(this._moveFlag){
                        this.startStand();
                    }else{
                        this.startMove();
                    }
                    this._moveFlag=flag;
                }
            }
        },
        //
        unitBase:{
            visible:false,
            get:function(){
                return this.getComponent("UnitBase");
            }
        },
        oper:{
            visible:false,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.userInputList.clear();
    },
    startMove:function(){
        console.log("start move");
        this.unitSkill.unitStartMove();
    },
    startStand:function(){
        console.log("start stand");
        this.unitSkill.unitStartStand();
    },

    onStartOper:function(operContext){
        this.oper=operContext;
        // TODO
    },

    // call by oper
    cancelOper:function(){
        this.oper=null;
    },

    deadCancel:function(){
        if(this.oper){
            this.oper.onUnitCancel();
            this.cancelOper();
        }
    },

    updateCancel:function(dt){
        if(_.isObject(this.oper)){
            this.oper.onUnitCancel();
            this.cancelOper();
        }
        this.userInputList.clear();
        this.updateStand(dt);
    },

    // private
    updateStand:function(dt){
        var offset=dt*this.unitAttr.getSpeed();
        var thisPoint=this.slidePoint;
        thisPoint.moveSelfCell(thisPoint.cell,offset);
        if(thisPoint.canStand()){
            this.moveFlag=false;
        }else{
            this.moveFlag=true;
        }
        this.slidePoint.updatePosition();
    },
    // private
    updateMove:function(curInput,nextInput,dt){
        this.moveFlag=true;
        var thisPoint=this.slidePoint;
        var cellDistance=thisPoint.cellFarFrom(curInput.cell);
        var offset=dt*this.unitAttr.getSpeed();
        if(cellDistance==0){
            this.userInputList.shift();
            if(!_.isObject(nextInput)){
                this.updateStand(dt);
                return ;
            }else if(nextInput.type==InputType.OPER){
                this.updateStand(dt);
                return ;
            }else if(nextInput.type==InputType.MOVE){
                if(!this.unitBase.cellManager.canMove(nextInput.cell)){
                    this.updateStand(dt);
                    return ;
                }else{
                    thisPoint.moveNearCell(nextInput.cell,offset);
                }
            }else{
            }
        }else if(cellDistance==1){
            thisPoint.moveNearCell(curInput.cell,offset);
        }else if(cellDistance>=2 && cellDistance<=FIX_RANGE){
            var cellManager=this.unitBase.cellManager;
            var path=riddleUtil.shortestPath(thisPoint.cell,curInput.cell,function(cell){
                return cellManager.canMove(cell);
            });
            // TO DISCUSS, the path include first node...
            if(path.length>=2 && path.length<=FIX_RANGE+1){
                thisPoint.moveNearCell(path[1],offset);
            }else{
                this.updateCancel(dt);
                return ;
            }
        }else{
            this.updateCancel(dt);
            return ;
        }
        this.slidePoint.updatePosition();
    },
    // private
    updateOper:function(curInput,nextInput,dt){
        if(this.slidePoint.canStand()){
            this.unitSkill.unitHit(curInput);
            this.userInputList.shift();
        }else{
            this.updateStand(dt);
        }
    },

    // called every frame, uncomment this function to activate update callback
    
    update:function(dt){
        this.sliceUpdate(dt);
        /*
        this.timeSum+=dt;
        if(this.timeSum>=this.updateTimeSlice){
            this.sliceUpdate(this.timeSum);
            this.timeSum=0;
        }*/
    },
    sliceUpdate: function (dt) {
        if(!this.unitBase.initFinished){
            return ;
        }
        if(this.unitSkill.isAttacking()){
            // when the unit is attacking, it can only attack;
            var curInput=this.userInputList.getCurrentInput();
            var nextInput=this.userInputList.getNextInput();
            if(_.isObject(curInput)){
                if(curInput.type==InputType.OPER){
                    this.updateOper(curInput,nextInput,dt);
                }
            }
            return ;
        }else if(this.userInputList.isFinished()){
            // user input list is empty.
            this.updateStand(dt);
            return ;
        }else{
            var curInput=this.userInputList.getCurrentInput();
            var nextInput=this.userInputList.getNextInput();
            if(!_.isObject(curInput)){
                this.updateStand(dt);
                return ;
            }else if(curInput.type==InputType.MOVE){
                var cellDistance=this.slidePoint.cellFarFrom(curInput.cell);
                if((cellDistance>0)&&(!this.unitBase.cellManager.canMove(curInput.cell))){
                    // curInput.cell can not be move to
                    this.userInputList.shift();
                    this.updateStand(dt);
                    return ;
                }else{
                    this.updateMove(curInput,nextInput,dt);
                    return ;
                }
            }else if(curInput.type==InputType.OPER){
                if(!_.isObject(this.unitBase.unitManager.unit$(curInput.cell))){
                    // no unit in curInput.cell
                    //this.updateCancel(dt);
                    this.userInputList.shift();
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
