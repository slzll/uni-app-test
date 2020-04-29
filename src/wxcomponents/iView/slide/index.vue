<template>
<uni-shadow-root class="iView-slide-index"><view class="i-class i-slide" @touchstart.stop.prevent.capture="handleTap2" @touchmove.stop.prevent.capture="handleTap3">
    1111
    
</view></uni-shadow-root>
</template>

<script>
import IButton from '../button/index.vue'
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-button': IButton,'i-icon': IIcon}}

global['__wxRoute'] = 'iView/slide/index'
Component({
    externalClasses: ['i-class'],
    options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
    },
    methods : {
        handleTap2(){
            console.log(event,1111111)
        },
        handleTap3(){
            
        }
    }
});
export default global['__wxComponents']['iView/slide/index']
</script>
<style platform="mp-weixin">

</style>