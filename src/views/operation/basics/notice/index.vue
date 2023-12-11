<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 09:56:18
 * @LastEditTime: 2023-08-03 14:03:57
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <notice-head
      v-if="usePermission([USERTOKEN.admin, USERTOKEN.super])"
      v-model:emailSmsResult="emailSmsResult"
      :refreshNoticeType="refreshNoticeType"
    />
    <!-- 头部 end -->

    <!-- 通知方式设置 start -->
    <notice-type :emailSmsResult="emailSmsResult" ref="noticeTypeRef" />
    <!-- 通知方式设置 end -->
  </div>
</template>

<script setup lang="ts">
  import noticeHead from './cmts/notice-head';
  import noticeType from './cmts/notice-type';
  import { USERTOKEN } from '@/store/modules/user/type';
  import { usePermission } from '@/hooks/use-permission';
  import { E_ValidateResult } from './cmts/notice-head/type';
  import { ref, unref } from 'vue';
  //配置情况
  const emailSmsResult = ref(E_ValidateResult.None);

  //刷新方法
  const noticeTypeRef = ref();
  const refreshNoticeType = () => {
    unref(noticeTypeRef).refreshNoticeNode();
  };
</script>

<style scoped lang="less">
  .container {
    padding: 24px;
  }
</style>
