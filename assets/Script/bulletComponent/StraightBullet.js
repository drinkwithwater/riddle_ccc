const BulletBase=require("BulletBase");
const FlyPoint=require("FlyPoint");
const UnitManager=require("UnitManager");
const CellManager=require("CellManager");
const _=require("underscore");
cc.Class({
    extends: BulletBase,

    properties: {
        direct:null,
    },
    

    initByBulletManager:function(bulletManager,point,bulletId,targetId){
        this._super.apply(this,arguments);
    },

    update: function (dt) {
    },

});