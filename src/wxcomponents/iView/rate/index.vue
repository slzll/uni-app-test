<template>
<uni-shadow-root class="iView-rate-index"><view class="i-class i-rate" @touchmove="handleTouchMove">
    <input :name="name" type="text" :wx:value="value" class="i-rate-hide-input"></input>
    <view v-for="(item,index) in (count)" :key="item" :class="'i-rate-star '+(parse.getCurrent( value,index ))" :data-index="index" @click="handleClick">
        <i-icon type="collection_fill" :size="size"></i-icon>
    </view>
    <view class="i-rate-text" v-if="value !== 0"><slot></slot></view>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-icon': IIcon}}

global['__wxRoute'] = 'iView/rate/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        count : {
            type : Number,
            value : 5
        },
        value : {
            type : Number,
            value : 0
        },
        disabled : {
            type : Boolean,
            value : false
        },
        size : {
            type : Number,
            value : 20
        },
        name : {
            type : String,
            value : ''
        }
    },
    data : {
        touchesStart : {
            pageX : 0
        }
    },
    methods : {
        handleClick(e){
            const data = this.data;
            if( data.disabled ){
                return;
            }
            const index = e.currentTarget.dataset.index;
            this.triggerEvent('change',{
                index : index + 1
            })
        },
        handleTouchMove(e){
            const data = this.data;
            if( data.disabled ){
                return;
            }
            if( !e.changedTouches[0] ){
                return;
            }
            const movePageX =  e.changedTouches[0].pageX;
            const space = movePageX - data.touchesStart.pageX;

            if( space <= 0 ){
                return;
            }
            let setIndex = Math.ceil( space/data.size );
            setIndex = setIndex  > data.count ? data.count : setIndex ;
            this.triggerEvent('change',{
                index : setIndex 
            })
        }
    },
    ready(){
       const className = '.i-rate';
        var query = wx.createSelectorQuery().in(this)
        query.select( className ).boundingClientRect((res)=>{
            this.data.touchesStart.pageX = res.left || 0;
        }).exec()
    }
});
export default global['__wxComponents']['iView/rate/index']
</script>
<style platform="mp-weixin">
.i-rate{margin:0;padding:0;font-size:20px;display:inline-block;vertical-align:middle;font-weight:400;font-style:normal}.i-rate-hide-input{display:none}.i-rate-star{display:inline-block;color:#e9e9e9}.i-rate-current{color:#f5a623}.i-rate-text{display:inline-block;vertical-align:middle;margin-left:6px;font-size:14px}
</style>