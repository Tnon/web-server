<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2023-06-19 18:34:04
-->
<template>
  <div class="logo">
    <a-image :src="logoUrl" :preview="false">
      <template #placeholder>
        <loading-outlined />
      </template>
    </a-image>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  const productLogoStore = useProductLogo();
  const logoUrl = computed(() => productLogoStore.logoUrl);
</script>
<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    overflow: hidden;
    white-space: nowrap;
    ::v-deep(img) {
      height: 48px;
      width: 48px;
    }

    .title {
      color: white;
      margin-bottom: 0;
    }
  }
</style>
