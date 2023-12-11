<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-15 16:58:14
 * @LastEditTime: 2023-03-28 19:55:39
-->
<template>
  <template v-if="record!.handled ===  HANDLESTATUS.GUIDANG">
    <a-button type="text" class="iconBtn" disabled>
      <EllipsisOutlined />
    </a-button>
  </template>
  <a-popover
    v-else
    placement="leftTop"
    trigger="click"
    overlayClassName="popNoPad"
    destroyTooltipOnHide
  >
    <template #content>
      <div v-for="(item, index) in actionList" :key="index">
        <!-- 处置 加黑 加白 start -->
        <a-button
          class="noradiuBtn"
          type="text"
          :loading="item.loading && item.loading(record)"
          :disabled="item.disabled && item.disabled(record)"
          @click="item.func!({ record }, refreshTable)"
        >
          {{ item.text }}
        </a-button>
        <!-- 处置 加黑 加白 end -->
      </div>
    </template>
    <a-button class="iconBtn" v-if="$slots['default']">
      <slot></slot>
    </a-button>
    <a-button type="text" class="iconBtn" v-else>
      <EllipsisOutlined />
    </a-button>
  </a-popover>
</template>

<script setup lang="ts">
  import { HANDLESTATUS, MODELTYPE } from '@/enums/attack_risk';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getEventList } from '.';

  const props = defineProps({
    refreshTable: {
      type: Function as any,
      required: true,
    },
    record: {
      type: Object,
    },
    modelType: {
      type: Number as PropType<MODELTYPE>,
      required: true,
    },
  });
  const { t } = useI18n();
  const actionList = getEventList(t, props.modelType);
</script>
