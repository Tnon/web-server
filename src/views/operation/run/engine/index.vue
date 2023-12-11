<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2023-07-24 15:33:59
-->
<template>
  <div class="container">
    <div class="title">{{ t('operation.clientengine') }}</div>
    <template v-for="(item, key) in clientEngines" :key="key">
      <server-engine-cmt
        v-if="acdr_enabled || key !== ClientEngine.ACDR"
        :refresh="getVersions"
        :nodeProps="item"
        :id="key"
      />
    </template>
    <div class="title">{{ t('operation.serverengine') }}</div>
    <template v-for="(item, key) in serverEngines" :key="key">
      <server-engine-cmt :refresh="getVersions" :nodeProps="item" :id="key" />
      <!-- {{ index }} -->
    </template>
  </div>
</template>

<script setup lang="ts">
  import serverEngineCmt from './components/serverEngine';
  import { computed, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getserEngineVersions } from '@/api/operation/run';
  import { ServerEngine, ClientEngine } from '@/enums/engine';
  import { useProductLogo } from '@/store/modules/product-logo';
  const { t } = useI18n();
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const serverEngines = reactive({
    [ServerEngine.YARA]: {
      switchable: true,
      enabled: true,
      desc: 'yara',
      version: '-',
      op_time: '-',
      iconType: '#ax-engine-Yara',
      flag: ['webshell'],
    },
    [ServerEngine.CLAMAVWS]: {
      switchable: true,
      enabled: true,
      desc: 'clamav',
      version: '-',
      op_time: '-',
      iconType: '#ax-engine-ClamAV',
      flag: ['webshell'],
    },
    [ServerEngine.WEBSHELL]: {
      switchable: true,
      enabled: true,
      desc: 'webshell',
      version: '-',
      op_time: '-',
      iconType: '#ax-engine-Webshell',
      flag: ['webshell'],
    },
    [ServerEngine.AVIRA]: {
      switchable: true,
      enabled: true,
      desc: 'avira',
      version: '-',
      op_time: '-',
      iconType: '#ax-S-Aviraxiaohongsan',
      flag: [t('operation.virusmm')],
    },
    [ServerEngine.CLAMAVVIR]: {
      switchable: true,
      enabled: true,
      desc: 'clamavvirus',
      version: '-',
      op_time: '-',
      iconType: '#ax-engine-ClamAV',
      flag: [t('operation.virusmm')],
    },
    // 漏洞扫描,后端要求key设置的大一些,最终约定为100
    [ServerEngine.VULNERABILITY]: {
      switchable: false,
      enabled: true,
      desc: 'vultyScan',
      version: '-',
      op_time: '-',
      iconType: '#ax-engine-ClamAV',
      flag: [t('operation.vultyScan')],
    },
    [ServerEngine.BASELINERULE]: {
      switchable: true,
      enabled: true,
      desc: 'baselinerule',
      version: '-',
      op_time: '-',
      iconType: '#ax-icon_yinqing-baseline',
      flag: [t('operation.jxjc')],
    },
    [ServerEngine.SECPATCH]: {
      switchable: true,
      enabled: true,
      desc: 'secpatcheng',
      version: '-',
      op_time: '-',
      iconType: '#ax-icon_yinqing-S-anquanbudingyinqing',
      flag: [t('reinforce.secpatch')],
    },
    [ServerEngine.RISKCHECK]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'riskcheck',
      iconType: '#ax-icon_yinqing-riskdetection',
      flag: [t('operation.fxjc')],
    },
    // bug: {
    //   enabled: 2,
    //   version: '-',
    //   op_time: '-',
    //   iconType: '#ax-S-ziyanloudongyinqing',
    //   flag: [t('operation.virusmm')],
    // },
  });
  const clientEngines = reactive({
    // NGAV/ACDR
    [ClientEngine.ACDR]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'acdr',
      iconType: '#ax-S-ACDR',
      flag: [t('operation.unknownThreat')], // 右上标签
    },
    [ClientEngine.HASH]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'hash',
      iconType: '#ax-engine-hash',
      flag: [t('operation.virusmm')],
    },
    [ClientEngine.BASELINE]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'baseline',
      iconType: '#ax-S-yujiancejixian',
      flag: [t('operation.virusmm')],
    },
    [ClientEngine.RASP]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'rasp',
      iconType: '#ax-icon_yinqing-RASP',
      flag: ['RASP'],
    },
    [ClientEngine.BASELINERULE]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'baselinerule',
      iconType: '#ax-icon_yinqing-baseline',
      flag: [t('operation.jxjc')],
    },
    [ClientEngine.RISKCHECK]: {
      version: '-',
      op_time: '-',
      enabled: true,
      desc: 'riskcheck',
      iconType: '#ax-icon_yinqing-riskdetection',
      flag: [t('operation.fxjc')],
    },
  });
  const getVersions = async () => {
    const { client, server } = await getserEngineVersions();
    for (let k in serverEngines) {
      serverEngines[k]['switchable'] = server[k]?.['switchable'] ?? true;
      serverEngines[k]['enabled'] = server[k]?.['enabled'] ?? false;
      serverEngines[k]['version'] = server[k]?.['version'] ?? '-';
      serverEngines[k]['op_time'] = server[k]?.['op_time'] ?? '-';
    }

    for (let k in clientEngines) {
      clientEngines[k]['version'] = client[k]?.['version'] ?? '-';
      clientEngines[k]['op_time'] = client[k]?.['op_time'] ?? '-';
    }
  };
  getVersions();
</script>

<style scoped lang="less">
  .title {
    font-size: @fz16;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    line-height: 24px;
    margin-top: 16px;
  }
  .container {
    height: calc(100vh - 83px);
    overflow: auto;
  }
</style>
