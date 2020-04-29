<template>
<uni-shadow-root class="iView-divider-index"><view class="i-divider i-class" :style="parse.getStyle(color,size,height)">
    <view class="i-divider-content" v-if="content !== ''">
        {{content}}
    </view>
    <view class="i-divider-content" v-else>
        <slot></slot>
    </view>
    <view class="i-divider-line" :style="'background:'+(lineColor)"></view>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>

global['__wxRoute'] = 'iView/divider/index'
Component({
    externalClasses: ['i-class'],
    properties: {
        content: {
            type: String,
            value: ''
        },
        height : {
            type: Number,
            value: 48
        },
        color : {
            type : String,
            value : '#80848f'
        },
        lineColor : {
            type : String,
            value : '#e9eaec'
        },
        size : {
            type: String,
            value: 12
        }
    }
});
export default global['__wxComponents']['iView/divider/index']
</script>
<style platform="mp-weixin">
.i-divider{width:100%;text-align:center;font-size:12px;position:relative;display:flex;align-items:center;justify-content:center}.i-divider-line{position:absolute;left:0;width:100%;height:1rpx;background-color:#f7f7f7;top:50%}.i-divider-content{background:#fff;position:relative;z-index:1;display:inline-block;padding:0 10px}
</style>