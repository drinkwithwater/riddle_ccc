var InputType={
    MOVE:2,
    OPER:3,
}
var InputObject=function(type,cell,targetInter){
    this.type=type;
    this.cell=cell;
    this.targetInter=targetInter;
}
module.exports={
    InputType:InputType,
    InputObject:InputObject
}
