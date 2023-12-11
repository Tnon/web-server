<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 21:21:34
 * @LastEditTime: 2023-05-08 18:03:11
-->
<template>
  <div class="header">
    <div class="leftOption">
      <!-- 返回图标 start -->
      <left-outlined class="icon" @click="goBack" />
      <!-- 返回图标 start -->
      <!-- 分数 start -->
      <score-tips :score="score" :level="level">
        <div class="number" :class="[className]">{{ score }}</div>
      </score-tips>
      <!-- 分数 end -->
      <!-- 规则名称 start -->
      <div class="name" :class="[className]">{{ rule_name }}</div>
      <!-- 规则名称 end -->
      <!-- 分割线 start -->
      <div class="line"></div>
      <!-- 分割线 start -->
      <!-- 根名 start -->
      <div class="type">
        <div>{{ root_name }}</div>
        <div class="xifen">
          <span>{{ t('ngav.xflx') }}</span>
          <span>{{ sub_rule_name }}</span>
        </div>
      </div>
      <!-- 根名 start -->
    </div>
    <div class="rightOption">
      <!-- 处理操作 start -->
      <template v-if="Object.keys(record).length">
        <handleGroup
          :handle-type="~~handle!"
          :selectedKeys="MODELTYPE.NGAVPATH"
          :reload="goBack"
          :id="id"
          :model-type="MODELTYPE.NGAV"
          :handled="record.handled"
        />
      </template>

      <handleTBW
        class="more"
        :refreshTable="getRecord"
        :record="record"
        :model-type="MODELTYPE.NGAV"
      >
        {{ t('arcomn.wxcz') }}
      </handleTBW>
      <!-- 处置记录 start -->
      <a-button class="more" @click="openHandleRecord">
        {{ t('arcomn.handreoc') }}
      </a-button>
      <!-- 处置记录 end -->
      <div class="line"></div>
      <!-- 处理操作 end -->
      <!-- 切换视图 start -->
      <!-- <custom-icon type="#ax-view-property" class="switchView" @click="switchView" /> -->
      <UnorderedListOutlined class="switchView" @click="switchView" />
      <!-- 切换视图 end -->
      <div class="line"></div>
      <!-- 图例 start -->
      <!-- <custom-icon type="#ax-view-host" class="switchView" @click="viewMiniMap" /> -->
      <QuestionCircleOutlined class="switchView" @click="viewMiniMap" />
      <!-- 图例 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    LeftOutlined,
    QuestionCircleOutlined,
    UnorderedListOutlined,
  } from '@ant-design/icons-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { watchEffect, ref, createVNode, PropType } from 'vue';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import useCreatDraw from '@/hooks/use-click-row';
  import flowLegend from '@/views/ngav/flow/cmts/flowLegend';
  import handleGroup from '@/components/attack-risk-cmts/dataTable/cmts/handleGroup';
  import handleTBW from '@/components/attack-risk-cmts/dataTable/cmts/handleTBW';
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import handleRecord from '@/components/attack-risk-cmts/attackDrawer/normal/footer/cmts/handlerecord';
  import scoreTips from '@/components/scoreTips';
  import { getClassName } from '@/views/ngav/cmts/tableColumns/attackPath';
  const props = defineProps({
    rule_name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    root_name: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
    viewIsFlow: {
      type: Boolean,
      required: true,
    },
    sub_rule_name: {
      type: String,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
    getRecord: {
      type: Function,
      required: true,
    },
    handle: {
      type: Number as PropType<HANDLETYPE>,
    },
  });
  const { t } = useI18n();
  //获取处理类型
  const {
    query: { handle, id, from },
  } = useRoute() as any;
  const emit = defineEmits(['update:viewIsFlow']);
  // 路由跳转
  const router = useRouter();
  const goBack = () => {
    //
    if (from) {
      router.go(-1);
    } else {
      router.push({
        name: 'acdr',
        query: {
          handleType: handle,
        },
      });
    }
  };
  //类名
  const className = ref('');
  watchEffect(() => {
    className.value = getClassName(props.level!);
  });
  //切换视图
  const switchView = () => {
    emit('update:viewIsFlow', !props.viewIsFlow);
  };
  //图例
  const viewMiniMap = () => {
    useCreatDraw(
      {
        title: 'viewTUliInstance',
        contentProps: { drawClass: 'noHeader' },
        width: 250,
      },
      flowLegend,
    );
  };
  //打开处置记录
  const openHandleRecord = () => {
    useModal(
      {
        title: t('arcomn.handreoc'),
        footer: false,
        width: 800,
      },
      createVNode(handleRecord, { id, handle: ~~handle }),
    );
  };
</script>

<style scoped lang="less">
  .header {
    flex: 56px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    .leftOption {
      display: flex;
      align-items: center;
      .icon {
        font-size: @fz16 !important;
        margin-right: 8px;
        color: rgba(0, 0, 0, 0.8);
      }
      .number {
        color: #fff !important;
        padding: 0 6px;
        border-radius: 8px;
        margin-right: 8px;
        font-size: @fz16;
        font-weight: 600;
      }
      .name {
        font-size: @fz14;
        font-weight: 600;
        background: none !important;
        margin-left: 12px;
      }
      .danger {
        color: #f75555;
        background: #f75555;
      }
      .warning {
        color: #ecd834;
        background: #ecd834;
      }
      .mid {
        color: #f8a556;
        background: #f8a556;
      }

      .type {
        font-size: @fz14;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        .xifen {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
    .rightOption {
      display: flex;
      align-items: center;
      .switchView {
        font-size: @fz18 !important;
      }
      :deep(.more) {
        margin-left: 16px;
        font-size: @fz12;
        height: 28px;
      }
    }
    .line {
      width: 1px;
      height: 16px;
      background: rgba(0, 0, 0, 0.04);
      margin: 0 16px;
    }
  }
</style>
