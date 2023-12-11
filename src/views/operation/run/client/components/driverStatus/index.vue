<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-12-21 17:51:48
-->
<template>
  <div>
    <template v-if="driverStatus">
      <a-popover
        placement="right"
        :overlayClassName="
          driverState.stop_time || driverState.loading_status === 2 ? 'showContent' : 'hideContent'
        "
      >
        <template #content>
          <div v-if="driverState.stop_time">
            {{ t('setting.drvStoTi') }}：{{ driverState.stop_time }}
          </div>
          <div v-if="driverState.loading_status == 2">
            {{ t('operation.errorCause') }}：{{ t('operation.driverLoadError') }}
          </div>
        </template>
        <div class="iconText error" v-if="driverState.status === DRIVERSTATUS.ERROR">
          <WarningFilled class="ico" />
          {{ t('operation.jzsb') }}
        </div>
        <div class="iconText success" v-if="driverState.status === DRIVERSTATUS.RUNING">
          <CheckCircleFilled class="ico" />
          {{ t('operation.zcyx') }}
        </div>
        <div class="iconText warn" v-if="driverState.status === DRIVERSTATUS.STOP">
          <PlayCircleFilled class="ico" />
          {{ t('operation.ztyx') }}
        </div>
      </a-popover>
    </template>
    <template v-else>
      <span>-</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { DRIVERSTATUS } from '@/enums/pstatus';
  import { WarningFilled, CheckCircleFilled, PlayCircleFilled } from '@ant-design/icons-vue';
  import { PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    driverStatus: {
      type: Object as PropType<{
        [k: string]: {
          status: number;
          stop_time?: string;
          loading_status?: number;
        };
      }>,
    },
    driverType: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const driverState = reactive({
    status: undefined,
    stop_time: '',
    loading_status: undefined,
  });
  watchEffect(() => {
    if (props.driverStatus) {
      const currentDriver = props.driverStatus[props.driverType];
      Object.assign(driverState, currentDriver);
    }
  });
</script>
<style lang="less" scoped>
  .iconText {
    display: flex;
    align-items: center;
    .ico {
      margin-right: 8px;
    }
  }
  .error {
    color: @danger-color;
  }
  .success {
    color: @primary-color;
  }
  .warn {
    color: @warn-color;
  }
</style>
