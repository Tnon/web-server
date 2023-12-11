<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-08 22:46:34
 * @LastEditTime: 2023-06-09 11:24:43
-->
<template>
  <div class="filter">
    <template v-for="(item, key) in state" :key="key">
      <div class="node" :class="{ actived: key === activedType }" @click="selectedCmp(key)">
        <div class="title">{{ item.title }}</div>
        <div class="num" :class="{ hiddenNum: item.hiddenNum }">
          <span v-if="item.num" class="error"> {{ t('operation.adaerr') }}{{ item.num }} </span>
          <span class="normal" v-else>
            {{ t('operation.deteNor') }}
          </span>
        </div>
        <div class="flag" v-if="key === 'rasp'">
          {{ t('operation.component') }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { reactive, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { CmtTypes } from '../../type';
  import { getRunStaticNum } from '@/api/operation/run';
  defineProps({
    activedType: String as PropType<CmtTypes>,
  });
  const { t } = useI18n();
  const state = reactive<Record<CmtTypes, { title: string; num: number; hiddenNum?: boolean }>>({
    agent: {
      title: t('operation.agt'),
      num: 0,
    },
    rasp: {
      title: 'RASP',
      num: 0,
    },
    cloudDetection: {
      title: t('operation.cloudDetection'),
      num: 0,
      hiddenNum: true,
    },
  });
  const emit = defineEmits(['update:activedType']);
  const selectedCmp = (key) => {
    emit('update:activedType', key);
    getDetailNum();
  };
  //获取数量
  const getDetailNum = async () => {
    //屏蔽windows
    //win_driver_count
    const { agent_count, rasp_count } = await getRunStaticNum();
    state.agent.num = agent_count;
    // state.driverLinux.num = linux_driver_count;
    //屏蔽windows
    // state.driverWindows.num = win_driver_count;
    state.rasp.num = rasp_count;
    // state.collectionPoint.num = collection_point_count;
  };
  getDetailNum();
</script>

<style scoped lang="less">
  .filter {
    margin: 16px 0;
    .node {
      padding: 6px 16px 12px 16px;
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid rgba(0, 0, 0, 0.04);
      margin-right: 8px;
      position: relative;
      display: inline-block;
      // min-width: 128px;
      min-width: 168px;

      .flag {
        position: absolute;
        background: rgba(24, 186, 121, 0.9);
        border-radius: 0px 6px 0px 6px;
        padding: 0 4px;
        top: 0;
        right: 0;
        color: #fff;
      }
      .title {
        font-size: @fz14;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
        margin-bottom: 4px;
      }
      .normal {
        font-size: @fz12;
        font-weight: 400;
        color: @primary-color;
        line-height: 16px;
      }
      .hiddenNum {
        opacity: 0;
      }
      .error {
        font-size: @fz12;
        font-weight: 400;
        color: #f75555;
        line-height: 16px;
      }
    }
    .actived {
      background: rgba(0, 0, 0, 0.08);
    }
  }
</style>
