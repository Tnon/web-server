<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:25:44
 * @LastEditTime: 2022-10-12 14:46:18
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
    regex: {
      title: t('strategy.regTit'),
      subTitle: t('strategy.regSb'),
      placeholder:
        t('strategy.regPla') +
        `
  \\d+(68)
  ^(?!password)(?!12345)`,
      max: 3000,
    },
    set: {
      title: t('strategy.wpwdDi'),
      subTitle: t('strategy.wpwPlp'),
      placeholder:
        t('strategy.accPlace') +
        `
  abc
  abc@abc.com`,
      max: 3000,
    },
  };
  //refs
  const textInputs = ref<any>([]);
  //抛出
  defineExpose({ textInputs });
</script>
