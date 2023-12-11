<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-03-07 20:46:23
-->
<template>
  <div class="header">
    <!-- 危险等级 start -->
    <danger-level :level="record.level" />
    <!-- 危险等级 end -->
    <div class="riOp">
      <!-- 拦截和处理 start -->
      <div class="txt-hand">
        <span class="label">{{ t(`arcomn.${text}`) }}</span>
      </div>
      <!-- 拦截和处理 end -->

      <!-- 标签 start -->
      <div class="tags">
        <span class="tag primary" v-for="item in tags" :key="item">{{ item }}</span>
      </div>
      <!-- 标签 end -->
    </div>
    <!-- 处理操作 start -->
    <handleGroup
      :handled="record.handled"
      :handle-type="record.handle!"
      :selectedKeys="MODELTYPE.ATTACKPATH"
      :reload="refreshTableAndCloseDraw"
      :id="record.id"
      :model-type="MODELTYPE.ATTACK"
    />
    <handleTBW
      :refreshTable="refreshTableAndCloseDraw"
      :record="record"
      :model-type="MODELTYPE.ATTACK"
    />
    <!-- 处理操作 end -->
  </div>
  <!-- 特征和辅助分析 start -->
  <div class="details">
    <!-- 风险行为（都有） start -->
    <div class="label">
      {{ t('arcomn.attChar') }}
    </div>
    <div class="msg">{{ record.description }}</div>
    <!-- 风险行为 end -->
  </div>
  <!-- 特征和辅助分析 end -->
</template>
<script lang="ts" setup>
  import { PropType, ref, watchEffect } from 'vue';
  import { dangerLevel } from '@/components/dangerLevel';
  import { Pstatus } from '@/enums/pstatus';
  import { useI18n } from 'vue-i18n';
  import handleGroup from '@/components/attack-risk-cmts/dataTable/cmts/handleGroup';
  import handleTBW from '@/components/attack-risk-cmts/dataTable/cmts/handleTBW';
  import { MODELTYPE } from '@/enums/attack_risk';
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    tags: Array as PropType<string[]>,
    suggestion: String,
    overview: String,
    refreshTable: {
      type: Function,
    },
    closeDraw: {
      type: Function,
    },
  });

  const { t } = useI18n();
  const refreshTableAndCloseDraw = async () => {
    await props.refreshTable!();
    props.closeDraw!();
  };
  //处理状态
  const text = ref('');
  watchEffect(() => {
    text.value = Pstatus[props.record!.handled];
  });
</script>
<style lang="less" scoped>
  .header {
    height: 104px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .riOp {
      flex: 1;
      .txt-hand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        .label {
          font-size: @fz14;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
      }
      .tags {
        .tag {
          padding: 2px 8px;
          font-size: @fz12;
          font-weight: 400;
          border-radius: 2px;
          margin-right: 4px;
          display: inline-block;
          margin-top: 4px;
        }
        .primary {
          background: #eeeeee;
          color: rgba(0, 0, 0, 0.6);
        }
        .color {
          background: rgba(88, 132, 222, 0.15);
          color: #5884de;
        }
      }
    }
  }
  .details {
    padding-top: 24px;
    border-bottom: 1px solid #eee;
    .msg {
      margin-bottom: 24px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      word-break: break-word;
    }
    .label {
      font-size: @fz12;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }
  }
</style>
