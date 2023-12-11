<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-10 14:50:39
 * @LastEditTime: 2023-07-10 10:57:41
-->
<template>
  <div>
    <!-- 客户端引擎库 start -->
    <div>
      <div class="header">
        {{ t('operation.updclient') }}
      </div>
      <template v-for="item in clientEngineConfigs" :key="item.title">
        <!-- acdr根据后端接口 -->
        <template v-if="acdr_enabled || item.title !== t('operation.acdrengine')">
          <engine-node
            v-bind="item"
            :refreshMethods="refreshMethods"
            :packageInfo="client[item.keyName]"
          />
        </template>
      </template>
    </div>
    <!-- 客户端引擎库 end -->

    <!-- 服务端引擎库 start -->
    <div>
      <div class="header">
        {{ t('operation.updserver') }}
      </div>
      <template v-for="item in serverEngineConfigs" :key="item.title">
        <engine-node
          v-bind="item"
          :refreshMethods="refreshMethods"
          :packageInfo="server[item.keyName]"
        />
      </template>
    </div>
    <!-- 服务端引擎库 end -->
  </div>
</template>

<script setup lang="ts">
  import { getEngineConfigs } from '.';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { computed, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { engineNode } from '../engine-node';
  import { clientPackage, serverPackage } from '../../type';
  defineProps({
    refreshMethods: Function,
    client: {
      type: Object as PropType<clientPackage>,
      required: true,
    },
    server: {
      type: Object as PropType<serverPackage>,
      required: true,
    },
  });
  const { t } = useI18n();
  const { clientEngineConfigs, serverEngineConfigs } = getEngineConfigs(t);
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
</script>

<style scoped lang="less">
  .header {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 8px;
  }
</style>
