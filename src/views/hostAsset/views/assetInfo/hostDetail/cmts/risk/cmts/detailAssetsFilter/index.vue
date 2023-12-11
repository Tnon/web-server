<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2023-06-20 16:52:03
-->
<template>
  <div class="container">
    <template v-for="(item, key) in filterTitle" :key="key">
      <div class="cardFilter" @click="toggleFilter(key)">
        <div class="line" :class="{ active: actived == key }"></div>
        <div class="content">
          <div class="value">{{ item }}</div>
          <div class="num">{{ filterValue[`${key}_count`] }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { HostDetailRiskStatic } from '@/api/asset/assetRisk/overview';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    actived: {
      type: String,
      required: true,
    },
    id: String,
  });
  const emit = defineEmits(['update:actived']);
  const { t } = useI18n();
  //筛选节点
  const filterTitle = {
    weakpwd: t('asset.accountRiskweakpwd'),
    appweakpwd: t('asset.accountRiskappweakpwd'),
    apprisk: t('asset.accountRiskapprisk'),
    sysrisk: t('asset.accountRisksysrisk'),
    accrisk: t('asset.accountRiskaccrisk'),
  };
  //节点值仓
  const filterValue = reactive({
    weakpwd_count: 0,
    appweakpwd_count: 0,
    apprisk_count: 0,
    sysrisk_count: 0,
    accrisk_count: 0,
  });
  //切换节点
  const toggleFilter = (key: string): void => {
    emit('update:actived', key);
  };
  const getStatic = async () => {
    const res = await HostDetailRiskStatic(props.id!);
    for (let k in filterValue) {
      filterValue[k] = res[k] || 0;
    }
  };
  getStatic();
</script>

<style lang="less" scoped>
  .container {
    margin: 16px 0px;
    display: flex;
    justify-content: flex-start;
    overflow: auto;
  }
  .cardFilter {
    padding: 10px;
    width: 128px;
    height: 64px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    margin-right: 10px;

    cursor: pointer;
  }
  .line {
    width: 6px;
    height: 20px;
    border-radius: 8px;
    margin-right: 8px;
    background: #f8f8f8;
  }
  .active {
    background: #18ba79;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -3px;
    .value {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 20px;
      word-break: keep-all;
    }
    .num {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
    }
  }
</style>
