const BasePoint=require("BasePoint");
const riddleUtil=require("riddleUtil");
const SLIDE_STATE_ALL=0;
const SLIDE_STATE_X=1;
const SLIDE_STATE_Y=2;
cc.Class({
    extends: BasePoint,

    properties: {
        slideState:0,
        nodeBase:null,
    },



    // Override
    changeCell:function(oldCell,newCell){
        this.nodeBase.cellChangeHandler(oldCell,newCell);
    },

    // Override
    initByNode:function(nodeBase,cell){
        var cellManager=nodeBase.cellManager;
        this.cellManager=cellManager;
        this.nodeBase=nodeBase;

        this.cell.x=cell.x;
        this.cell.y=cell.y;
        var point=cellManager.cellToPoint(cell);
        this.point.x=point.x;
        this.point.y=point.y;

    },

    // slide to a destination point, private function
    pointSlide:function(dstPoint,offset){
        var dx=dstPoint.x-this.point.x;
        var dy=dstPoint.y-this.point.y;
        var absDx=Math.abs(dx);
        var absDy=Math.abs(dy);
        if(offset>=absDx+absDy){
            this.point.x=dstPoint.x;
            this.point.y=dstPoint.y;
            this.slideState=SLIDE_STATE_ALL;
        }else{
            var xSign=(dx>0)?1:-1;
            var ySign=(dy>0)?1:-1;
            var realSlideState=this.slideState;
            if(realSlideState==SLIDE_STATE_ALL){
                if(absDx<absDy){
                    realSlideState=SLIDE_STATE_X;
                }else {
                    realSlideState=SLIDE_STATE_Y;
                }
            }
            switch(realSlideState){
                case SLIDE_STATE_X:
                    if(absDx<offset){
                        this.point.x=dstPoint.x;
                        this.point.y+=ySign*(offset-absDx);
                        this.slideState=SLIDE_STATE_Y;
                    }else if(absDx==offset){
                        this.point.y=dstPoint.y;
                        this.slideState=SLIDE_STATE_ALL;
                    }else{// absDx>offset
                        this.point.x+=xSign*offset;
                    }
                    break;
                case SLIDE_STATE_Y:
                    if(absDy<offset){
                        this.point.y=dstPoint.y;
                        this.point.x+=xSign*(offset-absDy);
                        this.slideState=SLIDE_STATE_X;
                    }else if(absDy==offset){
                        this.point.y=dstPoint.y;
                        this.slideState=SLIDE_STATE_ALL;
                    }else{// absDy>offset
                        this.point.y+=ySign*offset;
                    }
                    break;
            }
        }
    },

    // move to the cell of itself
    moveSelfCell:function(selfCell,offset){
        var dstPoint=this.cellManager.cellToPoint(selfCell);
        this.pointSlide(dstPoint,offset);
    },

    // move to the cell near self
    moveNearCell:function(nearCell,offset){
        var dstPoint=this.cellManager.cellToPoint(nearCell);
        this.pointSlide(dstPoint,offset);
        this.updateCell();
    },

    isStanding:function(){
        var centerPoint=this.cellManager.cellToPoint(this.cell);
        if(0==this.pointFarFrom(centerPoint)){
            return true;
        }else{
            return false;
        }
    }

});
