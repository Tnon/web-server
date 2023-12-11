<template>
  <div class="monitor">
    <div class="filter">
      <!-- 告警监控 start -->
      <div class="leftOpt">
        <template v-for="item in types" :key="item.type">
          <span
            class="optype"
            :class="item.type === typeAll.LType ? 'actived' : ''"
            @click="SelectType(item.type, 'LType')"
          >
            {{ item.title }}
          </span>
        </template>
      </div>
      <!-- 告警监控 end -->

      <!-- 24小时/7天/30天 start -->
      <div class="rightOpt">
        <switch-nodes
          v-model:actived="typeAll.RType"
          size="small"
          :types="ranges"
          @update:actived="SelectType($event, 'RType')"
        />
      </div>
      <!-- 24小时/7天/30天 end -->
    </div>
    <!-- 告警类型分布和echarts start -->
    <disb-chart v-bind="typeAll" :refreshMethods="refreshMethods" />
    <!-- 告警类型分布和echarts end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Options, Nodes } from './type';
  import disbChart from './cmts/disbChart';
  import switchNodes from '@/components/switchNodes';
  import { useI18n } from 'vue-i18n';
  import { ROUND, NOTICETYPE } from '@/enums/attack_risk';
  defineProps({
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const typeAll = reactive<Options>({
    LType: NOTICETYPE.ALARM,
    RType: ROUND.DAY,
  });
  //攻击风险监控
  const types: Nodes[] = [
    {
      title: t('overview.alarmMonitor'),
      type: NOTICETYPE.ALARM,
    },
  ];
  //周期
  const ranges: Nodes[] = [
    {
      //近24小时
      title: 'overview.day',
      type: ROUND.DAY,
    },
    {
      //近7天
      title: 'overview.week',
      type: ROUND.WEEK,
    },
    {
      //近30天
      title: 'overview.month',
      type: ROUND.MONTH,
    },
  ];
  const SelectType = (val: NOTICETYPE | ROUND, type: 'LType' | 'RType'): void => {
    typeAll[type] = val as never;
  };
</script>
<style lang="less" scoped>
  .monitor {
    .filter {
      height: 56px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      border-bottom: 1px solid #eee;
      .optype {
        padding: 6px 16px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .actived {
        background: #eeeeee;
        border-radius: 8px;
        font-weight: 600;
        color: #000000;
      }
    }
  }
</style>
