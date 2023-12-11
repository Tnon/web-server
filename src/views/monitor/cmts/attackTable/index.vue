<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-09 10:55:20
 * @LastEditTime: 2023-11-09 17:38:11
-->
<template>
  <div class="attackTable">
    <div class="title">
      <span>{{ t('overview.zasdkfg') }}</span>
    </div>
    <div class="tableHead">
      <div class="th">{{ t('arcomn.disTime') }}</div>
      <div class="th">{{ t('overview.asdg') }}</div>
      <div class="th">{{ t('overview.hos') }}</div>
    </div>
    <swiper
      :slides-per-view="15"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      :speed="400"
      :direction="'vertical'"
      :loop="true"
      :modules="[Autoplay]"
      class="tableBody"
    >
      <template v-for="item in data" :key="item.id">
        <swiper-slide>
          <div class="swiper_node">
            <div class="td">{{ item.dis_time }}</div>
            <div
              class="td level"
              :class="[item.level === 1 ? 'high' : item.level === 2 ? 'mid' : 'low']"
            >
              {{
                item.level === 1
                  ? t('arcomn.highAttack')
                  : item.level === 2
                  ? t('arcomn.midAttack')
                  : t('arcomn.lowAttack')
              }}
              | {{ item.name }}
            </div>
            <div class="td">{{ item.ip }}</div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { Autoplay } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/less';
  import { ref } from 'vue';
  const { t } = useI18n();
  const data = ref([
    {
      dis_time: '2023-20-24 24:23:24',
      level: 2,
      name: 'Webshell',
      ip: '244.255.255.255',
      id: 1,
    },
  ]);
  for (let i = 0; i < 50; i++) {
    data.value.push({
      dis_time: '2023-20-24 24:23:24',
      level: 1,
      name: 'XXX',
      ip: '234.244.22.1',
      id: i,
    });
  }
</script>

<style scoped lang="less">
  .attackTable {
    position: relative;
    z-index: 1;
    padding-left: 16px;
    width: 100%;
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      font-size: @fz14;
      font-weight: 600;
      line-height: 24px;
      padding-left: 10px;
      color: #ffffff;
      background-image: url(../../imgs/BoxTitle01.svg);
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .tableHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      .th {
        font-size: @fz12;
        font-weight: normal;
        line-height: 16px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .tableBody {
      width: 100%;
      height: 66.666vh;
      min-height: 720px;
      max-height: 37.499vw;
      .swiper_node {
        height: 4.444vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .td {
          font-family: D-DIN;
          font-size: @fz12;
          font-weight: normal;
          line-height: 16px;
          color: #ffffff;
        }
        .high {
          color: @danger-color;
        }
        .mid {
          color: #f8a556;
        }
        .error {
          color: #f6c84d;
        }
      }
    }
  }
</style>
