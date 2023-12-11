<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 17:41:32
 * @LastEditTime: 2022-10-11 10:51:02
-->
<template>
  <div class="fileContent">
    <template v-if="behaviorNode.file_content && behaviorNode.file_content.length">
      <viewFileTitle :nodeInfo="nodeInfo" :behaviorNode="behaviorNode" />
      <template v-for="(item, index) in behaviorNode.file_content" :key="item">
        <viewFileContent
          :fileName="behaviorNode.file_name[index]"
          :filePath="item"
          :fileStatus="fileStatus[index] ?? 0"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import viewFileTitle from '../viewFileTitle';
  import viewFileContent from '../viewFileContent';
  import {
    Behavior,
    FileStatus,
    Node,
  } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { PropType, ref } from 'vue';
  import { getNgavGraghTimelineDataStatus } from '@/api/ngav';
  const props = defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
    behaviorNode: {
      type: Object as PropType<Behavior>,
      required: true,
    },
    detail_id: {
      type: Number,
      required: true,
    },
  });
  //文件状态 /1存在 2不存在 3失败
  const fileStatus = ref<FileStatus[]>([]);

  const getFileStatus = async () => {
    const { file_status_type } = await getNgavGraghTimelineDataStatus({
      detail_id: props.detail_id,
      file_path: props.behaviorNode.file_content,
    });
    fileStatus.value = file_status_type;
  };
  getFileStatus();
</script>

<style scoped lang="less">
  .fileContent {
    margin-bottom: 30px;
  }
</style>
