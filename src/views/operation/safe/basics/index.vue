<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-03 17:04:43
 * @LastEditTime: 2023-05-11 11:51:29
-->
<template>
  <div class="container">
    <!-- agent卸载密码校验 start -->
    <agentUninstall />
    <!-- agent卸载密码校验 end -->

    <!-- acl start -->
    <acl-control class="cardCon" />
    <!-- acl end -->

    <!-- pwd start -->
    <pwd-lock />
    <!-- pwd end -->

    <!-- login start -->
    <login-expire />
    <!-- login end -->
  </div>
</template>

<script setup lang="ts">
  import agentUninstall from './cmts/agent-uninstall';
  import aclControl from './cmts/acl-control';
  import pwdLock from './cmts/pwd-lock';
  import loginExpire from './cmts/login-expire';
</script>

<style scoped lang="less">
  .container {
    padding: 0 24px 16px 24px;
    overflow: auto;
    height: 100vh;
  }
</style>
