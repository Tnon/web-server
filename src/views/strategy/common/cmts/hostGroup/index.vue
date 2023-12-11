<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-17 19:15:30
 * @LastEditTime: 2023-01-10 10:24:31
-->
<template>
  <a-popover trigger="click" placement="bottomLeft" overlayClassName="popNoPad">
    <template #content>
      <host-group
        v-model:host_group="host_groupCmp"
        v-model:selectedGroupName="selectedGroupName"
        :policy_type="policy_type"
        class="AttackRisktreeCon"
      />
    </template>
    <a-button class="btn" type="text">
      <template #icon>
        <custom-icon class="licon" type="#ax-wh-grouping" />
      </template>
      <span class="text">{{ selectedGroupName }}</span>
      <!-- <span class="flag" v-if="host_groupCmp !== undefined"></span> -->
    </a-button>
  </a-popover>
</template>

<script setup lang="ts">
  import hostGroup from './cmts/hostGroup';
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, ref } from 'vue';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  const props = defineProps({
    host_group: {
      type: String,
    },
    policy_type: {
      type: Number as PropType<E_WB_Enum>,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:host_group']);
  //选中的攻击名称
  const selectedGroupName = ref<string>(t('asset.group'));
  //选择树的节点
  const host_groupCmp = computed({
    get: () => props.host_group,
    set: (val) => {
      emit('update:host_group', val);
    },
  });
</script>

<style scoped lang="less">
  .btn {
    display: flex;
    align-items: center;
    position: relative;
    .text {
      margin-left: 8px;
    }
    .flag {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: @primary-color;
    }
    :deep(.small) {
      width: 16px;
      height: 16px;
    }
  }
  .AttackRisktreeCon {
    overflow: auto;

    ::v-deep(.ant-tree-treenode) {
      padding: 2px 0;

      .ant-tree-node-selected {
        background: #eee;
      }

      .ant-tree-node-content-wrapper {
        height: 32px;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
      }

      span.ant-tree-switcher,
      span.ant-tree-iconEle {
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
