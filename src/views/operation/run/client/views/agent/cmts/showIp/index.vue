<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-25 11:03:02
 * @LastEditTime: 2023-08-28 13:57:46
-->
<template>
  <a-popover trigger="click" placement="rightTop" overlayClassName="popNoPad" destroyTooltipOnHide>
    <template #content>
      <ip-select :show_ip="show_ip" :host_id="host_id" />
    </template>
    <div class="label">
      <div class="text">{{
        show_ip.id === E_Show_Ip.Init
          ? t('strategy.ljipyx')
          : show_ip.id === E_Show_Ip.Connect
          ? t('operation.cip')
          : show_ip.id === E_Show_Ip.Custom
          ? t('operation.zdhip')
          : t('operation.dkgs')
      }}</div>
      <DownOutlined />
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { E_Show_Ip } from './type';
  import { useI18n } from 'vue-i18n';
  import { DownOutlined } from '@ant-design/icons-vue';
  import ipSelect from './cmts/ipSelect';
  defineProps<{
    show_ip: {
      label: string;
      id: E_Show_Ip;
      c_id: number;
    };
    host_id: string;
  }>();
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
    .text {
      margin-right: 8px;
    }
  }
</style>
