<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:25:44
 * @LastEditTime: 2022-09-20 12:12:09
-->
<template>
  <div>
    <!-- 登录IP start -->
    <template v-for="(item, key) in strategyDetal" :key="key">
      <template v-if="key === 'timeObj'">
        <rule-time ref="ruleTimeRef" :state="item" />
      </template>
      <template v-else>
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
      </template>
    </template>
    <!-- 登录IP end -->
  </div>
</template>

<script setup lang="ts">
  import ruleTextarea from '@/components/ruleTextarea';
  import ruleTime from '../ruleTime';
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
    //登录IP
    'ip-pattern': {
      placeholder:
        t('strategy.ipPlace') +
        `
192.168.1.0 
192.168.1.0/24
192.168.1.0-192.168.1.20`,
      max: 3000,
      title: t('strategy.logIp'),
      subTitle: t('strategy.loginIpSb'),
    },
    //登录账号
    'account-pattern': {
      placeholder: t('strategy.actPlace') + '\nTom \nDelevin',
      max: 3000,
      title: t('strategy.logAcc'),
      subTitle: t('strategy.accSb'),
    },
  };
  //refs
  const textInputs = ref<any>([]);
  const ruleTimeRef = ref<any>();
  //抛出
  defineExpose({ textInputs, ruleTimeRef });
</script>
