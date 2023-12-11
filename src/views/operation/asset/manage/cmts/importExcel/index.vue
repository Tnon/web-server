<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-17 13:06:25
 * @LastEditTime: 2023-04-07 18:04:43
-->
<template>
  <div>
    <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
      <template #content>
        <div class="container">
          <div class="nodes" @click="importHost">{{ t('asset.hostInfo') }}</div>
          <div class="line"></div>
          <div class="nodes" @click="logRecord">{{ t('asset.logRecord') }}</div>
        </div>
      </template>
      <a-button type="text">
        <template #icon>
          <ImportOutlined />
        </template>
        <slot></slot>
      </a-button>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';
  import { useModal } from '@/hooks';
  import { ImportOutlined } from '@ant-design/icons-vue';
  import { formContent } from './formContent';
  import { useEditColumns } from './index';
  import { getLogdRecords } from '@/api/asset/hostInfo/host';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps({
    refreshAll: Function,
  });
  const importHost = (): void => {
    useModal(
      {
        title: t('asset.iptHitem'),
        width: 640,
        footer: false,
        contentProps: {
          refreshAll: props.refreshAll,
        },
      },
      formContent,
    );
  };
  const logRecord = (): void => {
    useModal(
      {
        title: t('asset.iptLoging'),
        width: 700,
        wrapClassName: 'modalBodyNopad',
        footer: false,
        contentProps: {
          class: 'logRecordTable',
          columns: useEditColumns(t),
          getListFunc: getLogdRecords,
          rowKey: 'log_id',
          arguments: {},
          scroll: { y: '400px' },
        },
      },
      SlotsTable,
    );
  };
</script>

<style scoped lang="less">
  .batchM {
    .ant-popover-inner-content {
      padding: 0;
    }
    .container {
      padding: 8px 0;
      .line {
        width: 200px;
        height: 1px;
        background: #eeeeee;
        border-radius: 8px;
        margin: 8px 0;
      }
      .nodes {
        padding: 0 16px;
        line-height: 40px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>
