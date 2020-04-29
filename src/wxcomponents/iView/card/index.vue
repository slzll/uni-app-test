<template>
<uni-shadow-root class="iView-card-index"><view :class="'i-class i-card '+(full ? 'i-card-full' : '')">
    <view class="i-class i-card-header">
        <view class="i-card-header-content">
            <image class="i-card-header-thumb" :src="thumb" mode="aspectFit" v-if="thumb"></image>
            {{ title }}
        </view>
        <view class="i-card-header-extra" v-if="extra">{{ extra }}</view>
    </view>
    <view class="i-class i-card-body"><slot name="content"></slot></view>
    <view class="i-class i-card-footer"><slot name="footer"></slot></view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/card/index'
Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        }
    }
});
export default global['__wxComponents']['iView/card/index']
</script>
<style platform="mp-weixin">
.i-card{margin:0 16px;font-size:14px;overflow:hidden;position:relative;background:#fff;border:1rpx solid #dddee1;border-radius:5px}.i-card-full{margin:0;border-left:none;border-right:none;border-radius:0}.i-card-header{display:flex;padding:6px 16px;align-items:center}.i-card-header-content{flex:1;text-align:left}.i-card-header-thumb{display:inline-block;width:64px;height:64px;position:relative;margin-left:auto;margin-right:auto;overflow:hidden;background-size:cover;vertical-align:middle}.i-card-header-title{display:inline-block;vertical-align:middle;font-size:14px;color:#1c2438}.i-card-header-extra{flex:1;text-align:right;font-size:14px;color:#80848f}.i-card-body{position:relative;padding:6px 16px;color:#495060;font-size:14px}.i-card-body::before{content:'';position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0;pointer-events:none;box-sizing:border-box;border:0 solid #e9eaec;border-top-width:1px}.i-card-footer{position:relative;padding:6px 16px;color:#80848f;font-size:12px}
</style>