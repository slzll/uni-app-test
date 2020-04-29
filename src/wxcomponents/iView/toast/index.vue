<template>
<uni-shadow-root class="iView-toast-index"><view class="i-toast-mask" v-if="visible && mask" @click="handleHide"></view>
<view class="i-class i-toast" v-if="visible">
    <block v-if="type !== 'default'">
        <view class="i-toast-type">
            <i-icon i-class="i-toast-icon" type="success" v-if="type === 'success'"></i-icon>
            <i-icon i-class="i-toast-icon" type="prompt" v-else-if="type === 'warning'"></i-icon>
            <i-icon i-class="i-toast-icon" type="delete" v-else-if="type === 'error'"></i-icon>
            <view class="i-toast-icon i-toast-loading" v-else-if="type === 'loading'"></view>
        </view>
    </block>
    <block v-else>
        <i-icon i-class="i-toast-icon" :type="icon" v-if="icon"></i-icon>
        <image class="i-toast-image" :src="image" v-if="image" mode="aspectFit"></image>
    </block>
    <view class="i-toast-content" v-if="content">{{ content }}</view>
</view></uni-shadow-root>
</template>

<script>
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-icon': IIcon}}

global['__wxRoute'] = 'iView/toast/index'
const default_data = {
    visible: false,
    content: '',
    icon: '',
    image: '',
    duration: 2,
    mask: true,
    type: 'default', // default || success || warning || error || loading
};

let timmer = null;

Component({
    externalClasses: ['i-class'],

    data: {
        ...default_data
    },

    methods: {
        handleShow (options) {
            const { type = 'default', duration = 2 } = options;

            this.setData({
                ...options,
                type,
                duration,
                visible: true
            });

            const d = this.data.duration * 1000;

            if (timmer) clearTimeout(timmer);
            if (d !== 0) {
                timmer = setTimeout(() => {
                    this.handleHide();
                    timmer = null;
                }, d);
            }
        },

        handleHide () {
            this.setData({
                ...default_data
            });
        }
    }
});
export default global['__wxComponents']['iView/toast/index']
</script>
<style platform="mp-weixin">
.i-toast{position:fixed;top:35%;left:50%;transform:translate3d(-50%,-50%,0);background:rgba(0,0,0,.7);color:#fff;font-size:14px;line-height:1.5em;margin:0 auto;box-sizing:border-box;padding:10px 18px;text-align:center;border-radius:4px;z-index:1010}.i-toast-mask{position:fixed;top:0;bottom:0;left:0;right:0;z-index:1010}.i-toast-icon{font-size:38px!important;margin-bottom:6px}.i-toast-image{max-width:100px;max-height:100px}.i-toast-loading{display:inline-block;vertical-align:middle;width:28px;height:28px;background:0 0;border-radius:50%;border:2px solid #fff;border-color:#fff #fff #fff #2d8cf0;animation:btn-spin .8s linear;animation-iteration-count:infinite}@keyframes btn-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
</style>