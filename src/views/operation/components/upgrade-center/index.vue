<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 16:41:06
 * @LastEditTime: 2023-02-24 19:32:11
-->
<template>
  <div class="container">
    <!-- 客户端和服务端 start -->
    <agent-server-upload
      :refreshMethods="refreshMethods"
      :closeModal="closeModal"
      :open="open"
      ref="AgentServerRef"
    />
    <!-- 客户端和服务端 end -->

    <!-- 引擎库上传 start -->
    <engine-upload :refreshMethods="refreshMethods" ref="engineRef" />
    <!-- 引擎库上传 end -->
  </div>
</template>

<script setup lang="ts">
  import { ref, unref } from 'vue';
  import agentServerUpload from './cmts/agent-server-upload';
  import engineUpload from './cmts/engine-upload';

  defineProps({
    refreshMethods: Function,
    closeModal: Function,
    open: Boolean,
  });
  const AgentServerRef = ref(),
    engineRef = ref();
  const refreshPackgeMsg = () => {
    unref(AgentServerRef).refreshServerAgentMsg();
    unref(engineRef).refreshEngineMsg();
  };
  defineExpose({ refreshPackgeMsg });
</script>

<style scoped lang="less">
  .container {
    padding-bottom: 20px;
  }
  .header {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    line-height: 24px;
    padding-top: 16px;
  }
</style>
