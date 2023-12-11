<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-06-05 15:12:21
-->
<template>
  <div class="header">
    <!-- 危险等级 start -->
    <danger-level :level="level" />
    <!-- 危险等级 end -->
    <div class="riOp">
      <!-- 拦截和处理 start -->
      <div class="txt-hand">
        <span class="label">{{ text }}</span>
      </div>
      <!-- 拦截和处理 end -->

      <!-- 标签 start -->
      <div class="tags">
        <span class="tag primary" v-for="item in tags" :key="item">{{ item }}</span>
      </div>
      <!-- 标签 end -->
    </div>
    <!-- 处理操作 start -->
    <buttonGroups :actions="btnActions" />
    <!-- 处理操作 end -->
  </div>
  <!-- 特征和辅助分析 start -->
  <div class="details">
    <!-- 风险行为（都有） start -->
    <div class="label">
      {{ t('arcomn.attChar') }}
    </div>
    <div class="msg">{{ description }}</div>
    <!-- 风险行为 end -->
  </div>
  <!-- 特征和辅助分析 end -->
</template>
<script lang="ts" setup>
  import { createVNode, PropType, ref, watchEffect } from 'vue';
  import { dangerLevel } from '@/components/dangerLevel';
  import { useI18n } from 'vue-i18n';
  import buttonGroups from '@/components/buttonGroups';
  import { batchHandlePatch } from '@/api/reinforce';
  import { E_Handle_Status, HandleType } from '../../../tableContent/type';
  import { useModal } from '@/hooks';
  const props = defineProps({
    description: {
      type: String,
    },
    level: {
      type: [String, Number],
    },
    tags: Array as PropType<string[]>,
    refreshTable: {
      type: Function,
    },
    closeDraw: {
      type: Function,
    },
    handled: {
      type: Number,
      required: true,
    },
    handle: {
      type: Number as PropType<HandleType>,
      required: true,
    },
    id: Number,
  });

  const { t } = useI18n();
  const btnActions = [
    {
      text: props.handle === HandleType.HANDLED ? t('reinforce.handrw') : t('reinforce.handr'),
      callback: async () => {
        useModal(
          {
            title:
              props.handle === HandleType.HANDLED ? t('reinforce.handrw') : t('reinforce.handr'),
            wrapClassName: 'noheadModal',
            handleOk: async () => {
              await batchHandlePatch({
                filter: { handle: props.handle },
                isall: false,
                riskinfolist: [props.id],
                set_handle:
                  props.handle === HandleType.HANDLED ? HandleType.UNHANDLE : HandleType.HANDLED,
              });
              await props.refreshTable!();
              props.closeDraw!();
            },
          },
          createVNode(
            'div',
            {
              style: {
                fontSize: '16px',
                color: 'rgba(0, 0, 0, 0.8)',
                fontWeight: 600,
                padding: '24px',
              },
            },
            props.handle === HandleType.HANDLED ? t('reinforce.handrgg') : t('reinforce.handrwgg'),
          ),
        );
      },
    },
  ];
  //处理状态
  const text = ref('');
  watchEffect(() => {
    text.value =
      props.handled === E_Handle_Status.SBao ? t('arcomn.SBAOStatus') : t('arcomn.LANJIEStatus');
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
