<template>
<uni-shadow-root class="iView-alert-index"><view :class="'i-class i-alert '+('i-alert-'+type)+' '+(showIcon?'i-alert-with-icon':'')+' '+(desc?'i-alert-with-desc':'')" v-if="(!closed)">
    <view v-if="showIcon" class="i-alert-icon">
        <i-icon type="prompt" v-if="type === 'info'" :size="desc?24:16"></i-icon>
        <i-icon type="success" v-if="type === 'success'" :size="desc?24:16"></i-icon>
        <i-icon type="warning" v-if="type === 'warning'" :size="desc?24:16"></i-icon>
        <i-icon type="delete" v-if="type === 'error'" :size="desc?24:16"></i-icon>
    </view>
    <slot></slot>
    <view class="i-alert-desc">
        <slot name="desc"></slot>
    </view>
    <view class="i-alert-close" v-if="closable" @click="handleTap">
        <i-icon type="close"></i-icon>
    </view>
</view></uni-shadow-root>
</template>

<script>
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-icon': IIcon}}

global['__wxRoute'] = 'iView/alert/index'
Component({
    externalClasses: ['i-class'],
    options: {
        multipleSlots: true
    },
    properties: {
        //info, success, warning, error
        type: {
            type: String,
            value: 'info'
        },
        closable: {
            type: Boolean,
            value: false
        },
        showIcon: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Boolean,
            default: false
        },
    },
    data: {
        closed: false
    },
    methods: {
        handleTap() {
            this.setData({
                closed: !this.data.closed,
            });
            this.triggerEvent('close');
        },

    }
});
export default global['__wxComponents']['iView/alert/index']
</script>
<style platform="mp-weixin">
.i-alert{position:relative;margin:10px;padding:8px 48px 8px 16px;font-size:14px;border-radius:2px;color:#fff;background:#f7f7f7;color:#495060}.i-alert.i-alert-with-icon{padding:8px 48px 8px 38px}.i-alert-info{color:#fff;background:#2db7f5}.i-alert-success{color:#fff;background:#19be6b}.i-alert-warning{color:#fff;background:#f90}.i-alert-error{color:#fff;background:#ed3f14}.i-alert-icon{position:absolute;top:9px;left:16px;font-size:14px}.i-alert-desc{font-size:12px}.i-alert-with-desc{padding:16px;position:relative}.i-alert-with-desc.i-alert-with-icon{padding:16px 16px 16px 69px}.i-alert-with-desc .i-alert-icon{top:50%;left:24px;margin-top:-21px;font-size:28px}.i-alert-close{font-size:12px;position:absolute;right:16px;top:8px;overflow:hidden;cursor:pointer}
</style>