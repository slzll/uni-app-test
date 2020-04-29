<template>
<uni-shadow-root class="iView-grid-icon-index"><view class="i-class i-grid-icon"><slot></slot></view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/grid-icon/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../grid-item/index': {
            type: 'parent'
        }
    },

});
export default global['__wxComponents']['iView/grid-icon/index']
</script>
<style platform="mp-weixin">
.i-grid-icon{display:block;width:28px;height:28px;margin:0 auto}.i-grid-icon image{width:100%;height:100%}
</style>