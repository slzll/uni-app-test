<template>
<uni-shadow-root class="iView-row-index"><view class="i-class i-row"><slot></slot></view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/row/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../col/index': {
            type: 'child'
        }
    }
});
export default global['__wxComponents']['iView/row/index']
</script>
<style platform="mp-weixin">
.i-row:after{content:"";display:table;clear:both}
</style>