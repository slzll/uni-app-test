<template>
<uni-shadow-root class="iView-radio-index"><view class="i-class i-radio" @click.stop.prevent="radioChange">
    <i-cell i-class="i-radio-cell">
        <label>
            <radio :value="value" :checked="checked" :color="checked?color:''" :disabled="disabled" :class="'i-radio-radio '+(positionCls)"></radio>
            <view class="i-radio-title">{{value}}</view>
        </label>
    </i-cell>
</view></uni-shadow-root>
</template>

<script>
import ICell from '../cell/index.vue'
global['__wxVueOptions'] = {components:{'i-cell': ICell}}

global['__wxRoute'] = 'iView/radio/index'
const prefixCls = 'i-radio';

Component({
    externalClasses: ['i-class'],
    relations: {
        '../radio-group/index': {
            type: 'parent'
        }
    },
    properties: {
        value: {
            type: String,
            value: ''
        },
        checked: {
            type: Boolean,
            value: false
        },
        disabled: {
            type: Boolean,
            value: false
        },
        color: {
            type: String,
            value: '#2d8cf0'
        },
        position: {
            type: String,
            value: 'left', //left right
            observer: 'setPosition'
        }
    },
    data: {
        checked: true,
        positionCls: `${prefixCls}-radio-left`,
    },
    attached() {
        this.setPosition();
    },
    methods: {
        changeCurrent(current) {
            this.setData({ checked: current });
        },
        radioChange() {
            if (this.data.disabled) return;
            const item = { current: !this.data.checked, value: this.data.value };
            const parent = this.getRelationNodes('../radio-group/index')[0];
            parent ? parent.emitEvent(item) : this.triggerEvent('change', item);
        },
        setPosition() {
            this.setData({
                positionCls: this.data.position.indexOf('left') !== -1 ? `${prefixCls}-radio-left` : `${prefixCls}-radio-right`,
            });
        }
    }
});
export default global['__wxComponents']['iView/radio/index']
</script>
<style platform="mp-weixin">
.i-radio-cell::after{display:block}.i-radio-radio-left{float:left}.i-radio-radio-right{float:right}.i-radio-radio{vertical-align:middle}.i-radio-title{display:inline-block;vertical-align:middle}
</style>