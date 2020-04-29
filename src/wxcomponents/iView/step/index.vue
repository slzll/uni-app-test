<template>
<uni-shadow-root class="iView-step-index"><view :class="'i-class i-step-item '+(parse.getClass(status,current,index))+' '+(direction === 'vertical' ? 'i-step-vertical' : 'i-step-horizontal')" :style="parse.getItemStyle(len,direction)">
    <view class="i-step-item-ico">
        <view class="i-step-ico" v-if="parse.noIco(status,current,index,icon)">{{ index+1 }}</view>
        <view class="i-step-ico" v-else>
            <i-icon i-class="i-step-ico-in" :type="parse.getIcoClass(status,icon)"></i-icon>
        </view>
        <view class="i-step-line" v-if="index !== len - 1"></view>
    </view>
    <view class="i-step-item-main">
        <view class="i-step-item-title" v-if="title !== ''">
            {{title}}
        </view>
        <view class="i-step-item-title" v-else>
            <slot name="title"></slot>
        </view>
        <view class="i-step-item-content" v-if="content !== ''">
            {{content}}
        </view>
        <view class="i-step-item-content" v-else>
            <slot name="content"></slot>
        </view>
    </view>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-icon': IIcon}}

global['__wxRoute'] = 'iView/step/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        status : {
            type : String,
            //wait、process、finish、error
            value : ''
        },
        title : {
            type : String,
            value : ''
        },
        content : {
            type : String,
            value : ''
        },
        icon : {
            type : String,
            value : ''
        }
    },
    options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
    },
    relations : {
        '../steps/index' : {
            type : 'parent'
        }
    },
    data : {
        //step length
        len : 1,
        //current in step index
        index : 0,
        //parent component select current index
        current : 0,
        //css direction
        direction : 'horizontal'
    },
    methods : {
        updateDataChange( options ){
            this.setData({
                len : options.len,
                index : options.index,
                current : options.current,
                direction : options.direction
            })
        }
    }

})
export default global['__wxComponents']['iView/step/index']
</script>
<style platform="mp-weixin">
.i-step-ico{width:24px;height:100%;border-radius:100%;background:#fff;position:relative;z-index:2;margin:0 auto;border:#dddee1 solid 1px}.i-step-ico-in{vertical-align:baseline}.i-step-line{position:absolute;left:50%;top:12px;width:100%;height:1px;background:#dddee1}.i-step-horizontal .i-step-ico::after{position:absolute;top:11px;left:23px;z-index:1;content:'';height:1px;background:#fff;width:10px}.i-step-horizontal .i-step-item-main{text-align:center}.i-step-horizontal .i-step-ico::before{position:absolute;top:11px;left:-11px;z-index:1;content:'';height:1px;background:#fff;width:10px}.i-step-ico{box-sizing:border-box;font-size:12px}.i-step-process .i-step-ico{border:#2d8cf0 solid 1px;color:#fff;background:#2d8cf0}.i-step-wait .i-step-ico{border:#e9eaec solid 1px;color:#e9eaec}.i-step-wait .i-step-line{background:#2d8cf0}.i-step-finish .i-step-ico{border:#2d8cf0 solid 1px;color:#2d8cf0}.i-step-finish .i-step-line{background:#2d8cf0}.i-step-error .i-step-ico{border:#ed3f14 solid 1px;color:#ed3f14}.i-step-error .i-step-line{background:#ed3f14}.i-step-item{font-size:12px;position:relative;display:inline-block;box-sizing:border-box;padding-left:10px;vertical-align:top}.i-step-item-ico{width:100%;height:24px;line-height:24px;text-align:center}.i-step-item-main{margin-top:10px;clear:both}.i-step-item-title{font-size:14px;font-weight:700;color:#1c2438}.i-step-item-content{font-size:12px;font-weight:700;margin-top:2px;color:#80848f}.i-step-vertical{padding-bottom:30px}.i-step-vertical .i-step-item-ico{width:24px;float:left}.i-step-vertical .i-step-item-main{margin-left:40px;margin-top:0;clear:inherit}.i-step-vertical .i-step-line{position:absolute;height:100%;top:0;left:10px;margin:0 0 0 12px;width:1px}
</style>