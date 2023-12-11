<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2023-10-12 11:15:02
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <div class="header">
      <template v-for="{ title, icon, type } in tabTypes" :key="title">
        <span
          v-if="acdr_enabled || type !== UPCLIPKGTYPE.ACDR"
          class="node"
          @click="selectEngineType(type)"
          :class="{ actived: filter.type === type }"
        >
          <custom-icon class="sicon" :type="icon" />
          {{ t(title) }}
        </span>
      </template>
    </div>
    <!-- 头部 end -->
    <!-- 哈希引擎 or 预检测基线库 start -->
    <transition name="zoom-fade" mode="out-in" appear>
      <commonEngine ref="dymicRef" :filter="filter" />
    </transition>
    <!-- 哈希引擎 or 预检测基线库 end -->
  </div>
</template>

<script setup lang="ts">
  import { ref, unref, reactive, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { tabTypes } from '.';
  import commonEngine from './views';
  import { EngineFilter } from '@/api/operation/model';
  import { UPCLIPKGTYPE } from '@/enums/assetsType';
  import { useProductLogo } from '@/store/modules/product-logo';
  const { t } = useI18n();
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  //客户端引擎库
  const filter = reactive<Partial<EngineFilter>>({
    engine_upgrade_status: undefined,
    engine_version: undefined,
    // type: UPCLIPKGTYPE.HASH,
    type: unref(acdr_enabled) ? UPCLIPKGTYPE.ACDR : UPCLIPKGTYPE.HASH, // 默认ACDR引擎
  });
  //显示的type
  const selectEngineType = (type) => {
    filter.type = type;
  };
  //动态ref
  const dymicRef = ref<any>(null);
  //升级完后 刷新数据
  const refreshData = (boolean) => {
    unref(dymicRef).refreshData(boolean);
  };
  //将刷新的方法传出去
  defineExpose({ refreshData });
</script>

<style scoped lang="less">
  .container {
    height: calc(100vh - 137px);
  }
  .header {
    font-size: @fz14;
    padding: 16px 0;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    line-height: 32px;
    display: flex;
    align-items: center;
    .node {
      display: flex;
      align-items: center;
      margin-right: 16px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 8px;
      .sicon {
        font-size: @fz24 !important;
        margin-right: 4px;
      }
    }
    .actived {
      background-color: #eee;
    }
  }
</style>
