<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-02-24 19:27:48
-->
<template>
  <div class="bk_br_sd content">
    <template v-for="item in agentDownload" :key="item">
      <div class="client">
        <!-- 标题 -->
        <div class="title">
          <span class="line"></span>
          <span>{{ item }} {{ t('setting.clintAAdL') }}</span>
        </div>

        <!-- windows/linux客户端 -->
        <client :osType="item" :formData="state[item]" :isShow="true" />

        <!-- 适配驱动库支持 -->
        <div class="title">
          <span class="line"></span>
          <span>{{ t('setting.adaDlSpt') }}</span>
        </div>
        <slots-table
          class="dataTable"
          rowKey="name"
          :columns="columns"
          :get-list-func="getDriverList"
          :scroll="{ y: 'calc(100vh - 617px)' }"
          :arguments="getAgms(item)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useColumns } from './index';
  import client from '../download/client/index.vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getDriverList } from '@/api/product';
  import { getPkgVer } from '@/api/operation/upgrade';
  import { useI18n } from 'vue-i18n';
  import { OSTYPE } from '@/enums/assetsType';

  const { t } = useI18n();
  const columns = useColumns(t);
  // 屏蔽windows
  // const agentDownload = ['Windows', 'Linux'];
  const agentDownload = ['Linux'];

  //工厂函数给表格传参
  const getAgms = (osver) => {
    const agms: any = {};
    agms.osver = osver === 'Windows' ? OSTYPE.WINDOWS : OSTYPE.LINUX;
    return agms;
  };
  //版本信息
  const state = reactive<{ Windows: any; Linux: any }>({
    Windows: {},
    Linux: {},
  });

  //获取版本信息
  const getPackageVersions = async () => {
    // 屏蔽windows
    // {windows}
    const { linux } = await getPkgVer();
    // 屏蔽windows
    // state.Windows = windows ?? {};
    state.Linux = linux ?? {};
  };
  getPackageVersions();
</script>

<style lang="less" scoped>
  .content {
    width: 1280px;
    margin: 16px auto;
    display: flex;
    height: calc(100vh - 38px);
    overflow-y: auto;
    overflow-x: hidden;
    .client {
      padding: 24px 40px;
      width: 100%;
      border-right: 1px solid #eee;
      .title {
        font-size: @fz14;
        font-weight: 600;
        .line {
          width: 4px;
          height: 16px;
          display: inline-block;
          background: #18ba79;
          border-radius: 8px;
          margin-right: 16px;
        }
      }
      .dataTable {
        margin-top: 16px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
</style>
