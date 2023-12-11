<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-18 14:50:21
 * @LastEditTime: 2023-07-27 17:30:03
-->
<template>
  <div class="con">
    <!-- 头部 start-->
    <flow-header
      v-model:viewIsFlow="viewIsFlow"
      :rule_name="state.rule_name"
      :root_name="state.root_name"
      :score="state.score"
      :sub_rule_name="state.sub_rule_name"
      :level="state.level"
      :record="record"
      :handle="~~handle"
      :get-record="getRecord"
    />
    <!-- 头部 end -->
    <!-- 攻击路径/次数 g6图 start -->
    <path-and-flow
      :select_options="state.select_options"
      :act_path_sha256="act_path_sha256"
      :viewIsFlow="viewIsFlow"
      :record="record"
      :getRecord="getRecord"
    />
    <!-- 攻击路径/次数 g6图 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import flowHeader from './cmts/header';
  import pathAndFlow from './cmts/pathAndFlow';
  import { getNgavSimpleRecord, getRowInfoByIdHandle } from '@/api/ngav';
  import { SourceState } from './type';
  // 行记录跳转携带参数
  const {
    query: { id, handle },
    params: { act_path_sha256 },
  } = useRoute() as any;
  //视图是否是流程图
  const viewIsFlow = ref<boolean>(true);
  //头部/路径等结构体
  const state = reactive<SourceState>({
    //类型（恶意进程）
    rule_name: '',
    //类型的名称
    root_name: '',
    //细分类型
    sub_rule_name: '',
    //分数
    score: 0,
    //危险等级
    level: '',
    //下拉框的数据（攻击路径A、B、C）
    select_options: [],
  });
  // 获取所有信息
  const getRowInfo = async () => {
    const { code, list, ...resState } = await getRowInfoByIdHandle({
      filter: { handle: ~~handle, id },
    });
    if (code) {
      return;
    }
    Object.assign(state, { ...resState, select_options: list });
  };
  getRowInfo();

  //根据handle和id查询当前行信息
  const record = ref<any>({});
  //获取行信息
  const getRecord = async () => {
    const { items } = await getNgavSimpleRecord({ id, handle: ~~handle });
    record.value = items[0];
  };
  getRecord();
</script>

<style scoped lang="less">
  .con {
    display: flex;
    flex-direction: column;
  }
</style>
