<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:57
 * @LastEditTime: 2023-07-27 14:22:35
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <div class="nodes" @click="refreshMethod"> {{ t('operation.refresh') }} </div>
        <div class="line"></div>
        <div class="nodes" @click="viewUnadpList"> {{ t('operation.viewUnadList') }} </div>
        <export-data class="nodes" api="/api/report/noadaptedlist" :params="agms">
          <span c>{{ t('operation.downUnadList') }}</span>
        </export-data>
        <div class="nodes" @click="scanHostAll"> {{ t('operation.zjfx') }} </div>
      </div>
    </template>
    <a-button type="text">
      <template #icon><EllipsisOutlined /></template>
    </a-button>
  </a-popover>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import uadpList from './cmts/unadpList';
  import { useI18n } from 'vue-i18n';
  import scanHost from './cmts/scanHost';
  import exportData from '@/components/exportData';
  import { ClientFilter } from '@/api/operation/model';
  import { PropType, createVNode } from 'vue';
  const { t } = useI18n();
  const props = defineProps({
    refreshTable: Function,
    refreshVersion: Function,
    agms: {
      type: Object as PropType<ClientFilter>,
      required: true,
    },
  });

  //刷新版本和表格
  const refreshMethod = () => {
    props.refreshTable!(true);
    props.refreshVersion!();
  };
  //查看未适配清单
  const viewUnadpList = () => {
    useModal(
      {
        title: t('operation.uadList'),
        wrapClassName: 'modalBodyNopad',
        footer: false,
        width: 1000,
      },
      uadpList,
    );
  };
  //主机发现
  const scanHostAll = () => {
    useModal(
      {
        title: t('operation.zjfx'),
        subtitle: t('operation.zjfxsub'),
        wrapClassName: 'noheadModal',
        width: 1200,
        footer: false,
      },
      createVNode(scanHost),
    );
  };
  defineExpose({ viewUnadpList });
</script>

<style scoped lang="less">
  .container {
    padding: 8px 0;
    .nodes {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
    .line {
      width: 178px;
      height: 1px;
      background: rgba(0, 0, 0, 0.04);
      margin: 8px 16px;
    }
  }
</style>
