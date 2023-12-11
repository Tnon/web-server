<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:25:44
 * @LastEditTime: 2022-09-20 11:49:27
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
    //自定义目录
    'path-custom': {
      placeholder: t('strategy.pathPlac') + '\n/usr/share/nginx \n/var/www/myweb',
      max: 100,
      title: t('strategy.custmPh'),
      subTitle: t('strategy.custmSubt'),
    },
    //扫描路径
    'path-ignore': {
      placeholder: t('strategy.ignPlac') + '\n/usr/share/nginx/myfile \n/var/www/myweb/test1',
      max: 100,
      title: t('strategy.ignpt'),
      subTitle: t('strategy.ignptsub'),
    },
  };
  //refs
  const textInputs = ref<any>([]);
  //抛出
  defineExpose({ textInputs });
</script>
