<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 17:32:18
 * @LastEditTime: 2023-03-02 15:13:04
-->
<template>
  <div>
    <template v-if="nodeInfo">
      <!-- 主机类型 start -->
      <hostView v-if="nodeInfo!.icon === NodeIcon.Host" :nodeInfo="nodeInfo!" />
      <!-- 主机类型 end -->

      <!-- 网络类型 start -->
      <net-view v-else-if="nodeInfo!.icon === NodeIcon.Ip" :nodeInfo="nodeInfo!" />
      <!-- 网络类型 end -->

      <!-- 进程类型 start -->
      <process-view
        v-else
        :nodeInfo="nodeInfo!"
        :detail_id="detail_id"
        :proc_fail_reason="proc_fail_reasonNode"
        :policy_status="policy_statusNode"
        :dispose_result="dispose_resultNode"
      />
      <!-- 进程类型 end -->
    </template>
  </div>
</template>

<script setup lang="ts">
  import { NodeIcon, Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { ref } from 'vue';
  import hostView from './cmts/hostView';
  import netView from './cmts/netView';
  import processView from './cmts/processView';
  import { getNodeInfoMsg } from '@/api/ngav';

  const props = defineProps({
    node_id: {
      type: String,
      required: true,
    },
    detail_id: {
      type: Number,
      required: true,
    },
    node_status: {
      type: Number,
      required: true,
    },
  });
  //节点的处置结果
  const dispose_resultNode = ref(0);
  //错误原因 节点
  const proc_fail_reasonNode = ref<any>();
  //当前处置策略
  const policy_statusNode = ref<string[]>([]);
  //根据nodeid和次数的id获取节点的信息
  const nodeInfo = ref<Node>();
  const getNodeInfo = async () => {
    const { nodes, dispose_result, proc_fail_reason, policy_status } = await getNodeInfoMsg({
      node_id: props.node_id,
      detail_id: props.detail_id,
      node_status: props.node_status,
    });
    dispose_resultNode.value = dispose_result;
    proc_fail_reasonNode.value = proc_fail_reason;
    policy_statusNode.value = policy_status ?? [];
    nodeInfo.value = nodes;
  };
  getNodeInfo();
</script>
