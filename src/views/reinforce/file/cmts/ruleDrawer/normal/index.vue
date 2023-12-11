<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-07-24 16:00:09
-->
<template>
  <div class="content">
    <!-- header content start -->
    <draw-header
      :tags="reState.tags"
      :level="record.level"
      :description="record.desc"
      :handled="record.handled"
      :refreshTable="refreshTable"
      :closeDraw="closeDraw"
      :handle="record.handle"
      :id="record.id"
    />
    <!-- header content end -->

    <!-- footer start -->
    <draw-footer :dataSource="reState.dataSource" :id="record.id" :handle="record.handle" />
    <!-- footer end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import drawHeader from './header';
  import drawFooter from './footer';
  import { getAlarmDrawDetail } from '@/api/reinforce';
  import { E_Reinforce_Type } from '../../tableContent/type';
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    refreshTable: {
      type: Function,
    },
    closeDraw: {
      type: Function,
    },
  });

  //返回值结构体
  const reState = reactive<any>({
    //风险/攻击 全路径
    tags: [],
    //其他
    dataSource: {},
  });
  // 获取详情信息
  const getDetaiMsg = async () => {
    const { op_name, ...dataSource } = await getAlarmDrawDetail({
      filter: {
        id: props.record.id,
        handle: props.record.handle,
        risk_type: E_Reinforce_Type.File,
      },
      page: {
        page_index: -1,
        page_size: 0,
      },
    });
    reState.tags = [op_name];
    //tabs信息
    reState.dataSource = dataSource;
  };
  getDetaiMsg();
</script>
<style lang="less" scoped>
  .content {
    padding: 0 24px;
  }
</style>
