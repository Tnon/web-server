<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 14:26:40
 * @LastEditTime: 2023-09-21 18:29:14
-->
<template>
  <div class="status">
    <template v-if="status === E_Coll_Status.Normal">
      <div class="info suc">
        <CheckCircleFilled class="cicon" />
        <span>{{ t('operation.deteNor') }}</span>
      </div>
    </template>
    <template v-else-if="status === E_Coll_Status.Error">
      <a-tooltip placement="left" destroyTooltipOnHide>
        <template #title> {{ t('operation.wirsf') }} </template>
        <div class="info err">
          <InfoCircleFilled class="cicon" />
          <span>{{ t('operation.deteErr') }}</span>
        </div>
      </a-tooltip>
    </template>
    <template v-else-if="status === E_Coll_Status.UnEnable">
      <div class="info par">
        <InfoCircleFilled class="cicon" />
        <span>{{ t('common.wenable') }}</span>
      </div>
    </template>
    <template v-else-if="status === E_Coll_Status.RunError">
      <div class="info par">
        <InfoCircleFilled class="cicon" />
        <span>{{ t('operation.sysloger') }}</span>
      </div>
    </template>
    <template v-else-if="status === E_Coll_Status.AgtErr">
      <div class="info par">
        <InfoCircleFilled class="cicon" />
        <span>{{ t('operation.syslogera') }}</span>
      </div>
    </template>
    <template v-else> - </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons-vue';
  import { E_Coll_Status } from './types';
  defineProps<{
    status: E_Coll_Status;
  }>();
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .status {
    .info {
      display: flex;
      align-items: center;
    }
    .suc {
      color: @primary-color;
    }
    .err {
      color: @warn-color;
    }
    .par {
      color: rgba(0, 0, 0, 0.5);
    }
    .cicon {
      font-size: 14px;
      margin-right: 6px;
    }
  }
</style>
<!-- <template>
  <div :style="{ color: statusColor }">
    <span v-if="status !== 0">{{ t(`operation.${description}`) }}</span>
    <span v-else>-</span>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { pointStatus } from '@/enums/assetsType';

  const props = defineProps({
    status: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const description = ref('');
  const statusColor = ref('');
  watchEffect(() => {
    if (props.status) {
      description.value = pointStatus[props.status].split(',')[0];
      statusColor.value = pointStatus[props.status].split(',')[1];
    }
  });
</script> -->
