<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-15 13:07:46
 * @LastEditTime: 2023-04-28 10:28:38
-->
<template>
  <!-- 头部 start -->
  <div class="header">
    <!-- 主机数量 start -->
    <div class="patchNum">
      <span>{{ t('reinforce.zjsl') }}：</span>
      <countTo :endVal="patchCount" />
    </div>
    <!-- 主机数量 start -->

    <div class="tools">
      <!-- 搜索 start -->
      <a-input-search
        v-model:value.trim="agms.searchdata"
        :placeholder="t('reinforce.hostpal')"
        class="searchIn"
        @search="onSearch"
        @change="onSearch"
      />
      <!-- 搜索 end -->
      <!-- 切换视图 start -->
      <a-button type="text" class="swt_view" @click="switchView">
        <template #icon><WalletOutlined /></template>
        {{ t('asset.swtView') }}
      </a-button>
      <!-- 切换视图 end -->

      <!-- 导出 start -->
      <export-data api="/api/report/patch/hostview" :params="agms" />
      <!-- 导出 end -->
    </div>
  </div>
  <!-- 头部 end -->
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import exportData from '@/components/exportData';
  import { useRouter } from 'vue-router';
  const props = defineProps<{
    agms: { searchdata: string };
    patchCount: number;
    refreshTable: Fn;
  }>();
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
  const router = useRouter();
  //切换视图
  const switchView = () => {
    router.push({
      name: 'reinforce-layout-secpatch',
    });
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
