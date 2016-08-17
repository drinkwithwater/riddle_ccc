cc.Class({
    extends: cc.Component,

    properties: {
        speed:50,
        _maxHp:{
            visible:false,
            default:2,
        },
        maxHp:{
            set:function(value){
                this._maxHp=value;
                if(this.hp>value){
                    this.hp=value;
                }
            },
            get:function(){
                return this._maxHp;
            }
        },
        _hp:{
            visible:false,
            default:2,
        },
        hp:{
            set:function(value){
                this.hpLabel.string=String(value);
                label.string=String(value);
                this._hp=value;
            },
            get:function(){
                return this._hp;
            }
        },
        _ap:{
            visible:false,
            default:1,
        },
        ap:{
            set:function(value){
                this.apLabel.string=String(value);
                this._ap=value;
            },
            get:function(){
                return this._ap;
            }
        },
        apNodeName:"ap",
        hpNodeName:"hp",
        hpLabel:{
            visible:false,
            get:function(){
                return this.node.getChildByName(this.hpNodeName).getComponent("cc.Label");
            }
        },
        apLabel:{
            visible:false,
            get:function(){
                return this.node.getChildByName(this.apNodeName).getComponent("cc.Label");
            }
        }
    },

    getSpeed:function(){
        return this.speed;
    },
});
