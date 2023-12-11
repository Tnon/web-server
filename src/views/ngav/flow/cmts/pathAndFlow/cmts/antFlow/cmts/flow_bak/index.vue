<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-24 16:22:51
 * @LastEditTime: 2023-02-28 11:48:10
-->
<template>
  <div class="flowContainer" id="mountNode"> </div>
</template>

<script setup lang="ts">
  import { getNgavGraghData, getNgavGraghTimelineDataStatus } from '@/api/ngav';
  import { PathCi, NgavType } from '@/views/ngav/flow/type';
  import { onMounted, PropType, ref, watchEffect } from 'vue';
  import { renderNGAV } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/renderNgav';
  const props = defineProps({
    selectedCiInfo: {
      type: Object as PropType<PathCi>,
      required: true,
    },
    flowLoading: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(['update:flowLoading']);
  //画布实例
  const graphInstance = ref<any>();
  const getNgavData = async (detail_id) => {
    emit('update:flowLoading', true);
    const data = await getNgavGraghData({
      detail_id,
    });
    emit('update:flowLoading', false);

    //手动ip和进程节点loading
    data.nodes.forEach((ele, index) => {
      if (index) {
        ele.status = 0;
      }
    });
    graphInstance.value.clear();
    graphInstance.value.data(data);
    graphInstance.value.render();
    //请求状态的接口
    const { status_type } = await getNgavGraghTimelineDataStatus({
      detail_id,
      flag: NgavType.Flow,
    });
    if (status_type && status_type.length) {
      //从第二个开始更新
      status_type.forEach((ele, index) => {
        data.nodes[index + 1].status = ele;
      });
    }
    graphInstance.value.refresh();
  };
  watchEffect(() => {
    props.selectedCiInfo.detail_id !== -1 && getNgavData(props.selectedCiInfo.detail_id);
  });
  //先获取画布实例
  onMounted(() => {
    graphInstance.value = renderNGAV({ nodes: [], edges: [] }, props.selectedCiInfo);
  });
</script>

<style scoped lang="less">
  .flowContainer {
    width: 100%;
    height: calc(100vh - 200px);
    position: relative;
    padding: 0 16px;
  }
</style>
