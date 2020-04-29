<template>
<uni-shadow-root class="iView-drawer-index"><view :class="'i-class i-drawer '+(visible ? 'i-drawer-show' : '')+' '+('i-drawer-' + mode)">
    <view v-if="mask" class="i-drawer-mask" @click="handleMaskClick"></view>
    <view class="i-drawer-container">
        <slot></slot>
    </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/drawer/index'
Component({
    externalClasses: ['i-class'],
    properties: {
        visible: {
            type: Boolean,
            value: false
        },

        mask: {
            type: Boolean,
            value: true
        },

        maskClosable: {
            type: Boolean,
            value: true
        },

        mode: {
            type: String,
            value: 'left' // left right
        }
    },
    data: {},
    methods: {
        handleMaskClick() {
            if (!this.data.maskClosable) {
                return;
            }
            this.triggerEvent('close', {});
        }
    }
});
export default global['__wxComponents']['iView/drawer/index']
</script>
<style platform="mp-weixin">
.i-drawer{visibility:hidden}.i-drawer-show{visibility:visible}.i-drawer-show .i-drawer-mask{display:block;opacity:1}.i-drawer-show .i-drawer-container{opacity:1}.i-drawer-show.i-drawer-left .i-drawer-container,.i-drawer-show.i-drawer-right .i-drawer-container{transform:translate3d(0,-50%,0)}.i-drawer-mask{opacity:0;position:fixed;top:0;left:0;right:0;bottom:0;z-index:6;background:rgba(0,0,0,.6);transition:all .3s ease-in-out}.i-drawer-container{position:fixed;left:50%;top:50%;transform:translate3d(-50%,-50%,0);transform-origin:center;transition:all .3s ease-in-out;z-index:7;opacity:0}.i-drawer-left .i-drawer-container{left:0;top:50%;transform:translate3d(-100%,-50%,0)}.i-drawer-right .i-drawer-container{right:0;top:50%;left:auto;transform:translate3d(100%,-50%,0)}
</style>