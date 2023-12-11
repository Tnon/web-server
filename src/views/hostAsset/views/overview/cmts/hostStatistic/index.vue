<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-13 10:50:21
 * @LastEditTime: 2023-07-04 10:22:15
-->
<template>
  <div class="assetoverview">
    <div class="header">{{ t('asset.hoststic') }} </div>
    <div class="nodeContainer">
      <template v-for="{ title, key, color, query } in assetState" :key="title">
        <div class="node" @click="jumpHostPage(query ? query : undefined)">
          <!-- 左侧标志及label start -->
          <div class="label">
            <a-badge
              status="processing"
              :color="color"
              v-if="key === 'online_count' || key === 'offline_count'"
            />
            <span>{{ title }}</span>
          </div>
          <!-- 左侧标志及label end -->

          <!-- 右侧value start -->
          <div class="value" :style="{ color }">
            <!-- {{ countState[key] }} -->
            <countTo :endVal="countState[key]" />
          </div>
          <!-- 右侧value start -->
        </div>
        <div class="line" v-if="key === 'total' || key === 'uninstalled_count'"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { getHostStatistic } from '@/api/asset/overview';
  import { getAssetState, assetNode } from './index';

  const { t } = useI18n();
  const router = useRouter();
  const countState = reactive({
    total: 0,
    online_count: 0,
    offline_count: 0,
    uninstalled_count: 0,
    healthy_count: 0,
    vul_count: 0,
    risk_count: 0,
    alarm_count: 0,
    event_count: 0,
  });

  const assetState: assetNode[] = getAssetState(t);

  // 点击跳转到主机页面并筛选
  const jumpHostPage = (query?) => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host-index',
      query,
    });
  };
  // 获取主机统计数据
  const getStatisticData = async () => {
    const res = await getHostStatistic();
    Object.assign(countState, res);
  };
  getStatisticData();
</script>

<style scoped lang="less">
  .assetoverview {
    padding: 12px 16px 32px;
    margin-bottom: 16px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.02);
  }

  .header {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 16px;
  }
  .nodeContainer {
    display: flex;
    align-items: center;
    // justify-content: center;

    .node {
      flex: 1;
      text-align: center;
      margin: 0 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;

      .label {
        margin-bottom: 16px;
      }
    }
    .line {
      display: inline-block;
      width: 1px;
      background: #ddd;
      height: 60px;
      margin: 0 8px;
    }
  }
</style>
