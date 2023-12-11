<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 16:51:41
 * @LastEditTime: 2023-03-01 18:06:16
-->
<template>
  <div class="nodeContainer">
    <!-- 启动进程时间 start -->
    <div class="header">
      <span>{{ t('ngav.prosline') }}</span>
      {{ nodeInfo.start_time }}
    </div>
    <!-- 启动进程时间 start -->
    <div class="content">
      <div class="process">
        <nodeIcon
          :level="nodeInfo.level"
          :status="nodeInfo.status"
          :flag="nodeInfo.flag"
          :icon="nodeInfo.icon"
          :size="40"
        />
        <div class="rootname">
          <!-- 名称 start -->
          <div class="name">{{ nodeInfo.label }}</div>
          <!-- 名称 end -->

          <!-- 自动查杀/待处置 start -->
          <div
            class="value"
            :class="[nodeInfo.flag === Node_BehaviorBack.Lan ? 'primary' : 'danger']"
          >
            {{ nodeInfo.flag === Node_BehaviorBack.Lan ? t('ngav.autokil') : t('ngav.nohan') }}
          </div>
          <!-- 自动查杀/待处置 end -->
        </div>
        <run-status :status="nodeInfo.status" />
      </div>
      <div class="behavior">
        <template v-if="nodeInfo.children?.length">
          <!-- 威胁行为 start -->
          <div class="bhheader">{{ t('ngav.wxbeh') }}</div>
          <!-- 威胁行为 start -->
          <!-- 行为时间轴 start -->
          <a-timeline class="customTimeLine">
            <template v-for="item in nodeInfo.children" :key="item">
              <a-timeline-item>
                <template #dot>
                  <behaviorIcon
                    :level="item.level"
                    :icon="item.icon"
                    :status="nodeInfo.status"
                    :size="24"
                  />
                </template>
                <div class="bhContent">
                  <div class="bhtitle">{{ item.action }}</div>
                  <div class="bhcontent" v-if="item.action_detail && item.action_detail.length">
                    <div v-for="labels in item.action_detail" :key="labels">
                      {{ labels }}
                    </div>
                  </div>
                </div>
              </a-timeline-item>
            </template>
          </a-timeline>
          <!-- 行为时间轴 start -->
        </template>
        <template v-else> - </template>
      </div>
      <div class="cmd">
        <!-- 进程命令行 start -->
        <div class="cmdheader">{{ t('ngav.prccmd') }}</div>
        <div class="cmdcontent" v-if="nodeInfo.pid_detail_info">
          {{ nodeInfo.pid_detail_info.cmd_line }}
        </div>
        <!-- 进程命令行 end -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Node,
    Node_BehaviorBack,
  } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { PropType } from 'vue';
  import nodeIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/nodeIcon';
  import behaviorIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/behaviorIcon';
  import { useI18n } from 'vue-i18n';
  import runStatus from '@/views/ngav/flow/cmts/pathAndFlow/cmts/runStatus';
  defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .nodeContainer {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    margin-bottom: 16px;
    .header {
      height: 32px;
      background: #fafafa;
      padding: 0 16px;
      display: flex;
      align-items: center;
    }
    .content {
      display: flex;
      .process {
        display: flex;
        padding: 16px;
        flex: 2;
        min-width: 500px;
        .rootname {
          margin-left: 8px;
          flex: 1;
          .name {
            font-size: @fz14;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.8);
          }
          .value {
            font-size: @fz14;
            font-weight: 600;
          }
          .primary {
            color: #18ba79;
          }
          .danger {
            color: #f75555;
          }
        }
      }
      .behavior {
        flex: 3;
        padding: 16px 24px;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        .bhheader {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          margin-bottom: 16px;
        }
        .customTimeLine {
          :deep(.ant-timeline-item) {
            padding: 0;
            &:last-child {
              .ant-timeline-item-tail {
                display: none;
              }
            }
          }
          :deep(.ant-timeline-item-tail) {
            border-left: 1px solid #f75555;
          }
          .bhContent {
            .bhtitle {
              font-size: @fz12;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.8);
              margin-bottom: 8px;
            }
            .bhcontent {
              font-size: @fz12;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.8);
              margin-bottom: 16px;
            }
          }
        }
      }
      .cmd {
        flex: 2;
        padding: 16px;
        .cmdheader {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          margin-bottom: 8px;
        }
        .cmdcontent {
          font-size: @fz12;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
</style>
