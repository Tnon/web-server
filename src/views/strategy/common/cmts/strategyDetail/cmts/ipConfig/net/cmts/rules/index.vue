<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:25:44
 * @LastEditTime: 2022-10-12 13:54:04
-->
<template>
  <div>
    <!-- {{ strategyDetal }} -->
    <template v-for="(item, key) in strategyDetal" :key="key">
      <!-- 目录配置 start -->
      <rule-textarea
        :state="item"
        :ref="
          (el) => {
            textInputs[key] = el;
          }
        "
        :enabled="item['enabled']"
        :fileName="staticState[key]['title']"
        :placeholder="staticState[key]['placeholder']"
        :max="staticState[key]['max']"
        :type="key"
      >
        <template #title>{{ staticState[key]['title'] }}</template>
        <template #subtitle> {{ staticState[key]['subTitle'] }}</template>
      </rule-textarea>
      <!-- 目录配置 end -->
    </template>
  </div>
</template>

<script setup lang="ts">
  import ruleTextarea from '@/components/ruleTextarea';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';

  defineProps({
    strategyDetal: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  //静态结构体
  const staticState = {
    //自定义网卡
    net: {
      placeholder: t('strategy.netnmplac') + '\nvirbr \nbond0 \nbond1',
      max: 3000,
      title: t('strategy.netnm'),
      subTitle: t('strategy.netnmsub'),
    },
  };
  //refs
  const textInputs = ref<any>([]);
  //抛出
  defineExpose({ textInputs });
</script>
