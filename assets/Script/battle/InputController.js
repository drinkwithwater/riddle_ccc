const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
const UserInputList=require("UserInputList");
const InputObject=require("UserInput").InputObject;
const InputType=require("UserInput").InputType;
const _=require("underscore");
const COLOR_CHOOSE=cc.color(111,111,0);
const COLOR_IDLE=cc.color(255,255,255);
var OperContext=cc.Class({
    name:"OperContext",
    properties:{
        startFlag:false,
        ctrl:null,
        unit:null,
    },
    ctor:function(){
        this.ctrl=arguments[0];
        this.startFlag=false;
        this.unit=null;
    },
    start:function(unit){
        this.startFlag=true;
        this.unit=unit;
    },
    oper:function(input){
        this.unit.getComponent("UserInputList").add(input);
    },
    onCtrlCancel:function(){
        if(_.isObject(this.unit)){
            this.unit.getComponent("UnitMove").cancelOper();
        }
        this.startFlag=false;
        this.unit=null;
    },
    onUnitCancel:function(){
        this.ctrl.cancelOper();
        this.startFlag=false;
        this.unit=null;
    },
    idSame:function(unitId){
        return this.unit.getComponent("UnitBase").unitId==unitId;
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        cellManager:{
            type:CellManager,
            default:null,
        },
        unitManager:{
            type:UnitManager,
            default:null,
        },
        focusItem:{
            type:cc.Node,
            default:null,
        },
        preCell:{
            default:new cc.Vec2(-1,-1),
        },
        oper:{
            type:OperContext,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.bindMouseListener();
        this.oper=new OperContext(this);
    },

    /********************
    * operation on cell *
    *********************/
    isStart:function(){
        return this.oper.startFlag;
    },
    startCell:function(cell){
        // Todo find unit
        var startUnit=this.unitManager.unit$(cell);
        if(_.isObject(startUnit)){
            this.oper.start(startUnit);
            this.preCell=cell;
            this.focusItem.color=COLOR_CHOOSE;
        }
    },
    overCell:function(cell){
        if(!this.isStart()){
            return ;
        }
        if(cell.x==this.preCell.x&&cell.y==this.preCell.y){
            return ;
        }
        console.log("over cell : ",cell.x,cell.y);
        
        this.preCell=cell;
        
        var unit=this.unitManager.unit$(cell);
        if(_.isObject(unit)){
            var unitInter=unit.getComponent("UnitInter");
            if(this.oper.idSame(unitInter.getUnitId())){
                // over oper unit
                var input=new InputObject(InputType.MOVE,cell);
                this.oper.oper(input);
            }else{
                // over a unit
                var input=new InputObject(InputType.OPER,cell,unitInter);
                this.oper.oper(input);
            }
        }else if(this.cellManager.canMove(cell)){
            // over a empty cell
            var input=new InputObject(InputType.MOVE,cell);
            this.oper.oper(input);
        }else{
            // over a unmovable cell
            this.cancel();
            return ;
        }
    },
    cancel:function(){
        this.oper.onCtrlCancel();
        this.cancelOper();
    },
    // call by oper
    cancelOper:function(){
        this.preCell=cc.p(-1,-1);
        this.focusItem.color=COLOR_IDLE;
    },

    /****************
    * bind listener *
    *****************/
    bindTouchListener:function(){
        //TODO
    },
    bindMouseListener:function(){
        var thisVar=this;
        var mapNode=this.node;
        mapNode.on(cc.Node.EventType.MOUSE_DOWN,function(event){
            if(event.getButton()==cc.Event.EventMouse.BUTTON_LEFT){
                var cell=thisVar.locationToCell(event.getLocation());
                /*
                console.log("move listener:",cell.x,cell.y);*/
                if(!thisVar.isStart()){
                    thisVar.startCell(cell);
                }else{
                    thisVar.cancel()
                }
            }
        });
        var focusItem=this.focusItem;
        mapNode.on(cc.Node.EventType.MOUSE_MOVE,function(event){
            var cell=thisVar.locationToCell(event.getLocation());
            var center=thisVar.cellManager.cellToPositionAR(cell);
            focusItem.attr({
                x:center.x,
                y:center.y,
                active:true
            });
            thisVar.overCell(cell);
        });
        mapNode.on(cc.Node.EventType.MOUSE_LEAVE,function(event){
            thisVar.cancel();
            focusItem.active=false;
        });
    },

    // event location to cell
    locationToCell:function(eventLocation){
        var point=this.node.convertToNodeSpace(eventLocation);
        return this.cellManager.positionToCell(point);
    },

});
