<template>
<uni-shadow-root class="iView-tag-index"><view :class="'i-class i-tag '+(parse.getClass(color,type,checked,checkable))+' '+(checkable ? '' : 'i-tag-disable')" @click="tapTag">
    <slot></slot>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>

global['__wxRoute'] = 'iView/tag/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        //slot name
        name : {
            type : String,
            value : ''
        },
        //can click or not click
        checkable : {
            type : Boolean,
            value : false
        },
        //is current choose
        checked : {
            type : Boolean,
            value : true
        },
        //background and color setting
        color : {
            type : String,
            value : 'default'
        },
        //control fill or not
        type : {
            type : String,
            value : 'dot'
        } 
    },
    methods : {
        tapTag(){
            const data = this.data;
            if( data.checkable ){
                const checked = data.checked ? false : true;
                this.triggerEvent('change',{
                    name : data.name || '',
                    checked : checked
                });
            }
        }
    }
})
export default global['__wxComponents']['iView/tag/index']
</script>
<style platform="mp-weixin">
.i-tag{display:inline-block;height:18px;line-height:18px;padding:0 4px;border-radius:2px;background:#fff;font-size:11px;vertical-align:middle;border:1rpx solid #dddee1}.i-tag-none{border-color:#fff}.i-tag-default{border-color:#dddee1;background:#e9eaec}.i-tag-red{background:#ed3f14;color:#fff}.i-tag-red-border{color:#ed3f14;background:#fff;border-color:#ed3f14}.i-tag-red-checked{background:#ed3f14;color:#fff;border-color:#ed3f14}.i-tag-green{background:#19be6b;color:#fff;border-color:#19be6b}.i-tag-green-border{color:#19be6b;background:#fff;border-color:#19be6b}.i-tag-green-checked{background:#19be6b;color:#fff;border-color:#19be6b}.i-tag-blue{background:#2d8cf0;color:#fff;border-color:#2d8cf0}.i-tag-blue-border{color:#2d8cf0;background:#fff;border-color:#2d8cf0}.i-tag-blue-checked{background:#2d8cf0;color:#fff;border-color:#2d8cf0}.i-tag-yellow{background:#f90;color:#fff;border-color:#f90}.i-tag-yellow-border{color:#f90;background:#fff;border-color:#f90}.i-tag-yellow-checked{background:#f90;color:#fff;border-color:#f90}.i-tag-default-checked{background:#e9eaec;color:#495060;border-color:#e9eaec}
</style>