<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-07 10:09:34
 * @LastEditTime: 2022-10-09 14:12:44
-->
<template>
  <div class="header">
    <div class="leftOption">
      <!-- 策略名 start -->
      <span class="name">{{ selectedName }}</span>
      <!-- 策略名 end -->
      <!-- 可编辑提示 start -->
      <span class="tips">{{ !isEditing ? t('strategy.strtips') : t('strategy.strtipssave') }}</span>
      <!-- 可编辑提示 end -->
    </div>
    <div class="rightOption">
      <renameDelPop
        v-if="selectedId !== globalID"
        v-model:selectedId="selectedIdCmp"
        v-model:isEditing="isEditingCmp"
        :globalID="globalID"
        :activedId="selectedIdCmp"
        :activedName="selectedName"
        :strategyType="strategyType"
        :refreshStrategyList="refreshStrategyList"
      />
      <!-- 策略编辑 start -->
      <!-- -->
      <slot></slot>
      <!-- 策略编辑 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';
  import { StrategyType } from '@/views/strategy/common/types';
  import renameDelPop from '@/views/strategy/common/cmts/renameDelPop';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    globalID: {
      type: Number,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
    selectedName: {
      type: String,
      required: true,
    },
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    refreshStrategyList: {
      type: Function,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:selectedId', 'update:isEditing']);
  //选择策略id中介
  const selectedIdCmp = computed({
    get: () => props.selectedId,
    set: (v) => emit('update:selectedId', v),
  });
  //选择策略id中介
  const isEditingCmp = computed({
    get: () => props.isEditing,
    set: (v) => emit('update:isEditing', v),
  });
</script>

<style scoped lang="less">
  .header {
    height: 48px;
    background: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftOption {
      .name {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
        margin-right: 16px;
      }
      .tips {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
        line-height: 24px;
      }
    }
    .rightOption {
      display: flex;
      align-items: center;
      .editBtn {
        margin-left: 12px;
      }
    }
  }
</style>
