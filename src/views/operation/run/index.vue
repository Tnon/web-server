<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2023-01-09 17:04:14
-->
<template>
  <menuContent :routers="routers" />
</template>

<script setup lang="ts">
  import allRouters, { notAdminRouters } from '@/router/modules/operation/run/modules';
  import menuContent from '../components/layout';
  import { useUserToken } from '@/store/modules/user';
  import { computed } from 'vue';
  import { USERTOKEN } from '@/store/modules/user/type';
  const userTokenStore = useUserToken();
  //获取管理员类型
  const userType = computed(() => userTokenStore.userInfo.u_type);
  const routers = computed(() => {
    if (userType.value === USERTOKEN.admin || userType.value === USERTOKEN.super) {
      return allRouters;
    }
    return notAdminRouters;
  });
</script>
