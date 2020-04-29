<template>
<uni-shadow-root class="iView-steps-index"><view class="i-class i-steps">
    <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/steps/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        current : {
            type : Number,
            value : -1,
            observer : '_updateDataChange'
        },
        status : {
            type : String,
            //wait、process、finish、error
            value : ''
        },
        direction : {
            type : String,
            //value has horizontal or vertical 
            value : 'horizontal'
        } 
    },
    relations : {
        '../step/index' : {
            type : 'child',
            linked(){
                this._updateDataChange();
            },
            linkChanged () {
                this._updateDataChange();
            },
            unlinked () {
                this._updateDataChange();
            }
        }
    },
    methods: {
        _updateDataChange() {
            let steps = this.getRelationNodes('../step/index');
            const len = steps.length;
            if (len > 0) {
                steps.forEach((step, index) => {
                    step.updateDataChange({
                        len : len,
                        index : index,
                        current : this.data.current,
                        direction : this.data.direction
                    });
                });
            }
        }
    }
})
export default global['__wxComponents']['iView/steps/index']
</script>
<style platform="mp-weixin">
.i-steps{width:100%}
</style>