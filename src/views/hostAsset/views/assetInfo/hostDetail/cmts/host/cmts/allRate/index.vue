<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-01-11 17:36:00
-->
<template>
  <div class="allRate">
    <div class="rate" v-for="(value, key) in types" :key="key" @click="showDetail(value, key)">
      <div class="node">
        <p>{{ value.rate }}</p>
        <h3>{{ rates[value.ratePercent] }}</h3>
      </div>
      <div class="node">
        <p>{{ value.size }}</p>
        <h3 v-if="key !== 'CPU'">{{ rates[value.num] }}</h3>
        <h3 v-else>{{ rates[value.num] }}</h3>
      </div>
      <RightOutlined class="ricon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { allRate } from './type';
  import { useModal } from '@/hooks';
  import resourceDetail from './cmts/resourceDetail';
  import { RightOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    rates: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const types: allRate = {
    CPU: {
      modalTitle: t('asset.cpuMonitorDetail'),
      rate: t('asset.cpuUtil'),
      ratePercent: 'cpu_util',
      size: t('asset.cpuCoNum'),
      num: 'cpu_cores',
    },
    memory: {
      modalTitle: t('asset.memoryMonitorDetail'),
      rate: t('asset.memUtil'),
      ratePercent: 'mem_util',
      size: t('setting.memSize'),
      num: 'mem_size',
    },
    disk: {
      modalTitle: t('asset.diskMonitorDetail'),
      rate: t('setting.hadUtil'),
      ratePercent: 'disk_util',
      size: t('setting.hadSize'),
      num: 'disk_size',
    },
  };

  const showDetail = (value, key) => {
    useModal(
      {
        title: 'usageInstanceKey',
        width: 1080,
        footer: false,
        contentProps: {
          rates: props.rates,
          recourceInfo: value,
          recourceType: key,
        },
        wrapClassName: 'noheadModal',
      },
      resourceDetail,
    );
  };
</script>

<style lang="less" scoped>
  .allRate {
    margin: 16px 0px;
    display: flex;
    justify-content: space-between;
    .rate {
      flex: 1;
      &:nth-child(2) {
        margin: 0 16px;
      }
    }
  }
  .rate {
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .node {
      flex: 1;
      p {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 5px;
      }
      h3 {
        font-size: @fz18;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .rateR {
      flex: 8;
    }
    .ricon {
      transition: all 0.3s;
      transform: translateX(0);
    }
    &:hover {
      .ricon {
        transform: translateX(5px);
      }
    }
  }
</style>
