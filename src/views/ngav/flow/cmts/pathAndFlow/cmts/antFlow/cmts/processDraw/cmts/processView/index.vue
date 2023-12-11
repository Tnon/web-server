<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 17:32:18
 * @LastEditTime: 2023-03-28 19:47:15
-->
<template>
  <div class="containerDraw" :class="[classNameExtra]">
    <a-timeline class="customTimeLine">
      <a-timeline-item class="processContainer">
        <template #dot>
          <node-icon
            :level="nodeInfo.level"
            :status="nodeInfo.status"
            :flag="nodeInfo.flag"
            :icon="nodeInfo.icon"
            :size="56"
          />
        </template>
        <div class="process">
          <div class="title">{{ nodeInfo.label }}</div>
          <div class="flexLine">
            <!-- 自动查杀/待处置 start -->
            <div
              class="label"
              :class="[nodeInfo.flag === Node_BehaviorBack.Lan ? 'primary' : 'danger']"
            >
              {{ nodeInfo.flag === Node_BehaviorBack.Lan ? t('ngav.autokil') : t('ngav.nohan') }}
            </div>
            <!-- 自动查杀/待处置 end -->
            <!-- 处置选项 start -->
            <handleTBW
              v-if="record"
              :record="record"
              :refreshTable="getRecord"
              :model-type="MODELTYPE.NGAV"
            >
              {{ t('ngav.exchz') }}
            </handleTBW>
            <!-- 处置选项 end -->
          </div>
          <run-status :status="nodeInfo.status" />
        </div>
      </a-timeline-item>
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
          <div class="bhCp">
            <div class="bhContent">
              <!-- 动作 start -->
              <div class="bhtitle">{{ item.action }}</div>
              <!-- 动作 end -->
              <!-- 查看文件 start -->
              <div
                class="viewFile"
                @click="viewFileContentMethod(nodeInfo, item)"
                v-if="item.file_content && item.file_content.length"
              >
                {{ t('ngav.viefile') }}
              </div>
            </div>
            <!-- 查看文件 end -->
            <div class="bhcontent" v-if="item.action_detail && item.action_detail.length">
              <div v-for="labels in item.action_detail" :key="labels">
                {{ labels }}
              </div>
            </div>
          </div>
        </a-timeline-item>
      </template>
      <a-timeline-item>
        <template #dot>
          <div class="dotted"></div>
        </template>
        <!-- 进程启动时间 start -->
        <div class="timeContent">
          <span>{{ t('ngav.prosline') }}</span>
          {{ nodeInfo.start_time }}
        </div>
        <!-- 进程启动时间 start -->
      </a-timeline-item>
    </a-timeline>
    <div class="line"></div>
    <div class="handres">
      <!-- 人工处置结果 start -->
      <div class="node">
        <div class="titles">{{ t('arcomn.rhresu') }}</div>
        <peopleResult :result="dispose_result" :proc_fail_reason="proc_fail_reason ?? {}" />
      </div>
      <!-- 人工处置结果 end -->
      <!-- 当前处置策略 start -->
      <div class="node" v-if="record">
        <div class="titles">{{ t('arcomn.cuspol') }}</div>
        <currentPolicy :polices="policy_status" />
      </div>
      <!-- 当前处置策略 end -->
    </div>
    <div class="line"></div>
    <!-- tab start -->
    <switch-nodes class="switchnode" v-model:actived="fType" :types="dymicTab" />
    <!-- tab end -->
    <template v-if="fType === 'baseinfo'">
      <!-- 进程详情 start -->
      <process-detail :nodeInfo="nodeInfo" />
      <!-- 进程详情 end -->

      <!-- 文件详情 start -->
      <file-detail :detail_id="detail_id" :nodeInfo="nodeInfo" />
      <!-- 文件详情 start -->
    </template>
    <template v-else>
      <handleRecord :id="id" :handle="~~handle" :node_id="nodeInfo.id" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { createVNode, PropType, ref, watchEffect } from 'vue';
  import {
    Node,
    NodeLevel,
    Node_BehaviorBack,
  } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import nodeIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/nodeIcon';
  import behaviorIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/behaviorIcon';
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import viewFile from './cmts/viewFile';
  import processDetail from './cmts/processDetail';
  import fileDetail from './cmts/fileDetail';
  import runStatus from '@/views/ngav/flow/cmts/pathAndFlow/cmts/runStatus';
  import peopleResult from '@/components/attack-risk-cmts/dataTable/cmts/peopleResult';
  import currentPolicy from '@/components/attack-risk-cmts/dataTable/cmts/currentPolicy';
  import handleTBW from '@/components/attack-risk-cmts/dataTable/cmts/handleTBW';
  import { getNgavSimpleRecord } from '@/api/ngav';
  import { useRoute } from 'vue-router';
  import { getHandleTabs } from '.';
  import { MODELTYPE } from '@/enums/attack_risk';
  import switchNodes from '@/components/switchNodes';
  import handleRecord from '@/components/attack-risk-cmts/attackDrawer/normal/footer/cmts/handlerecord';
  const props = defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
    detail_id: {
      type: Number,
      required: true,
    },
    // 节点失败原因
    proc_fail_reason: {
      type: Object,
    },
    //节点人工处置结果
    dispose_result: {
      type: Number,
    },
    //当前处置策略
    policy_status: {
      type: Array,
    },
  });
  const { t } = useI18n();
  //获取处理类型
  const {
    query: { handle, id },
  } = useRoute() as any;
  //判断颜色
  const classNameExtra = ref('');
  watchEffect(() => {
    switch (props.nodeInfo.level) {
      case NodeLevel.High: //进程 高危红色
        classNameExtra.value = 'high';
        break;
      case NodeLevel.Middle: //进程 中危橙色
        classNameExtra.value = 'mid';
        break;
      case NodeLevel.Low: //进程 低危黄色
        classNameExtra.value = 'low';
        break;
      case NodeLevel.NotDetection: //未检测到
        classNameExtra.value = 'not';
        break;
      case NodeLevel.Safe: //进程 已处理绿色
        classNameExtra.value = 'green';
        break;
      case NodeLevel.DunP: //盾牌 绿色
        classNameExtra.value = 'green';
        break;
      default: //盾牌 绿色
        classNameExtra.value = 'green';
        break;
    }
  });
  //查看文件
  const viewFileContentMethod = (nodeInfo, behavior) => {
    useModal(
      {
        // title: createVNode(viewFileTitle, { nodeInfo, behaviorNode: behavior }),
        title: 'viewContentInstanceKey',
        wrapClassName: 'noheadModal',
        footer: false,
        width: 500,
      },
      createVNode(viewFile, {
        nodeInfo,
        behaviorNode: behavior,
        detail_id: props.detail_id,
      }),
    );
  };
  //根据handle和id查询当前行信息
  const record = ref<any>();
  //获取行信息
  const getRecord = async () => {
    const { items } = await getNgavSimpleRecord({ id, handle: ~~handle });
    record.value = items[0];
  };
  getRecord();
  // 刚开始默认选中的tab
  const fType = ref<string>('baseinfo');
  const dymicTab = getHandleTabs();
