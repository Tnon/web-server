<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-15 11:01:06
 * @LastEditTime: 2023-03-08 20:44:35
-->
<template>
  <div class="switchContainer" v-if="hasSwitchSystem" @click="changeSystem">
    <a-badge
      :count="alarmCount"
      class="badge"
      :numberStyle="{
        borderRadius: '50%',
        textAligh: 'center',
        padding: '0',
        height: 'unset',
      }"
    >
      <swap-outlined class="bicon" />
      <div>{{ os_type === OSTYPE.LINUX ? 'Windows' : 'Linux' }}</div>
    </a-badge>
  </div>
</template>

<script setup lang="ts">
  import { SwapOutlined } from '@ant-design/icons-vue';
  import { useUserToken } from '@/store/modules/user';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { computed, onUnmounted, watchEffect } from 'vue';
  import { OSTYPE } from '@/enums/assetsType';
  import { E_Win_State } from '@/store/modules/product-logo/type';
  import { getAttRiskNumWin } from '@/api/overview';
  import { HANDLETYPE } from '@/enums/attack_risk';
  import { USERTOKEN } from '@/store/modules/user/type';
  const userTokenStore = useUserToken();
  const productLogoStore = useProductLogo();
  const userType = computed(() => userTokenStore.userInfo.u_type!);
  const os_type = computed(() => productLogoStore.os_type);
  const alarmCount = computed(() => productLogoStore.alarmCount);
  //是否能切换系统
  const hasSwitchSystem = computed(
    () => productLogoStore.win_state === E_Win_State.Active && userType.value !== USERTOKEN.safe,
  );
  //是否能查询风险数量
  const canViewCount = computed(
    () =>
      productLogoStore.win_state === E_Win_State.Active &&
      userType.value !== USERTOKEN.safe &&
      userType.value !== USERTOKEN.audit,
  );
  //轮训获取数量
  const getAlarmCount = async () => {
    const { code, attacknum, risknum } = await getAttRiskNumWin({
      handle: HANDLETYPE.UNHANDLE,
    });
    if (!code) {
      productLogoStore.SetAlarmCount(attacknum + risknum);
    }
  };
  //timer
  let timer: any;
  watchEffect(() => {
    if (canViewCount.value) {
      timer && clearInterval(timer);
      if (hasSwitchSystem.value) {
        setTimeout(() => {
          getAlarmCount();
        }, 2000);
        timer = setInterval(() => {
          getAlarmCount();
        }, 4000);
      } else {
        clearInterval(timer);
      }
    }
  });

  const changeSystem = () => {
    window.location.href = '/win/';
    clearInterval(timer);
  };
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style scoped lang="less">
  .switchContainer {
    position: absolute;
    width: 100%;
    cursor: pointer;
    bottom: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fafafa;
    padding-bottom: 20px;
    .badge {
      text-align: center;
      .bicon {
        font-size: 20px;
        margin-bottom: 8px;
      }
    }
  }
</style>
