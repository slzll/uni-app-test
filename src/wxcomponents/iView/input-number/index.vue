<template>
<uni-shadow-root class="iView-input-number-index"><view :class="'i-class i-input-number i-input-number-size-'+(size)">
    <view :class="'i-input-number-minus '+(value <= min ? 'i-input-number-disabled' : '')" :data-disabled="value <= min" @click="handleMinus">-</view>
    <input :class="'i-input-number-text '+(min >= max ? 'i-input-number-disabled' : '')" type="number" :value="value" :disabled="min >= max" @blur="handleBlur"></input>
    <view :class="'i-input-number-plus '+(value >= max ? 'i-input-number-disabled' : '')" :data-disabled="value >= max" @click="handlePlus">+</view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/input-number/index'
function addNum (num1, num2) {
    let sq1, sq2, m;
    try {
        sq1 = num1.toString().split('.')[1].length;
    }
    catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = num2.toString().split('.')[1].length;
    }
    catch (e) {
        sq2 = 0;
    }
    m = Math.pow(10, Math.max(sq1, sq2));
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
}

Component({
    externalClasses: ['i-class'],

    properties: {
        // small || default || large
        size: String,
        value: {
            type: Number,
            value: 1
        },
        min: {
            type: Number,
            value: -Infinity
        },
        max: {
            type: Number,
            value: Infinity
        },
        step: {
            type: Number,
            value: 1
        }
    },
    

    methods: {
        handleChangeStep(e, type) {
            const { dataset = {} } = e.currentTarget;
            const { disabled } = dataset;
            const { step } = this.data;
            let { value } = this.data;

            if (disabled) return null;

            if (type === 'minus') {
                value = addNum(value, -step);
            } else if (type === 'plus') {
                value = addNum(value, step);
            }

            if (value < this.data.min || value > this.data.max) return null;

            this.handleEmit(value, type);
        },

        handleMinus(e) {
            this.handleChangeStep(e, 'minus');
        },

        handlePlus(e) {
            this.handleChangeStep(e, 'plus');
        },

        handleBlur(e) {
            let { value } = e.detail;
            const { min, max } = this.data;

            if (!value) {
                setTimeout(() => {
                    this.handleEmit(value);
                }, 16);
                return;
            }

            value = +value;
            if (value > max) {
                value = max;
            } else if (value < min) {
                value = min;
            }

            this.handleEmit(value);
        },
        handleEmit (value, type) {
            const data = {
                value: value
            };
            if (type) data.type = type;

            this.triggerEvent('change', data);
        }
    }
});
export default global['__wxComponents']['iView/input-number/index']
</script>
<style platform="mp-weixin">
.i-input-number{color:#495060}.i-input-number view{display:inline-block;line-height:20px;padding:5px 0;text-align:center;min-width:40px;box-sizing:border-box;vertical-align:middle;font-size:12px;border:1rpx solid #dddee1}.i-input-number-minus{border-right:none;border-radius:2px 0 0 2px}.i-input-number-plus{border-left:none;border-radius:0 2px 2px 0}.i-input-number-text{border:1rpx solid #dddee1;display:inline-block;text-align:center;vertical-align:middle;height:30px;width:40px;min-height:auto;font-size:12px;line-height:30px}.i-input-number-disabled{border-color:#dddee1;color:#bbbec4;background:#f7f7f7}
</style>