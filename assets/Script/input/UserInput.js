var InputType={
    START:1,
    MOVE:2,
    OPER:3,
    END:4
}
var InputObject=function(cell,targetId,type){
    this.cell=cell;
    this.targetId=targetId;
    this.type=type;
}
module.exports={
    InputType:InputType,
    InputObject:InputObject
}
