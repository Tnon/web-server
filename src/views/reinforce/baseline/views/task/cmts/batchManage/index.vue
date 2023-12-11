<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-11 14:39:57
 * @LastEditTime: 2023-03-13 18:30:31
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
          @click="useCheckBox(E_BatchOption.Parse)"
          :class="{ actived: boxType == E_BatchOption.Parse }"
        >
          {{ t('reinforce.ztrw') }}
        </div>
        <div
          class="nodes"
          @click="useCheckBox(E_BatchOption.Run)"
          :class="{ actived: boxType == E_BatchOption.Run }"
        >
          {{ t('reinforce.zx') }}
        </div>
        <div
          class="nodes"
          @click="useCheckBox(E_BatchOption.Delete)"
          :class="{ actived: boxType == E_BatchOption.Delete }"
        >
          {{ t('common.delete') }}
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
  import { E_BatchOption, E_Task_State } from '../../type';
  import { useI18n } from 'vue-i18n';
  import { getCanParseRunCount } from '@/api/reinforce';
  import { E_Task_Type } from '../taskForm/type';
  const props = defineProps({
    boxType: Number as PropType<E_BatchOption>,
    isCheck: Boolean,
    disabledKeys: Array as PropType<{ key: string; value: any }[]>,
    canSelectApi: Function,
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
  const getParseCount = (agms) => {
    return getCanParseRunCount({
      filter: agms,
      status: E_BatchOption.Run,
    });
  };
  const getRunCount = (agms) => {
    return getCanParseRunCount({
      filter: agms,
      status: E_BatchOption.Parse,
    });
  };
  //del or move
  const useCheckBox = async (type) => {
    //
    if (type === props.boxType) {
      emit('update:isCheck', false);
      emit('update:boxType', '');
      emit('update:disabledKeys', []);
    } else {
      emit('update:isCheck', true);
      emit('update:boxType', type);
      if (type === E_BatchOption.Parse) {
        //更新disKey
        emit('update:disabledKeys', [
          { key: 'task_status', value: E_Task_State.Complete },
          { key: 'task_status', value: E_Task_State.Parse },
          { key: 'exec_type', value: E_Task_Type.Now },
        ]);
        emit('update:canSelectApi', getParseCount);
      } else if (type === E_BatchOption.Run) {
        emit('update:disabledKeys', [
          { key: 'task_status', value: E_Task_State.Runing },
          { key: 'task_status', value: E_Task_State.Complete },
          { key: 'exec_type', value: E_Task_Type.Now },
        ]);
        emit('update:canSelectApi', getRunCount);
      } else {
        emit('update:disabledKeys', []);
        emit('update:canSelectApi', undefined);
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
