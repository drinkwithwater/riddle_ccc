var InputType={
    MOVE:2,
    OPER:3,
}
var InputObject=function(type,cell,targetId){
    this.type=type;
    this.cell=cell;
    this.targetId=targetId;
}
module.exports={
    InputType:InputType,
    InputObject:InputObject
}
