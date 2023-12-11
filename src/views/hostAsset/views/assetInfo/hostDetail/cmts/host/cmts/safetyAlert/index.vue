<template>
  <div class="safeBar">
    <!-- 主机安全状态 start -->
    <div class="formItem">
      <div class="label">{{ t('asset.hsfsta') }}</div>
      <div
        class="safestatus"
        v-if="
          acdr_enabled
            ? safetyStatus.alarm_count || safetyStatus.event_count
            : safetyStatus.alarm_count
        "
      >
        <!-- 告警数量 start -->
        <div class="type" @click="jumpTo('hostAsset-layout-assetInfo-host-detail-alarm')">
          <div class="typelabel">{{ t('menu.attack') }}:</div>
          <div class="typevalue attack">{{ safetyStatus.alarm_count }}</div>
        </div>
        <!-- 告警数量 end -->
        <!-- 事件数量 start -->
        <div
          class="type"
          @click="jumpTo('hostAsset-layout-assetInfo-host-detail-acdr')"
          v-if="acdr_enabled"
        >
          <div class="typelabel">{{ t('menu.ngav') }}:</div>
          <div class="typevalue acdr">{{ safetyStatus.event_count }}</div>
        </div>
        <!-- 事件数量 end -->
      </div>
      <div class="value safe" v-else>{{ t('asset.safe') }}</div>
    </div>
    <!-- 主机安全状态 end -->
    <!-- 资产健康状态 start -->
    <div class="formItem">
      <div class="label">{{ t('asset.assetsafe') }}</div>
      <div class="safestatus" v-if="safetyStatus.risk_total_count || vul_count">
        <!-- 风险数量 start -->
        <div class="type" @click="jumpTo('hostAsset-layout-assetInfo-host-detail-risk')">
          <div class="typelabel">{{ t('asset.rskUnit') }}:</div>
          <div class="typevalue acdr">{{ safetyStatus.risk_total_count }}</div>
        </div>
        <!-- 风险数量 end -->
        <!-- 漏洞数量 start -->
        <div class="type" @click="jumpTo('hostAsset-layout-assetInfo-host-detail-vulnerability')">
          <div class="typelabel">{{ t('asset.vulnerability') }}:</div>
          <div class="typevalue acdr">{{ vul_count }}</div>
        </div>
        <!-- 漏洞数量 end -->
      </div>
      <div class="value safe" v-else>{{ t('common.healthy') }}</div>
    </div>
    <!-- 资产健康状态 end -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { useProductLogo } from '@/store/modules/product-logo';
  const props = defineProps({
    safetyStatus: {
      type: Object as PropType<{
        //告警
        alarm_count: number;
        //事件
        event_count: number;
        //风险总和 系统/应用/账号/弱密码
        risk_total_count: number;
        //漏洞-应用漏洞
        app_vul_count: number;
        //漏洞-web漏洞
        web_vul_count: number;
        //漏洞-内核漏洞
        kernel_vul_count: number;
      }>,
      required: true,
    },
    host_id: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  });
  const vul_count = ref(0);
  watchEffect(() => {
    vul_count.value =
      props.safetyStatus.app_vul_count +
      props.safetyStatus.web_vul_count +
      props.safetyStatus.kernel_vul_count;
  });
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const { t } = useI18n();
  const router = useRouter();
  //需要重新调整
  const jumpTo = (type) => {
    router.push({
      // path: '/' + type,
      name: type,
      query: {
        id: props.host_id,
        ip: props.ip,
      },
    });
  };
</script>

<style lang="less" scoped>
  .safeBar {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #fff;
    margin-top: 16px;
    .formItem {
      display: flex;
      align-items: center;
      flex: 1;
      .label {
        font-size: @fz12;
        word-break: keep-all;
        margin-right: 30px;
      }
      .value {
        word-break: break-word;
      }

      .safe {
        color: @primary-color;
      }
      .safestatus {
        display: flex;
        align-items: center;
        .type {
          display: flex;
          align-items: center;
          margin-right: 16px;
          .typelabel {
            margin-right: 8px;
            word-break: keep-all;
          }
          .typevalue {
            cursor: pointer;
          }
          .attack {
            color: @danger-color;
          }
          .acdr {
            color: @warn-color;
          }
        }
      }
    }
  }
  .error {
    background: #fde6e5;
    color: @danger-color;
  }
  .healty {
    background: #acecd2;
    color: #40d69a;
  }
  .warning {
    background: #fdf1e4;
    color: @warn-color;
  }
</style>
