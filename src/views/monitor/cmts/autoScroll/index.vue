<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-06 16:49:56
 * @LastEditTime: 2023-11-09 15:42:44
-->
<template>
  <swiper
    :slides-per-view="5"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    :speed="400"
    :direction="'vertical'"
    :loop="true"
    :modules="[Autoplay]"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="swiperContaier"
  >
    <template v-for="item in data" :key="item.id">
      <swiper-slide>
        <div class="swiper_node">
          <div class="label">{{ item.label }}</div>
          <a-statistic class="count" :valueStyle="{ color: item.color }" :value="item.count" />
        </div>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script setup lang="ts">
  import { Autoplay } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/less';
  import { I_Data_Node } from './type';
  const props = defineProps<{
    data: I_Data_Node[];
    selectedId: number;
  }>();
  const emit = defineEmits(['update:selectedId']);
  const onSwiper = (swiper) => {
    console.log(swiper);
  };
  const onSlideChange = (a) => {
    emit('update:selectedId', props.data[(a.realIndex + 2) % props.data.length].id);
  };
</script>

<style scoped lang="less">
  .swiperContaier {
    min-width: 200px;
    min-height: 180px;
    width: 10.416vw;
    height: 16.666vh;
    max-width: 18.517vh;
    max-height: 9.374vw;
    margin-left: 0px;
    .swiper_node {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      .label {
        font-size: @fz13;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.8);
        transition: all 0.3s;
      }
      .count {
        line-height: 24px;
        :deep(.ant-statistic-content-value) {
          font-family: D-DIN;
          font-size: @fz14;
          font-weight: 600;
          line-height: 24px;
          transition: all 0.3s;
        }
      }
    }
    .swiper-slide-next + .swiper-slide {
      .label {
        font-size: @fz14;
        color: #fff;
      }
      .count {
        :deep(.ant-statistic-content-value) {
          font-size: @fz20;
        }
      }
    }
  }
</style>
