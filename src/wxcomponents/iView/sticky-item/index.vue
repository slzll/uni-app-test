<template>
<uni-shadow-root class="iView-sticky-item-index"><view class="i-sticky-item">
    <view :class="'i-sticky-item-header i-class '+(isFixed === true ? 'i-sticky-fixed' : '')">
        <view class="i-sticky-title">
            <slot name="title"></slot>
        </view>
    </view>
    <view class="i-index-item-content">
        <slot name="content"></slot>
    </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'iView/sticky-item/index'
Component({
    externalClasses: ['i-class'],
    options: {
        multipleSlots: true
    },
    relations : {
        '../sticky/index' : {
            type : 'parent'
        }
    },
    data : {
        top : 0,
        height : 0,
        isFixed : false,
        index : -1,
    },
    methods: {
        updateScrollTopChange(scrollTop){
            const data = this.data;
            const top = data.top;
            const height = data.height;
            this.setData({
                isFixed : ( scrollTop >= top && scrollTop < top + height ) ? true : false
            })
        },
        updateDataChange(index) {
            const className = '.i-sticky-item';
            const query = wx.createSelectorQuery().in(this);
            query.select( className ).boundingClientRect((res)=>{
                    if( res ){
                        this.setData({
                            top : res.top,
                            height : res.height,
                            index : index
                        })
                    }
            }).exec()
        }
    }
})
export default global['__wxComponents']['iView/sticky-item/index']
</script>
<style platform="mp-weixin">
.i-sticky-item-header{background:#eee;font-size:14px;width:100%;height:32px;line-height:32px}.i-sticky-item-content{font-size:14px}.i-sticky-title{width:100%;padding:0 15px;box-sizing:border-box;background:#eee}.i-sticky-fixed .i-sticky-title{position:fixed;top:0}
</style>