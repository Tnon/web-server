<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 10:58:09
 * @LastEditTime: 2023-06-20 16:15:15
-->
<template>
  <div class="headerStatic">
    <template v-for="(item, key) in modelView" :key="key">
      <card-node :item="item" :type="key + ''" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import cardNode from '../cardNode';
  import { I_Rule_Node } from '../cardNode/type';
  import { getVirPatchStatic } from '@/api/reinforce';
  const { t } = useI18n();

  const modelView = reactive<{ [k: string]: I_Rule_Node }>({
    enable_vrl_patch: {
      icon: '#ax-cl-wjbh-monitorrules',
      count: 0,
      extra: [
        {
          title: t('asset.assetRiskkernel'),
          count: 0,
        },
        {
          title: t('asset.assetRiskweb'),
          count: 0,
        },
        // {
        //   title: t('reinforce.zjj'),
        //   count: 0,
        // },
        // {
        //   title: t('asset.database'),
        //   count: 0,
        // },
        {
          title: t('asset.assetRiskapp'),
          count: 0,
        },
        {
          title: t('asset.others'),
          count: 0,
        },
      ],
    },
    enabled_vrl_patch: {
      icon: '#ax-cl-wjbh-monitorhost',
      count: 0,
    },
  });
  //获取数据
  const getStaticCount = async () => {
    const {
      //操作系统
      kernel = 0,
      //web服务器
      web_server = 0,
      //中间件
      // middleware = 0,
      //数据库
      // database = 0,
      //应用
      app = 0,
      //其他
      other = 0,
      //已经启用
      enabled_vrl_patch = 0,
    } = await getVirPatchStatic();
    modelView.enable_vrl_patch.count = kernel + web_server + app;
    modelView.enable_vrl_patch.extra![0].count = kernel;
    modelView.enable_vrl_patch.extra![1].count = web_server;
    // modelView.enable_vrl_patch.extra![2].count = middleware;
    // modelView.enable_vrl_patch.extra![3].count = database;
    modelView.enable_vrl_patch.extra![2].count = app;
    modelView.enable_vrl_patch.extra![3].count = other;
    modelView.enabled_vrl_patch.count = enabled_vrl_patch;
  };
  getStaticCount();
</script>

<style scoped lang="less">
  .headerStatic {
    padding: 16px;
    display: flex;
    align-items: center;
  }
</style>