</script>

<style scoped lang="less">
  .containerDraw {
    padding: 48px;
  }
  .high {
    background: linear-gradient(180deg, rgba(247, 85, 85, 0.2) 0%, rgba(255, 255, 255, 0) 20%);
    :deep(.ant-timeline-item-tail) {
      border-left: 1px solid #f75555;
    }
    .dotted {
      background-color: #f75555;
    }
  }
  .mid {
    background: linear-gradient(180deg, rgba(247, 247, 85, 0.2) 0%, rgba(255, 255, 255, 0) 20%);
    :deep(.ant-timeline-item-tail) {
      border-left: 1px solid #f7f755;
    }
    .dotted {
      background-color: #f7f755;
    }
  }
  .low {
    background: linear-gradient(180deg, rgba(246, 200, 77, 0.2) 0%, rgba(255, 255, 255, 0) 20%);
    :deep(.ant-timeline-item-tail) {
      border-left: 1px solid #f6c84d;
    }
    .dotted {
      background-color: #f6c84d;
    }
  }
  .not {
    background: linear-gradient(180deg, rgba(136, 136, 136, 0.2) 0%, rgba(255, 255, 255, 0) 20%);
    :deep(.ant-timeline-item-tail) {
      border-left: 1px solid #888;
    }
    .dotted {
      background-color: #888;
    }
  }
  .green {
    background: linear-gradient(180deg, rgba(24, 186, 121, 0.2) 0%, rgba(255, 255, 255, 0) 20%);
    :deep(.ant-timeline-item-tail) {
      border-left: 1px solid #18ba79;
    }
    .dotted {
      background-color: #18ba79;
    }
  }
  .customTimeLine {
    :deep(.ant-timeline-item) {
      padding: 0;
    }
    :deep(.ant-timeline-item-head-custom) {
      border-radius: 50%;
      // background: none !important;
    }
    .dotted {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    .processContainer {
      //
      padding-bottom: 20px;
      .process {
        margin-left: 20px;
        .title {
          font-size: @fz16;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          margin-bottom: 4px;
        }
        .flexLine {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .label {
          font-size: @fz16;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .primary {
          color: #18ba79;
        }
        .danger {
          color: #f75555;
        }
      }
    }
    .bhCp {
      padding-bottom: 34px;

      .bhcontent {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        margin: 8px 0;
      }
      .bhContent {
        display: flex;
        .bhtitle {
          font-size: @fz14;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        }
        .viewFile {
          font-size: @fz14;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);
          margin-left: 16px;
          cursor: pointer;
        }
      }
    }
    .timeContent {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      //   padding: 16px 0;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #eeeeee;
    margin: 24px 0;
  }
  .handres {
    display: flex;
    .node {
      flex: 1;
      .titles {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 20px;
        margin-bottom: 8px;
      }
    }
    margin-bottom: 20px;
  }
  .switchnode {
    margin: 0 -24px 16px -24px;
  }
</style>
