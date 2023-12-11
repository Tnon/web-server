<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 10:58:09
 * @LastEditTime: 2023-03-09 16:09:29
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
  import { getRuleStatic } from '@/api/reinforce';
  const { t } = useI18n();

  const modelView = reactive<{ [k: string]: I_Rule_Node }>({
    monitored_rule: {
      icon: '#ax-cl-wjbh-monitorrules',
      count: 0,
      extra: [
        {
          title: t('reinforce.csurule'),
          count: 0,
        },
        {
          title: t('reinforce.rzgz'),
          count: 0,
        },
      ],
    },
    monitored_host: {
      icon: '#ax-cl-wjbh-monitorhost',
      count: 0,
    },
    monitored_file: {
      icon: '#ax-cl-wjbh-Monitorfile',
      count: 0,
    },
    protected_file: {
      icon: '#ax-cl-wjbh-protectfile',
      count: 0,
    },
  });
  //获取数据
  const getStaticCount = async () => {
    const {
      //自定义规则
      custom_rule = 0,
      //预制规则
      preset_rule = 0,
      //受监控主机
      monitored_host = 0,
      //受监控文件
      monitored_file = 0,
      //受保护文件
      protected_file = 0,
    } = await getRuleStatic();
    modelView.monitored_rule.count = custom_rule + preset_rule;
    modelView.monitored_rule.extra![0].count = custom_rule;
    modelView.monitored_rule.extra![1].count = preset_rule;
    modelView.monitored_host.count = monitored_host;
    modelView.monitored_file.count = monitored_file;
    modelView.protected_file.count = protected_file;
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
