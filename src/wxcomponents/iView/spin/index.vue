<template>
<uni-shadow-root class="iView-spin-index"><view :class="'i-class i-spin i-spin-'+(size)+' '+(fix ? 'i-spin-fix' : '')+' '+(custom ? 'i-spin-show-text' : '')+' '+(fullscreen ? 'i-spin-fullscreen' : '')">
    <div class="i-spin-main">
        <view class="i-spin-dot"></view>
        <div class="i-spin-text"><slot></slot></div>
    </div>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/spin/index'
Component({
    externalClasses: ['i-class'],

    properties: {
        // small || default || large
        size: {
            type: String,
            value: 'default'
        },
        fix: {
            type: Boolean,
            value: false
        },
        fullscreen: {
            type: Boolean,
            value: false
        },
        custom: {
            type: Boolean,
            value: false
        }
    }
});
export default global['__wxComponents']['iView/spin/index']
</script>
<style platform="mp-weixin">
.i-spin{color:#2d8cf0;vertical-align:middle;text-align:center}.i-spin-dot{position:relative;display:block;border-radius:50%;background-color:#2d8cf0;width:20px;height:20px;animation:ani-spin-bounce 1s 0s ease-in-out infinite}.i-spin-large .i-spin-dot{width:32px;height:32px}.i-spin-small .i-spin-dot{width:12px;height:12px}.i-spin-fix{position:absolute;top:0;left:0;z-index:8;width:100%;height:100%;background-color:rgba(255,255,255,.9)}.i-spin-fullscreen{z-index:2010}.i-spin-fullscreen-wrapper{position:fixed;top:0;right:0;bottom:0;left:0}.i-spin-fix .i-spin-main{position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.i-spin-fix .i-spin-dot{display:inline-block}.i-spin-show-text .i-spin-dot,.i-spin-text{display:none}.i-spin-show-text .i-spin-text{display:block;font-size:14px}@keyframes ani-spin-bounce{0%{transform:scale(0)}100%{transform:scale(1);opacity:0}}
</style>