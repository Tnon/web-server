<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 14:26:40
 * @LastEditTime: 2023-06-14 10:11:26
-->
<template>
  <div class="status">
    <template v-if="status">
      <template v-if="status === DRIVERSTATUS.RUNING">
        <div class="info suc">
          <CheckCircleFilled class="cicon" />
          <span>{{ t('operation.deteNor') }}</span>
        </div>
      </template>
      <template v-else-if="status === DRIVERSTATUS.ERROR">
        <div class="info err">
          <InfoCircleFilled class="cicon" />
          <span>{{ t('operation.deteErr') }}</span>
        </div>
      </template>
      <template v-else>
        <div class="info par">
          <play-circle-outlined class="cicon" />
          <span>{{ t('operation.suspend') }}</span>
        </div>
      </template>
    </template>
    <template v-else> - </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { CheckCircleFilled, InfoCircleFilled, PlayCircleOutlined } from '@ant-design/icons-vue';
  import { DRIVERSTATUS } from '@/enums/pstatus';
  defineProps<{
    status: DRIVERSTATUS;
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
