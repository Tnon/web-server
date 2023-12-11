<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 10:47:15
 * @LastEditTime: 2023-08-03 14:03:41
-->
<template>
  <div class="ntype">
    <div class="title">{{ t('operation.tzfssz') }}</div>
    <template v-for="(item, index) in alarmTypes" :key="item.type">
      <notice-node
        :ref="
          (el) => {
            noticeRefs[index] = el;
          }
        "
        :emailSmsResult="emailSmsResult"
        v-if="acdr_enabled || item.type !== E_NoticeType.Event"
        :node-static="item"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { E_NoticeType, I_NoticeStatic } from './type';
  import noticeNode from './cmts/notice-node';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { E_ValidateResult } from '../notice-head/type';
  defineProps<{
    emailSmsResult: E_ValidateResult;
  }>();
  const { t } = useI18n();
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const alarmTypes = ref<I_NoticeStatic[]>([
    {
      title: t('menu.attack'),
      type: E_NoticeType.Alarm,
      sms: true,
      email: true,
      icon: '#ax-Mnav-risk',
      tips: t('operation.gjtips'),
    },
    {
      title: t('menu.ngav'),
      type: E_NoticeType.Event,
      sms: false,
      email: true,
      icon: '#ax-Mnav-attack',
      tips: t('operation.sjtips'),
    },
    {
      title: t('reinforce.filep'),
      type: E_NoticeType.Filemonitor,
      sms: false,
      email: true,
      icon: '#ax-cl-wjbh-protectfile',
      tips: t('operation.fitips'),
    },
    {
      title: t('reinforce.baitp'),
      type: E_NoticeType.Baitfile,
      sms: false,
      email: true,
      icon: '#ax-nav-cl-BaitFile',
      tips: t('operation.batips'),
    },
    {
      title: t('operation.xtjk'),
      type: E_NoticeType.Sysmonitor,
      sms: false,
      email: true,
      icon: '#ax-cl-wjbh-monitorrules',
      tips: t('operation.xitips'),
    },
  ]);

  const noticeRefs = ref<any>([]);
  //刷新
  const refreshNoticeNode = () => {
    unref(noticeRefs).forEach((ele) => {
      unref(ele).getSmsEmailCfg();
    });
  };
  defineExpose({ refreshNoticeNode });
</script>

<style scoped lang="less">
  .ntype {
    margin-top: 32px;
    height: calc(100vh - 170px);
    overflow: auto;
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }
  }
</style>
