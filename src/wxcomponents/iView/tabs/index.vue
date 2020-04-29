<template>
<uni-shadow-root class="iView-tabs-index"><scroll-view v-if="scroll" scroll-x="true" :class="'i-class i-tabs i-tabs-scroll '+(fixed ? 'i-tabs-fixed' : '')"><slot></slot></scroll-view>
<view v-else :class="'i-class i-tabs '+(fixed ? 'i-tabs-fixed' : '')"><slot></slot></view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/tabs/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../tab/index': {
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
        scroll: {
            type: Boolean,
            value: false
        },
        fixed: {
            type: Boolean,
            value: false
        }
    },

    methods: {
        changeCurrent (val = this.data.current) {
            let items = this.getRelationNodes('../tab/index');
            const len = items.length;

            if (len > 0) {
                items.forEach(item => {
                    item.changeScroll(this.data.scroll);
                    item.changeCurrent(item.data.key === val);
                    item.changeCurrentColor(this.data.color);
                });
            }
        },
        emitEvent (key) {
            this.triggerEvent('change', { key });
        }
    }
});
export default global['__wxComponents']['iView/tabs/index']
</script>
<style platform="mp-weixin">
.i-tabs{display:flex;width:100%;height:42px;line-height:42px;box-sizing:border-box;position:relative;justify-content:space-around;align-items:center;-webkit-box-align:center;background:#fff}.i-tabs::after{content:'';position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0;pointer-events:none;box-sizing:border-box;border:0 solid #e9eaec;border-bottom-width:1px}.i-tabs-scroll{display:block;overflow-x:auto;white-space:nowrap}.i-tabs-fixed{position:fixed;top:0;z-index:2}
</style>