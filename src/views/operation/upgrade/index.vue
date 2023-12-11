<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2023-01-09 17:03:20
-->
<template>
  <menuContent :routers="routers">
    <template #upgrade="{ refreshMethods }">
      <!-- 产品升级按钮 start -->
      <product-upgrade :refreshMethods="refreshMethods" />
      <!-- 产品升级按钮 end -->
    </template>
    <!-- <template #toolbar>
    
    </template> -->
  </menuContent>
</template>

<script setup lang="ts">
  import allRouters, { notAdminRouters } from '@/router/modules/operation/upgrade/modules';
  import { USERTOKEN } from '@/store/modules/user/type';
  import { computed } from 'vue';
  import menuContent from '../components/layout';
  import productUpgrade from '../components/product-upgrade';
  import { useUserToken } from '@/store/modules/user';
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
