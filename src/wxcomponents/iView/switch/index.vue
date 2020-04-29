<template>
<uni-shadow-root class="iView-switch-index"><view :class="'i-class i-switch '+(parse.setSize(size))+' '+(parse.setCurrent(value,disabled))" @click="toggle">
    <input :name="name" type="text" :wx:value="value" class="i-switch-hide-input"></input>
    <view class="i-switch-inner" v-if="value === true">
        <slot name="open"></slot>
    </view>
    <view class="i-switch-inner" v-else>
        <slot name="close"></slot>
    </view>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>

global['__wxRoute'] = 'iView/switch/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        value : {
            type : Boolean,
            value : false
        },
        //large small default
        size : {
            type : String,
            value : 'default'
        },
        // is or not disable
        disabled : {
            type : Boolean,
            value : false
        },
        // hidden inut name
        name : {
            type : String,
            value : ''
        }
    },
    options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
    },
    methods : {
        toggle(){
            if( this.data.disabled ) return;
            const data = this.data;
            const value = data.value ? false : true;
            this.triggerEvent('change',{
                value : value
            })
        }
    }
});
export default global['__wxComponents']['iView/switch/index']
</script>
<style platform="mp-weixin">
.i-switch{display:inline-block;width:48px;height:24px;line-height:24px;border-radius:24px;vertical-align:middle;border:1px solid #ccc;background-color:#ccc;position:relative;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all .2s ease-in-out}.i-switch-hide-input{display:none;opacity:0}.i-switch-inner{color:#fff;font-size:12px;position:absolute;left:25px;vertical-align:middle}.i-switch-inner .i-icon{width:12px;height:12px;text-align:center;vertical-align:middle}.i-switch:after{content:'';width:22px;height:22px;border-radius:22px;background-color:#fff;position:absolute;left:1px;top:1px;cursor:pointer;transition:left .2s ease-in-out,width .2s ease-in-out}.i-switch-checked:after{left:8px}.i-switch-large{width:60px}.i-switch-large.i-switch-checked:after{left:37px}.i-switch-checked:after{left:25px}.i-switch-checked{border-color:#2d8cf0;background-color:#2d8cf0}.i-switch-checked .i-switch-inner{left:8px}.i-switch-checked:after{left:25px}.i-switch-disabled{background:#f3f3f3;border-color:#f3f3f3}.i-switch-disabled:after{background:#ccc;cursor:not-allowed}.i-switch-disabled .i-switch-inner{color:#ccc}
</style>