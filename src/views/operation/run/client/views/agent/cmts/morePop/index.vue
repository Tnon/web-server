<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:57
 * @LastEditTime: 2023-07-27 14:21:38
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <div class="nodes" @click="viewUnadpList"> {{ t('operation.uninsdclient') }} </div>
        <div class="nodes" @click="viewCollList"> {{ t('operation.cjdsz') }} </div>
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
  import collection from './cmts/collection';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

  //查看已卸载客户端主机清单
  const viewUnadpList = () => {
    useModal(
      {
        title: t('operation.uninsdclientlist'),
        footer: false,
        width: 1000,
      },
      uadpList,
    );
  };
  //采集点设置
  const viewCollList = () => {
    useModal(
      {
        title: t('operation.cjdsz'),
        wrapClassName: 'noheadModal',
        footer: false,
        width: 1300,
      },
      collection,
    );
  };
</script>

<style scoped lang="less">
  .container {
    padding: 8px 0;
    width: 200px;
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
