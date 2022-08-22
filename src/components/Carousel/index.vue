<template>
    <div class="swiper-container" ref="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            //立即监听：不管数据发没发生变化，上来就就立即监听一次
            immediate: true,
            handler(newValue,oldValue) {
                //nextTick:在下次DOM更新,循环结束之后,执行延迟回调,在修改数据之后立即使用这个办法,获取更新后的DOM
                this.$nextTick(() => {
                    var mySwiper = new Swiper (
                        this.$refs.floor1Swiper,
                        {
                            loop: true, // 循环模式选项
                            
                            // 如果需要分页器
                            pagination: {
                            el: '.swiper-pagination',
                            //点击小球的时候也切换图片
                            clickable: true,
                            },
                            
                            // 如果需要前进后退按钮
                            navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            },
                        }
                    )
                })
            }
        }
    }
}
</script>

<style>

</style>