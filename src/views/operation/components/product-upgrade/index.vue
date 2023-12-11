<template>
  <div class="content">
    <div class="btnGroup">
      <!-- 产品升级按钮 start -->
      <a-button type="primary" class="product" @click="openUpgrade">
        <template #icon>
          <custom-icon class="cusicon" type="#ax-Upload" />
        </template>
        {{ t('operation.uplodLib') }}
      </a-button>
      <!-- 产品升级按钮 end -->
      <div class="line"></div>
      <!-- 上传记录 start -->
      <a-popover
        trigger="click"
        overlayClassName="popNoPad"
        placement="bottomLeft"
        destroyTooltipOnHide
      >
        <template #content>
          <div @click="uploadHistory" class="uploadRecord">{{ t('operation.upgRed') }}</div>
        </template>
        <a-button type="primary" class="more">
          <template #icon>
            <EllipsisOutlined />
          </template>
        </a-button>
      </a-popover>
      <!-- 上传记录 end -->
    </div>
    <div class="lines"></div>
  </div>
</template>
<script setup lang="ts">
  import { createVNode, reactive } from 'vue';
  import { useModal } from '@/hooks';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import recordModal from '@/views/operation/upgrade/components/recordModal';
  import switchNodes from './cmts/switch-nodes';
  import { useI18n } from 'vue-i18n';
  import upgradeCenter from '../upgrade-center';
  const { t } = useI18n();
  const props = defineProps({
    refreshMethods: Function,
  });
  //打开升级中心
  const openUpgrade = () => {
    useModal(
      {
        title: t('operation.uplodpkg'),
        width: 1400,
        autoOpen: new Boolean(true) as boolean,
        footer: false,
        contentProps: {
          refreshMethods: props.refreshMethods,
        },
      },
      upgradeCenter,
    );
  };
  const state = reactive({
    selectedType: 'client',
  });
  //上传记录
  const uploadHistory = () => {
    useModal(
      {
        title: createVNode(switchNodes, { state, class: 'modalSwitch' }),
        instanceKey: t('operation.upgRed'),
        width: 1000,
        wrapClassName: 'modalBodyNopad',
        footer: false,
        contentProps: {
          state,
        },
      },
      recordModal,
    );
  };
</script>

<style scoped lang="less">
  .content {
    display: flex;
    align-items: center;
    .btnGroup {
      display: flex;
      align-items: center;
      background-color: @primary-color;
      border-radius: 8px;
      .product {
        border-radius: 8px 0 0 8px;
        display: flex;
        align-items: center;
        .cusicon {
          margin-right: 4px;
          font-size: @fz12 !important;
        }
      }
      .more {
        border-radius: 0 8px 8px 0;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 16px;
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    .lines {
      margin: 0 16px;
      display: inline-block;
      width: 1px;
      height: 16px;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  .uploadRecord {
    cursor: pointer;
    width: 200px;
    padding: 8px 10px;
    &:hover {
      background-color: #eee;
    }
  }
</style>
