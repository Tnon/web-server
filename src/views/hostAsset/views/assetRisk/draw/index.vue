<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-12 12:02:18
 * @LastEditTime: 2023-11-01 13:46:28
-->
<template>
  <div>
    <!-- 抽屉头部title和标签 start -->
    <drawer-header
      :account="state.detailData.cve_code"
      :vul_category="state.detailData.vul_category"
      :level="state.detailData.level"
    />
    <!-- 抽屉头部title和标签 end -->

    <!-- 详情描述 start -->
    <detail-description :detailData="state.detailData" :host_id="host_id" />
    <!-- 详情描述 end -->

    <!-- 雷达图 start -->
    <radar-chart :cvssData="state.cvss" :level="state.detailData.level" />
    <!-- 雷达图 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import drawerHeader from './drawerHeader';
  import detailDescription from './detailDescription';
  import radarChart from './radarChart';
  import { getDrawerData } from '@/api/asset/assetRisk/kernelvul';
  import { cvssType, detailType } from './type';

  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    host_id: {
      type: String,
    },
  });

  const state = reactive<{ cvss: cvssType; detailData: detailType }>({
    cvss: {
      score: '0', // 评分，后端返回的是字符串格式
      version: 2.0, // 版本，默认2.0版本
    },
    detailData: {
      cve_code: '', // 漏洞编号
      description: '', // 漏洞描述
      level: 0, // 危险等级
      platforms: '-',
      proposal: '', // 修复建议
      refs: [], // 参考链接
      scope: [], // 受影响系统、版本
      title: '',
      vul_category: '',
      verify_type: 1, // 检出方式
      current_version: [],
      related_info: [],
    },
  });
  // 获取抽屉中的数据
  const getDetailDrawer = async () => {
    const { cvss, ...detailData } = await getDrawerData({
      vul_id: props.record.vul_id + '',
      host_id: props.host_id,
    });
    Object.assign(state.cvss, cvss);
    Object.assign(state.detailData, detailData);
  };
  getDetailDrawer();
</script>

<style scoped></style>
