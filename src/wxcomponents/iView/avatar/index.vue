<template>
<uni-shadow-root class="iView-avatar-index"><view :class="'i-class i-avatar i-avatar-'+(shape)+' i-avatar-'+(size)+' '+(src ? 'i-avatar-image' : '')">
    <image :src="src" v-if="src !== ''"></image>
    <view class="i-avatar-string" v-else><slot></slot></view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/avatar/index'
Component({
    externalClasses: ['i-class'],

    properties: {
        // circle || square
        shape: {
            type: String,
            value: 'circle'
        },
        // small || large || default
        size: {
            type: String,
            value: 'default'
        },
        src: {
            type: String,
            value: ''
        }
    }
});
export default global['__wxComponents']['iView/avatar/index']
</script>
<style platform="mp-weixin">
.i-avatar{display:inline-block;text-align:center;background:#ccc;color:#fff;white-space:nowrap;position:relative;overflow:hidden;vertical-align:middle;width:32px;height:32px;line-height:32px;border-radius:16px;font-size:18px}.i-avatar .ivu-avatar-string{line-height:32px}.i-avatar-large{width:40px;height:40px;line-height:40px;border-radius:20px;font-size:24px}.i-avatar-large .ivu-avatar-string{line-height:40px}.i-avatar-small{width:24px;height:24px;line-height:24px;border-radius:12px;font-size:14px}.i-avatar-small .ivu-avatar-string{line-height:24px}.i-avatar-image{background:0 0}.i-avatar-square{border-radius:4px}.i-avatar>image{width:100%;height:100%}
</style>