<template>
<uni-shadow-root class="iView-index-item-index"><view class="i-index-item i-class">
    <view class="i-index-item-header">{{name}}</view>
    <view class="i-index-item-content">
        <slot></slot>
    </view>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>

global['__wxRoute'] = 'iView/index-item/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        name : {
            type : String,
            value : ''
        }
    },
    relations : {
        '../index/index' : {
            type : 'parent'
        }
    },
    data : {
        top : 0,
        height : 0,
        currentName : ''
    },
    methods: {
        updateDataChange() {
            const className = '.i-index-item';
            const query = wx.createSelectorQuery().in(this);
            query.select( className ).boundingClientRect((res)=>{
                    this.setData({
                        top : res.top,
                        height : res.height,
                        currentName : this.data.name
                    })
            }).exec()
        }
    }
})
export default global['__wxComponents']['iView/index-item/index']
</script>
<style platform="mp-weixin">
.i-index-item-header{height:30px;line-height:30px;background:#eee;font-size:14px;padding-left:10px;width:100%;box-sizing:border-box}.i-index-item-content{font-size:14px}
</style>