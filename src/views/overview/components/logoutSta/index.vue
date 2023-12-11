<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-02-15 10:57:07
-->
<template>
  <div>
    <!-- 账户登出期间 start -->
    <span>{{ t('overview.duringlogout') }}</span>
    <span
      @click="jumpTo('attack')"
      class="attack com"
      :class="~~state.alarm_num ? 'hasAttack' : ''"
    >
      <!-- 【告警：{{ alarm_num }}】 -->
      {{ t('overview.alarmNumber', [state.alarm_num]) }}
    </span>
    <!-- acdr根据后端接口 -->
    <span
      @click="jumpTo('acdr')"
      class="risk com"
      v-if="acdr_enabled"
      :class="~~state.event_num ? 'hasRisk' : ''"
    >
      <!-- 【事件：{{ event_num }}】 -->
      {{ t('overview.eventNumber', [state.event_num]) }}
    </span>
    <!-- 账户登出期间 end -->
    <span class="line">|</span>
    <!-- 账户登出范围 start -->
    <span v-if="state.last_logout_at">
      {{ t('overview.lastlogout') }}
      {{ state.last_logout_at }} - {{ state.last_login_at || '-' }}
    </span>
    <!-- 账户登出范围 end -->
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { logoutData } from './types';
  import { getNologinDura } from '@/api/overview';
  import { useI18n } from 'vue-i18n';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { useRouter } from 'vue-router';
  const props = defineProps({
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const state = reactive<logoutData>({
    alarm_num: 0,
    event_num: 0,
    last_login_at: '',
    last_logout_at: '',
  });
  const getData = async () => {
    const res = await getNologinDura();
    Object.assign(state, res);
  };
  getData();
  const router = useRouter();
  const jumpTo = (name) => {
    state.last_logout_at &&
      router.push({
        name,
        query: {
          begintime: state.last_logout_at,
          endtime: state.last_login_at,
        },
      });
  };
  props.refreshMethods!.logoutStaApi = getData;
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
</script>
<style lang="less" scoped>
  .com {
    font-size: @fz14;
    font-weight: 600;
    color: #18ba79;
    cursor: pointer;
  }
  .attack {
    margin: 0 8px;
  }
  .line {
    margin: 0 16px;
    color: #eee;
  }
  .hasAttack {
    color: @danger-color;
  }
  .hasRisk {
    color: @warn-color;
  }
</style>
