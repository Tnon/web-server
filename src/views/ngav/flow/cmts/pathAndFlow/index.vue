<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-21 11:08:10
 * @LastEditTime: 2023-07-13 10:30:45
-->
<template>
  <div class="content">
    <!-- 攻击路径和 start -->
    <attack-path
      v-model:seletedPathSha256="seletedPathSha256"
      :select_options="select_options"
      :selectedCiInfo="selectedCiInfo"
    />
    <!-- 攻击路径和攻击次数 end -->
    <div class="maxContent">
      <div class="child" :style="{ minWidth: containerWidth + 'px' }">
        <!-- <div class="shadows"></div> -->
        <!-- 攻击阶段时间轴 start -->
        <attack-timeline
          v-model:roadWidth="roadWidth"
          v-model:containerWidth="containerWidth"
          :viewIsFlow="viewIsFlow"
          :selectedCiInfo="selectedCiInfo"
        >
          <template #default>
            <!-- 攻击次数 start -->
            <attackCi
              :seletedPathSha256="seletedPathSha256"
              :select_options="select_options"
              :selectedCiInfo="selectedCiInfo"
            />
            <!-- 攻击次数 end -->
          </template>
        </attack-timeline>
        <!-- 攻击阶段时间轴 start -->

        <!-- 流程图和时间轴 start -->
        <ant-flow
          :roadWidth="roadWidth"
          :selectedCiInfo="selectedCiInfo"
          :viewIsFlow="viewIsFlow"
          :record="record"
          :getRecord="getRecord"
        />
        <!-- 流程图和时间轴 end -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, reactive, ref, watchEffect } from 'vue';
  import attackPath from './cmts/attackPath';
  import antFlow from './cmts/antFlow';
  import attackCi from './cmts/attackCi';
  import attackTimeline from './cmts/attackTimeline';
  import { SelectOption, PathCi } from '@/views/ngav/flow/type';
  const props = defineProps({
    //攻击路径和每个路径的攻击次数
    select_options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    viewIsFlow: {
      type: Boolean,
      required: true,
    },
    act_path_sha256: {
      type: String,
    },
    record: {
      type: Object,
      required: true,
    },
    getRecord: {
      type: Function,
      required: true,
    },
  });

  //单个涌道的宽度
  const roadWidth = ref(320);
  //最小总宽度
  const containerWidth = ref(0);

  //选中的攻击路径
  const seletedPathSha256 = ref('');

  // 当前次数的开始时间，结束时间，持续时间
  const selectedCiInfo = reactive<PathCi>({
    //第几次的文案
    seletedCiText: '',
    //第几次的开始时间
    start_time: '',
    //第几次的结束时间
    end_time: '',
    //第几次的持续时间
    duration: 0,
    //第几次的id //-1标记初始化
    detail_id: -1,
  });

  //默认选中下拉框的第一条路径
  watchEffect(() => {
    if (props.select_options && props.select_options.length) {
      //外部选择了酒用外部的，没选择酒用第一个
      seletedPathSha256.value = props.act_path_sha256
        ? props.act_path_sha256
        : props.select_options[0].act_path_sha256;
    }
  });
</script>

<style scoped lang="less">
  .content {
    height: calc(100vh - 56px - 16px);
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    .maxContent {
      width: 100%;
      overflow: auto;
      .child {
        position: relative;
      }
    }
  }
</style>
