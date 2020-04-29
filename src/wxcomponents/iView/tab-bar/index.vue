<template>
<uni-shadow-root class="iView-tab-bar-index"><view :class="'i-class i-tab-bar '+(fixed ? 'i-tab-bar-fixed' : '')">
    <slot></slot>
    <view class="i-tab-bar-list">
        <view v-for="(item,index) in (list)" :key="item.key" class="i-tab-bar-layer" :data-key="item.key" @click="handleClickItem" :style="'width: '+(100 / list.length)+'%'"></view>
    </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/tab-bar/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../tab-bar-item/index': {
            type: 'child',
            linked () {
                this.changeCurrent();
            },
            linkChanged () {
                this.changeCurrent();
            },
            unlinked () {
                this.changeCurrent();
            }
        }
    },

    properties: {
        current: {
            type: String,
            value: '',
            observer: 'changeCurrent'
        },
        color: {
            type: String,
            value: ''
        },
        fixed: {
            type: Boolean,
            value: false
        }
    },

    data: {
        list: []
    },

    methods: {
        changeCurrent (val = this.data.current) {
            let items = this.getRelationNodes('../tab-bar-item/index');
            const len = items.length;

            if (len > 0) {
                const list = [];
                items.forEach(item => {
                    item.changeCurrent(item.data.key === val);
                    item.changeCurrentColor(this.data.color);
                    list.push({
                        key: item.data.key
                    });
                });
                this.setData({
                    list: list
                });
            }
        },
        emitEvent (key) {
            this.triggerEvent('change', { key });
        },
        handleClickItem (e) {
            const key = e.currentTarget.dataset.key;
            this.emitEvent(key);
        }
    }
});
export default global['__wxComponents']['iView/tab-bar/index']
</script>
<style platform="mp-weixin">
.i-tab-bar{display:flex;width:100%;height:50px;box-sizing:border-box;position:relative;justify-content:space-around;align-items:center;-webkit-box-align:center;background:#fff}.i-tab-bar::after{content:'';position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0;pointer-events:none;box-sizing:border-box;border:0 solid #e9eaec;border-top-width:1px}.i-tab-bar-fixed{position:fixed;bottom:0;z-index:2}.i-tab-bar-list{position:absolute;top:0;bottom:0;left:0;right:0}.i-tab-bar-layer{display:block;float:left;height:100%}
</style>