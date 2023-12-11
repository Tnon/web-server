<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-29 15:49:15
 * @LastEditTime: 2023-03-22 19:58:58
-->
<template>
  <div class="assetoverview">
    <!-- <div class="header">{{ t('asset.astovew') }} </div> -->
    <template v-for="(item, key) in assetState" :key="key">
      <div :class="key">
        <div class="header">
          {{
            key === 'vul'
              ? t('asset.assetRisk')
              : key === 'asset'
              ? t('asset.assetInfo')
              : t('asset.accountRisk')
          }}
        </div>
        <div>
          <template v-for="(node, itemKey) in item" :key="node.title">
            <icon-node v-bind="node" :itemKey="itemKey" />
          </template>
        </div>
      </div>
      <div class="line" v-if="key !== 'asset'">{{}}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import iconNode from './cmts/iconNode';
  import { useI18n } from 'vue-i18n';
  import { getAssetOverview } from '@/api/asset/overview';
  import { StaticType } from './type';
  import { getAssetState } from './index';

  const { t } = useI18n();
  const assetState = reactive<StaticType>(getAssetState(t));
  // 获取对应数据
  const getData = async () => {
    const { statistic } = await getAssetOverview();
    if (statistic && Object.keys(statistic).length !== 0) {
      // for (let outKey in assetState) {
      //   for (let inKey in assetState[outKey]) {
      //     assetState[outKey][inKey].number = statistic[outKey][inKey];
      //   }
      // }
      for (let k in assetState.asset) {
        assetState.asset[k].number = statistic.asset[k] ?? 0;
      }
      // for (let k in statistic.risk) {
      //   assetState.asset[k].number = statistic.asset[k];
      // }
      for (let k in assetState.vul) {
        assetState.vul[k].number = statistic.risk[k] ?? 0;
      }
      for (let k in assetState.risk) {
        assetState.risk[k].number = statistic.risk[k] ?? 0;
      }
    }
  };
  getData();
</script>

<style scoped lang="less">
  .assetoverview {
    padding: 24px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.02);
    display: flex;
  }
  .header {
    /* 12 - Regular */
    font-size: @fz12;
    font-weight: normal;
    line-height: 16px;
    /* 文字/黑0.55 */
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 12px;
    padding-left: 12px;
  }
  .vul,
  .risk {
    flex: 1;
    .node {
      width: 100%;
    }
  }
  .vul {
    :deep(.iconP) {
      background: rgba(248, 165, 86, 0.1);
      .topicon {
        color: @warn-color;
      }
    }
    :deep(.number) {
      color: @warn-color;
    }
  }
  .risk {
    :deep(.iconP) {
      background: rgba(251, 126, 82, 0.1);
      .topicon {
        color: #fb7e52;
      }
    }
    :deep(.number) {
      color: #fb7e52;
    }
  }
  .asset {
    :deep(.iconP) {
      background: rgba(24, 186, 121, 0.1);

      .topicon {
        color: @primary-color;
      }
    }
    :deep(.number) {
      color: @primary-color;
    }
  }
  .asset {
    flex: 4;
    :deep(.node) {
      width: 25%;
    }
  }
  .line {
    width: 1px;
    background: rgba(0, 0, 0, 0.04);
    margin: 0 16px;
  }
</style>
