<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 10:09:39
 * @LastEditTime: 2023-10-13 19:04:25
-->
<template>
  <table-outlined @click="switchView" class="addIcon" />
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { TableOutlined } from '@ant-design/icons-vue';
  import { StrategyType } from '@/views/strategy/common/types';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import strategyView from '@/views/strategy/common/cmts/strategyView';
  const props = defineProps({
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    getStrategyList: {
      type: Function,
      required: true,
    },
    pageOption: {
      type: Object,
      required: true,
    },
    selectStrategy: {
      type: Function,
      required: true,
    },
    globalID: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  //策略表格视图
  const switchView = () => {
    useModal(
      {
        title: props.strategyType === StrategyType.Safe ? t('strategy.safe') : t('strategy.asset'),
        width: 850,
        footer: false,
        wrapClassName: 'modalBodyNopad',
        contentProps: {
          strategyType: props.strategyType,
          refreshStrategyList: props.getStrategyList,
          selectStrategy: props.selectStrategy,
          pageOption: props.pageOption,
          globalID: props.globalID,
        },
      },
      strategyView,
    );
  };
</script>

<style scoped lang="less">
  .addIcon {
    padding: 8px;
    cursor: pointer;
    font-size: @fz16;
    margin-right: 12px;
  }
</style>
