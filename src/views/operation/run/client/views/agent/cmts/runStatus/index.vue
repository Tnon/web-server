<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 14:26:40
 * @LastEditTime: 2023-07-10 15:50:35
-->
<template>
  <a-popover
    placement="right"
    :overlayClassName="stop_time || err_msg ? 'showContent' : 'hideContent'"
  >
    <template #content>
      <!-- 驱动停止时间（只有驱动有） start -->
      <div v-if="stop_time" class="errNode">
        <div class="label">{{ t('setting.drvStoTi') }}：</div>
        <div class="value">{{ stop_time }} </div>
      </div>
      <!-- 驱动停止时间（只有驱动有） end -->

      <!-- 异常原因（驱动为枚举，其余字符串） start -->
      <div v-if="err_msg" class="errNode">
        <div class="label"> {{ t('operation.errorCause') }}：</div>
        <div class="value">
          {{
            err_msg === ABN_Reason.LANPING
              ? t('operation.lpbz')
              : err_msg === ABN_Reason.OTHER
              ? t('operation.driverLoadError')
              : err_msg
          }}
        </div>
      </div>
      <!-- 异常原因 end -->
    </template>
    <div class="status">
      <template v-if="status">
        <template v-if="status === DRIVERSTATUS.RUNING">
          <CheckCircleFilled class="cicon nor" />
          <span class="nor">{{ t('operation.deteNor') }}</span>
        </template>
        <template v-else-if="status === DRIVERSTATUS.STOP">
          <PlayCircleFilled class="cicon par" />
          {{ t('operation.suspend') }}
        </template>
        <template v-else>
          <InfoCircleFilled class="cicon err" />
          <span class="err">{{ t('operation.deteErr') }}</span>
        </template>
      </template>
      <template v-else> - </template>
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { CheckCircleFilled, InfoCircleFilled, PlayCircleFilled } from '@ant-design/icons-vue';
  import { ABN_Reason, DRIVERSTATUS } from '@/enums/pstatus';
  defineProps<{
    status: DRIVERSTATUS;
    stop_time?: string;
    err_msg: string | ABN_Reason;
  }>();
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .cicon {
      font-size: 20px;
      margin-bottom: 6px;
    }
    .err {
      color: @warn-color;
    }
    .nor {
      color: @primary-color;
    }
    .par {
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .errNode {
    display: flex;
    margin: 8px 0;
    align-items: center;
    max-width: 300px;
    align-items: flex-start;
    .label {
      color: rgba(0, 0, 0, 0.8);
      word-break: keep-all;
      font-weight: 600;
    }
    .value {
      color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
