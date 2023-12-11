<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-11 14:39:57
 * @LastEditTime: 2023-07-24 14:41:17
-->
<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    @openChange="openChange"
    overlayClassName="batchM"
  >
    <template #content>
      <div class="container">
        <div
          class="nodes"
          @click="useCheckBox(E_BatchOption.Open)"
          :class="{ actived: boxType == E_BatchOption.Open }"
        >
          {{ t('reinforce.actionopen') }}
        </div>
        <div
          class="nodes"
          @click="useCheckBox(E_BatchOption.Close)"
          :class="{ actived: boxType == E_BatchOption.Close }"
        >
          {{ t('reinforce.actionclose') }}
        </div>
        <div
          class="nodes"
          @click="useCheckBox(E_BatchOption.Delete)"
          :class="{ actived: boxType == E_BatchOption.Delete }"
        >
          {{ t('reinforce.actiondelete') }}
        </div>
      </div>
    </template>
    <a-button type="text" :class="{ remdelactived: boxType || showPop }">
      <template #icon>
        <CarryOutOutlined />
      </template>
      <slot></slot>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { ref, PropType } from 'vue';
  import { CarryOutOutlined } from '@ant-design/icons-vue';
  import { E_BatchOption, E_Enabled, E_Rule_Type } from '../../type';
  import { useI18n } from 'vue-i18n';
  import { getDelCountDf, getSwitchCountDf } from '@/api/reinforce';
  const props = defineProps({
    boxType: String,
    isCheck: Boolean,
    disabledKeys: Array as PropType<{ key: string; value: any }[]>,
  });
  const emit = defineEmits([
    'update:isCheck',
    'update:boxType',
    'update:disabledKeys',
    'refreshTable',
    'update:canSelectApi',
  ]);
  const showPop = ref<boolean>(false);
  //pop openChange
  const openChange = (b) => {
    showPop.value = b;
  };
  const { t } = useI18n();
  const getCloseCount = (agms) => {
    return getSwitchCountDf({
      filter: agms,
      is_all: true,
      switch: E_Enabled.Close,
    });
  };
  const getOpenCount = (agms) => {
    return getSwitchCountDf({
      filter: agms,
      is_all: true,
      switch: E_Enabled.Open,
    });
  };
  const getCanDelCount = (agms) => {
    return getDelCountDf({
      filter: agms,
      is_all: true,
      switch: E_Rule_Type.Preset,
    });
  };
  //del or move
  const useCheckBox = async (type) => {
    //
    if (type === props.boxType) {
      emit('update:isCheck', false);
      emit('update:boxType', '');
      emit('update:disabledKeys', []);
      emit('update:canSelectApi', undefined);
    } else {
      emit('update:isCheck', true);
      emit('update:boxType', type);
      if (type === E_BatchOption.Open) {
        //更新disKey
        emit('update:disabledKeys', [{ key: 'enabled', value: E_Enabled.Open }]);
        emit('update:canSelectApi', getOpenCount);
      } else if (type === E_BatchOption.Close) {
        emit('update:disabledKeys', [{ key: 'enabled', value: E_Enabled.Close }]);
        emit('update:canSelectApi', getCloseCount);
      } else {
        emit('update:disabledKeys', [{ key: 'rule_type', value: E_Rule_Type.Preset }]);
        emit('update:canSelectApi', getCanDelCount);
      }
    }
    //刷新 重绘
    emit('refreshTable', true);
  };
</script>
<style lang="less" scoped>
  .batchM {
    .ant-popover-inner-content {
      padding: 0;
    }
    .container {
      padding: 8px 0;
      .line {
        width: 200px;
        height: 1px;
        background: #eeeeee;
        border-radius: 8px;
        margin: 8px 0;
      }
      .actived {
        background: #eee !important;
      }
      .nodes {
        width: 200px;
        padding: 0 16px;
        line-height: 40px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
  .remdelactived {
    background: #eee !important;
  }
</style>
