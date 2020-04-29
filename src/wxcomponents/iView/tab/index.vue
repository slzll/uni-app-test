<template>
<uni-shadow-root class="iView-tab-index"><view :class="'i-class i-tabs-tab '+(scroll ? 'i-tabs-tab-scroll' : '')+' '+(current ? 'i-tabs-tab-current' : '')">
    <i-badge :dot="dot" :count="dot ? 0 : count">
        <view @click="handleClickItem">
            <view :class="'i-tabs-tab-title '+(current ? 'i-tabs-tab-title-current' : '')" v-if="current && currentColor" :style="'color: '+(currentColor)">{{ title }}</view>
            <view :class="'i-tabs-tab-title '+(current ? 'i-tabs-tab-title-current' : '')" v-else>{{ title }}</view>
        </view>
    </i-badge>
    <view class="i-tabs-tab-bar" v-if="current" :style="'background: '+(currentColor)"></view>
</view></uni-shadow-root>
</template>

<script>
import IBadge from '../badge/index.vue'
global['__wxVueOptions'] = {components:{'i-badge': IBadge}}

global['__wxRoute'] = 'iView/tab/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../tabs/index': {
            type: 'parent'
        }
    },

    properties: {
        key: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        dot: {
            type: Boolean,
            value: false
        },
        count: {
            type: Number,
            value: 0
        }
    },

    data: {
        current: false,
        currentColor: '',
        scroll: false
    },

    methods: {
        changeCurrent (current) {
            this.setData({ current });
        },
        changeCurrentColor (currentColor) {
            this.setData({ currentColor });
        },
        changeScroll (scroll) {
            this.setData({ scroll });
        },
        handleClickItem () {
            const parent = this.getRelationNodes('../tabs/index')[0];
            parent.emitEvent(this.data.key);
        }
    }
});
export default global['__wxComponents']['iView/tab/index']
</script>
<style platform="mp-weixin">
.i-tabs-tab{flex:1;display:flex;width:100%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;text-align:center;position:relative}.i-tabs-tab-bar{display:block;width:100%;height:2px;background:0 0;position:absolute;bottom:0;left:0;background:#2d8cf0}.i-tabs-tab-title{font-size:14px;text-align:center;box-sizing:border-box;color:#80848f}.i-tabs-tab-title-current{color:#2d8cf0}.i-tabs-tab-scroll{display:inline-block;width:60px}
</style>