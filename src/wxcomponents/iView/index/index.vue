<template>
<uni-shadow-root class="iView-index-index"><view class="i-index i-class">
    <scroll-view scroll-y :style="parse.setScrollStyle(height)" @scroll="handlerScroll" :scroll-top="scrollTop">
        <slot></slot>  
        <view class="i-index-fixed" @touchstart.stop.prevent="handlerTouchMove" @touchmove.stop.prevent="handlerTouchMove" @touchend.stop.prevent="handlerTouchEnd">
            <view v-for="(item,index) in (fixedData)" :key="item.index" class="i-index-fixed-item" :data-index="index" @click.stop.prevent="handlerFixedTap">
                {{item}}
            </view>
        </view>  
        <view class="i-index-tooltip" :style="isTouches ? 'display:block' : 'display:none'">{{currentName}}</view>
    </scroll-view>
</view></uni-shadow-root>
</template>
<wxs module="parse" src="./index-parse.wxs"></wxs>
<script>

global['__wxRoute'] = 'iView/index/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        height : {
            type : String,
            value : '300'
        },
        itemHeight : {
            type : Number,
            value : 18
        }
    },
    relations : {
        '../index-item/index' : {
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
    data : {
        scrollTop : 0,
        fixedData : [],
        current : 0,
        timer : null,
        startTop : 0,
        itemLength : 0,
        currentName : '',
        isTouches : false
    },
    methods : {
        loop(){},
        _updateDataChange( ){
            const indexItems = this.getRelationNodes('../index-item/index');
            const len = indexItems.length;
            const fixedData = this.data.fixedData;
            /*
             * 使用函数节流限制重复去设置数组内容进而限制多次重复渲染
             * 暂时没有研究微信在渲染的时候是否会进行函数节流
            */
            if (len > 0) {

                if( this.data.timer ){
                    clearTimeout( this.data.timer )
                    this.setData({
                        timer : null
                    })
                }
                
                this.data.timer = setTimeout(()=>{
                    const data = [];
                    indexItems.forEach((item) => {
                        if( item.data.name && fixedData.indexOf( item.data.name ) === -1 ){
                            data.push(item.data.name);
                            item.updateDataChange();
                        }
                    })
                    this.setData({
                        fixedData : data,
                        itemLength : indexItems.length
                    })
                    //组件加载完成之后重新设置顶部高度
                    this.setTouchStartVal();
                },0);
                this.setData({
                    timer : this.data.timer
                })
                
            }
        },
        handlerScroll(event){
            const detail = event.detail;
            const scrollTop = detail.scrollTop;
            const indexItems = this.getRelationNodes('../index-item/index');
            indexItems.forEach((item,index)=>{
                let data = item.data;
                let offset = data.top + data.height;
                if( scrollTop < offset && scrollTop >= data.top ){
                    this.setData({
                        current : index,
                        currentName : data.currentName
                    })
                }
            })
        },
        getCurrentItem(index){
            const indexItems = this.getRelationNodes('../index-item/index');
            let result = {};
            result = indexItems[index].data;
            result.total = indexItems.length;
            return result;
        },
        triggerCallback(options){
            this.triggerEvent('change',options)
        },
        handlerFixedTap(event){
            const eindex = event.currentTarget.dataset.index;
            const item = this.getCurrentItem(eindex);
            this.setData({
                scrollTop : item.top,
                currentName : item.currentName,
                isTouches : true
            })
            this.triggerCallback({
                index : eindex,
                current : item.currentName
            })
        },
        handlerTouchMove(event){
            const data = this.data;
            const touches = event.touches[0] || {};
            const pageY = touches.pageY;
            const rest = pageY - data.startTop;
            let index = Math.ceil( rest/data.itemHeight );
            index = index >= data.itemLength ? data.itemLength -1 : index;
            const movePosition = this.getCurrentItem(index);

           /*
            * 当touch选中的元素和当前currentName不相等的时候才震动一下
            * 微信震动事件
           */
            if( movePosition.name !== this.data.currentName ){
                wx.vibrateShort();
            }

            this.setData({
                scrollTop : movePosition.top,
                currentName : movePosition.name,
                isTouches : true
            })

            this.triggerCallback({
                index : index,
                current : movePosition.name
            })
        },
        handlerTouchEnd(){
            this.setData({
                isTouches : false
            })
        },
        setTouchStartVal(){
            const className = '.i-index-fixed';
            const query = wx.createSelectorQuery().in(this);
            query.select( className ).boundingClientRect((res)=>{
                this.setData({
                    startTop : res.top
                })
            }).exec()
        }
    }
})
export default global['__wxComponents']['iView/index/index']
</script>
<style platform="mp-weixin">
.i-index{width:100%;height:100%}.i-index-line{position:absolute;left:0;width:100%;height:1rpx;background-color:#f7f7f7;top:50%}.i-index-content{background:#fff;position:relative;z-index:1;display:inline-block;padding:0 10px}.i-index-fixed{position:fixed;right:0;top:50%;z-index:10;padding-left:10px;transform:translateY(-50%)}.i-index-fixed-item{display:block;height:18px;line-height:18px;padding:0 5px;text-align:center;color:#2d8cf0;font-size:12px;border-radius:50%}.i-index-fixed-item-current{background:#2d8cf0;color:#fff}.i-index-tooltip{position:fixed;left:50%;top:50%;transform:translate3d(-50%,-50%,0);background:rgba(0,0,0,.7);color:#fff;font-size:24px;border-radius:50%;width:80px;height:80px;line-height:80px;text-align:center}
</style>