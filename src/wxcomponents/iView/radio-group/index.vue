<template>
<uni-shadow-root class="iView-radio-group-index"><i-cell-group class="i-class">
    <slot></slot>
</i-cell-group></uni-shadow-root>
</template>

<script>
import ICellGroup from '../cell-group/index.vue'
global['__wxVueOptions'] = {components:{'i-cell-group': ICellGroup}}

global['__wxRoute'] = 'iView/radio-group/index'
Component({
    externalClasses: ['i-class'],
    relations: {
        '../radio/index': {
            type: 'child',
            linked() {
                this.changeCurrent();
            },
            linkChanged() {
                this.changeCurrent();
            },
            unlinked() {
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
    },
    methods: {
        changeCurrent(val = this.data.current) {
            let items = this.getRelationNodes('../radio/index');
            const len = items.length;
            if (len > 0) {
                items.forEach(item => {
                    item.changeCurrent(val === item.data.value);
                });
            }
        },
        emitEvent(current) {
            this.triggerEvent('change', current);
        }
    }
});
export default global['__wxComponents']['iView/radio-group/index']
</script>
<style platform="mp-weixin">

</style>