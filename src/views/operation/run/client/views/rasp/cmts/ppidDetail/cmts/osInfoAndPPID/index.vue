<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-09-15 10:21:00
-->
<template>
  <div>
    <div class="osinfo">
      <custom-icon size="48" class="cusicon" :type="osLogo" />
      <div class="info">
        <div class="ip">{{ record!.ip }}</div>
        <div class="hostname">{{ record!.hostname }}</div>
      </div>
    </div>
    <div class="ppids">
      <template v-for="item in ppids" :key="item">
        <div class="nodes">
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { osLogoType } from '@/utils/tools';
  import { ref, unref } from 'vue';
  import { getppids } from '@/api/operation/run';
  const props = defineProps({
    record: Object,
  });
  //图标
  const osLogo = ref('');
  osLogo.value = unref(osLogoType(props.record!.os, props.record!.online));

  //ppids
  const ppids = ref<number[]>([]);

  const getPPIDs = async () => {
    const { items } = await getppids({ id: props.record!.id });
    ppids.value = items;
  };
  getPPIDs();
</script>

<style scoped lang="less">
  .osinfo {
    margin: 0 16px;
    padding: 12px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    margin-bottom: 16px;
    .cusicon {
      margin-right: 16px;
    }
    .info {
      .ip {
        font-size: @fz14;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
      }
      .hostname {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
        line-height: 16px;
      }
    }
  }
  .ppids {
    padding: 0 16px 16px 16px;
    .nodes {
      background: rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      font-size: @fz14;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      padding: 4px 8px;
      margin: 0 8px 8px 0;
      display: inline-block;
    }
  }
</style>
