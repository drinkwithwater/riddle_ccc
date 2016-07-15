const CellManager=require("CellManager");
const UnitManager=require("UnitManager");
const UserInputList=require("UserInputList");
const InputObject=require("UserInput").InputObject;
const InputType=require("UserInput").InputType;
const _=require("underscore");
var OperObject=function(){
    this.startFlag=false;
    this.unit=null;
    this.start=function(unit){
        this.startFlag=true;
        this.unit=unit;
    }
    this.oper=function(input){
        this.unit.getComponent("UserInputList").add(input);
    }
    this.cancel=function(){
        this.startFlag=false;
        this.unit=null;
    }
}
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
            type:OperObject,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.bindMouseListener();
        this.oper=new OperObject();
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
        }
    },
    overCell:function(cell){
        if(!this.isStart()){
            return ;
        }
        if(_.isObject(this.preCell)){
            if(cell.x==this.preCell.x&&cell.y==this.preCell.y){
                return ;
            }
        }
        this.preCell=cell;
        var input=new InputObject(InputType.MOVE,cell);
        this.oper.oper(input);
        console.log("over cell : ",cell.x,cell.y);
    },
    cancel:function(){
        this.oper.cancel();
        this.preCell=null;
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
