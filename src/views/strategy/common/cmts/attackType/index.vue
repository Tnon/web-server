<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-17 19:15:30
 * @LastEditTime: 2023-01-09 10:05:08
-->
<template>
  <a-popover trigger="click" placement="bottomLeft" overlayClassName="popNoPad">
    <template #content>
      <attack-tree
        v-model:attack_type="attack_typeCmp"
        v-model:attack_title="attack_title"
        :policy_type="policy_type"
        class="AttackRisktreeCon"
      />
    </template>
    <a-button class="btn" type="text">
      <template #icon>
        <dync-atk-risk-img imgType="alarm" size="small" :danger="true" />
      </template>
      <span class="text">{{ attack_title }}</span>
      <span><DownOutlined /> </span>
    </a-button>
  </a-popover>
</template>

<script setup lang="ts">
  import { DownOutlined } from '@ant-design/icons-vue';
  import dyncAtkRiskImg from '@/components/attack-risk-cmts/dync-attack-risk-img';
  import attackTree from './cmts/attackTree';
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, ref } from 'vue';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  const props = defineProps({
    attack_type: {
      type: String,
    },
    policy_type: {
      type: Number as PropType<E_WB_Enum>,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:attack_type']);
  //选中的攻击名称
  const attack_title = ref<string>(t('menu.overview'));
  //选择树的节点
  const attack_typeCmp = computed({
    get: () => props.attack_type,
    set: (val) => {
      emit('update:attack_type', val);
    },
  });
</script>

<style scoped lang="less">
  .btn {
    display: flex;
    align-items: center;
    .text {
      margin-right: 8px;
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
        height: 40px;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
      }

      span.ant-tree-switcher,
      span.ant-tree-iconEle {
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
