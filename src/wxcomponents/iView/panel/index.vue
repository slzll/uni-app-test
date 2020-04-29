<template>
<uni-shadow-root class="iView-panel-index"><view class="i-class i-panel">
    <view v-if="title" :class="'i-panel-title '+(hideTop ? 'i-panel-title-hide-top' : '')">{{ title }}</view>
    <view :class="'i-panel-content '+(hideBorder ? 'i-panel-without-border' : '')"><slot></slot></view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/panel/index'
Component({
    externalClasses: ['i-class'],

    properties: {
        title: {
            type: String,
            value: ''
        },
        // 标题顶部距离
        hideTop: {
            type: Boolean,
            value: false
        },
        hideBorder: {
            type: Boolean,
            value: false
        }
    }
});
export default global['__wxComponents']['iView/panel/index']
</script>
<style platform="mp-weixin">
.i-panel{position:relative;overflow:hidden}.i-panel-title{font-size:14px;line-height:1;color:#1c2438;padding:20px 16px 10px}.i-panel-title-hide-top{padding-top:0}.i-panel-content{position:relative;background:#fff;overflow:hidden}.i-panel-content::after{content:'';position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0;pointer-events:none;box-sizing:border-box;border:0 solid #e9eaec;border-top-width:1px;border-bottom-width:1px}.i-panel-without-border::after{border:0 none}
</style>