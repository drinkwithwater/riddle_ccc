cc.Class({
    extends: cc.Component,

    properties: {
        taunt:false,
        stealth:false,
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
});
