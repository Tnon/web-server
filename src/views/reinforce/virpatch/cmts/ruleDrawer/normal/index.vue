<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-06-05 14:40:19
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
    <draw-footer
      :dataSource="reState.dataSource"
      :id="record.id"
      :handle="record.handle"
      :record="record"
    />
    <!-- footer end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import drawHeader from './header';
  import drawFooter from './footer';
  import { getVirPatchAlarmDrawDetail } from '@/api/reinforce';
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
    const { ...dataSource } = await getVirPatchAlarmDrawDetail({
      filter: {
        id: props.record.id,
        handle: props.record.handle,
      },
      page: {
        page_index: -1,
        page_size: 0,
      },
    });
    // props.record.vul_desc
    reState.tags = [props.record.vul_name];
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
