<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-15 13:07:46
 * @LastEditTime: 2023-04-28 10:45:07
-->
<template>
  <!-- 头部 start -->
  <div class="header">
    <!-- 主机数量 start -->
    <div class="patchNum" @click="goBack">
      <LeftOutlined class="back" />
      <span>{{ t('reinforce.zjczdbd', [ip]) }}：</span>
      <countTo :endVal="patchCount" />
    </div>
    <!-- 主机数量 start -->

    <div class="tools">
      <!-- 搜索 start -->
      <a-input-search
        v-model:value.trim="agms.searchdata"
        :placeholder="t('reinforce.secplace')"
        class="searchIn"
        @search="onSearch"
        @change="onSearch"
      />
      <!-- 搜索 end -->
      <!-- 导出 start -->
      <export-data api="/api/report/patch/hostdetailview" :params="agms" />
      <!-- 导出 end -->
    </div>
  </div>
  <!-- 头部 end -->
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import { useRoute, useRouter } from 'vue-router';
  import { LeftOutlined } from '@ant-design/icons-vue';
  const props = defineProps<{
    agms: { searchdata: string };
    patchCount: number;
    refreshTable: Fn;
  }>();
  // 跳转携带参数
  const {
    query: { ip },
  } = useRoute() as any;
  const { t } = useI18n();
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      props.refreshTable();
    }
    if (!value && !e) {
      props.refreshTable();
    }
  };
  // 路由跳转
  const router = useRouter();
  const goBack = () => {
    router.go(-1);
  };
</script>

<style scoped lang="less">
  .header {
    flex: 48px 0 0;
    display: flex;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    .patchNum {
      font-size: @fz14;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 600;
      display: flex;
      align-items: center;
      cursor: pointer;
      .back {
        font-size: @fz14;
        margin-right: 8px;
      }
    }
    .tools {
      display: flex;
      align-items: center;
      .searchIn {
        width: 220px;
        border-radius: 8px;
        margin: 0 16px;
      }
      .swt_view {
        margin-right: 16px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
</style>
