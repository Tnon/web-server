<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-01-12 17:56:50
-->
<template>
  <div class="content">
    <!-- 头部区域 start -->
    <detail-header :id="id + ''" @refreshContent="refresh" />
    <!-- 头部区域  end -->

    <!-- 内容区域 start -->
    <router-view v-slot="{ Component }" v-if="toogleShow">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="Component" :id="id" :ip="ip" />
      </transition>
    </router-view>
    <!-- 内容区域 end -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import detailHeader from './cmts/head';
  import { useRoute } from 'vue-router';
  // 跳转携带参数
  const {
    query: { id, ip },
  } = useRoute();
  const toogleShow = ref<boolean>(true);
  const refresh = () => {
    toogleShow.value = false;
    nextTick(() => {
      toogleShow.value = true;
    });
  };
</script>
<style lang="less" scoped>
  .content {
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
  }
</style>
