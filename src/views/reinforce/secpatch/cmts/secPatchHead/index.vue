<template>
  <!-- 头部 start -->
  <div class="header">
    <!-- 补丁数量 start -->
    <div class="patchNum">
      <span>{{ t('reinforce.bdsl') }}：</span>
      <countTo :endVal="patchCount" />
    </div>
    <!-- 补丁数量 start -->

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
      <!-- 高级筛选 start -->
      <advanSearch class="filters" :params="agms" @confirm="btnConfirm" />
      <!-- 高级筛选 end -->
      <!-- 切换视图 start -->
      <a-button type="text" class="swt_view" @click="switchView">
        <template #icon><WalletOutlined /></template>
        {{ t('asset.swtView') }}
      </a-button>
      <!-- 切换视图 end -->
      <!-- 一键扫描 start -->
      <a-button
        type="primary"
        @click="scanPatch"
        class="scan"
        :loading="scanStatus === E_Scan_Status.Scaning"
        :disabled="scanStatus === E_Scan_Status.Scaning"
        v-permission="{
          name: 'reinforceyjsm',
          showUsers: [USERTOKEN.admin, USERTOKEN.super],
        }"
      >
        {{ scanStatus === E_Scan_Status.Scaning ? t('reinforce.smz') : t('reinforce.yjsm') }}
      </a-button>
      <!-- 一键扫描 end -->
      <div class="line"></div>
      <!-- 导出 start -->
      <export-data api="/api/report/patch/assetview" :params="agms" />
      <!-- 导出 end -->
    </div>
  </div>
  <!-- 头部 end -->
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { I_Sec_Filter } from '../../type';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import exportData from '@/components/exportData';
  import advanSearch from '../advanSearch';
  import { USERTOKEN } from '@/store/modules/user/type';
  import { useModal } from '@/hooks';
  import { createVNode, onMounted, onUnmounted, ref } from 'vue';
  import scanModal from './cmts/scanModal';
  import { useRouter } from 'vue-router';
  import { scanPatchAll, getScaStaApi } from '@/api/reinforce';
  import { E_Scan_Result, E_Scan_Status } from './type';
  import { message } from 'ant-design-vue';
  const props = defineProps<{
    agms: I_Sec_Filter;
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
  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(props.agms, v);
    props.refreshTable();
  };
  //一键扫描
  const scanPatch = () => {
    useModal(
      {
        title: t('reinforce.lksm'),
        handleOk: async () => {
          const { code, status } = await scanPatchAll();
          if (!code) {
            if (status === E_Scan_Result.Scaning) {
              message.warn(t('reinforce.scaning'));
            } else if (status === E_Scan_Result.Success) {
              message.success(t('reinforce.scansuc'));
              scanStatus.value = E_Scan_Status.Scaning;
              intervalGetStatus();
            }
          }
        },
      },
      createVNode(scanModal),
    );
  };
  const router = useRouter();
  //切换视图
  const switchView = () => {
    router.push({
      name: 'reinforce-layout-secpatch-host',
    });
  };
  let timer: any = 0;
  //扫描状态
  const scanStatus = ref<E_Scan_Status>(E_Scan_Status.Complete);

  const getScanStatus = async () => {
    const { code, status } = await getScaStaApi();
    if (!code) {
      scanStatus.value = status;
      if (status === E_Scan_Status.Complete || status === E_Scan_Status.Error) {
        clearInterval(timer);
      }
    } else {
      clearInterval(timer);
    }
  };
  getScanStatus();

  const intervalGetStatus = () => {
    timer = setInterval(() => {
      getScanStatus();
    }, 5000);
  };
  onMounted(() => {
    intervalGetStatus();
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
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
      }
      .swt_view {
        margin-right: 8px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
      .scan {
        margin-right: 16px;
      }
    }
  }
  .line {
    width: 1px;
    height: 16px;
    background: #e1e1e1;
    margin-right: 16px;
  }
</style>
