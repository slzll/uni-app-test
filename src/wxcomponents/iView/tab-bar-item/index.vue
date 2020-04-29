<template>
<uni-shadow-root class="iView-tab-bar-item-index"><view class="i-class i-tab-bar-item">
    <i-badge :dot="dot" :count="dot ? 0 : count">
        <view>
            <i-icon v-if="icon || currentIcon" :i-class="'i-tab-bar-item-icon '+(current ? 'item-index--i-tab-bar-item-icon-current' : '')" :color="current ? currentColor : ''" :type="current ? currentIcon : icon" size="22"></i-icon>
            <image v-else class="i-tab-bar-item-img" :src="current ? currentImg : img"></image>
            <view :class="'i-tab-bar-item-title '+(current ? 'i-tab-bar-item-title-current' : '')" v-if="current && currentColor" :style="'color: '+(currentColor)">{{ title }}</view>
            <view :class="'i-tab-bar-item-title '+(current ? 'i-tab-bar-item-title-current' : '')" v-else>{{ title }}</view>
        </view>
    </i-badge>
</view></uni-shadow-root>
</template>

<script>
import IBadge from '../badge/index.vue'
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-badge': IBadge,'i-icon': IIcon}}

global['__wxRoute'] = 'iView/tab-bar-item/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../tab-bar/index': {
            type: 'parent'
        }
    },

    properties: {
        icon: {
            type: String,
            value: ''
        },
        currentIcon: {
            type: String,
            value: ''
        },
        img: {
            type: String,
            value: ''
        },
        currentImg: {
            type: String,
            value: ''
        },
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
        currentColor: ''
    },

    methods: {
        changeCurrent (current) {
            this.setData({ current });
        },
        changeCurrentColor (currentColor) {
            this.setData({ currentColor });
        },
        handleClickItem () {
            const parent = this.getRelationNodes('../tab-bar/index')[0];
            parent.emitEvent(this.data.key);
        }
    }
});
export default global['__wxComponents']['iView/tab-bar-item/index']
</script>
<style platform="mp-weixin">
.i-tab-bar-item{flex:1;display:flex;width:100%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;text-align:center}.i-tab-bar-item-icon{display:flex;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;color:#80848f}.i-tab-bar-item-icon-current{color:#2d8cf0}.i-tab-bar-item-img{display:flex;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;width:22px;height:22px}.i-tab-bar-item-title{font-size:10px;margin:3px 0 0;line-height:1;text-align:center;box-sizing:border-box;color:#80848f}.i-tab-bar-item-title-current{color:#2d8cf0}.i-tab-bar-item-img{display:flex;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;color:#80848f}
</style>