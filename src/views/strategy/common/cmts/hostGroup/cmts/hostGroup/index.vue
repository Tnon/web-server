<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 11:01:33
 * @LastEditTime: 2023-01-10 10:24:56
-->
<template>
  <div class="container">
    <a-tree
      :height="480"
      blockNode
      :fieldNames="fieldNames"
      :treeData="treeGroup"
      v-model:selectedKeys="host_groupCmp"
      @select="selectType"
    >
      <!-- 自定义图标 start -->
      <template #switcherIcon="{ expanded }">
        <RightOutlined :class="{ rot: expanded }" class="arrowIcon" />
      </template>
      <!-- 自定义图标 end -->
      <!-- 组信息 start -->
      <template #title="{ name }">
        <div class="node">
          <span class="label" :title="name">{{ name }}</span>
        </div>
      </template>
      <!-- 组信息 end -->
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
  import { computed, PropType, ref } from 'vue';
  import { fieldNames } from './index';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  import { useI18n } from 'vue-i18n';
  import { getPolicyTreeHostGroup } from '@/api/strategy/white';
  const props = defineProps({
    host_group: String,
    selectedGroupName: {
      type: String,
      required: true,
    },
    policy_type: {
      type: Number as PropType<E_WB_Enum>,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:host_group', 'update:selectedGroupName']);
  //选择树的节点
  const host_groupCmp = computed({
    get: () => [props.host_group],
    set: (val) => {
      if (!val.length) {
        return;
      }
      emit('update:host_group', val[0] + '');
    },
  });
  //选择树的节点
  const selectType = (_, { selectedNodes }) => {
    if (!selectedNodes.length) {
      emit('update:host_group', undefined);
      emit('update:selectedGroupName', t('asset.group'));
      return;
    } else {
      const name = selectedNodes[0].name;
      emit('update:selectedGroupName', name);
    }
  };
  //获取分组
  const treeGroup = ref<any>([]);
  const getTreeGroupPolicy = async () => {
    const { groups } = await getPolicyTreeHostGroup({ policy_type: props.policy_type });
    treeGroup.value = groups;
  };
  getTreeGroupPolicy();
</script>
<style lang="less" scoped>
  .container {
    width: 280px;
    padding: 0 8px;
  }

  .node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;

    .label {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      padding-left: 10px;
      height: 32px;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // flex: 8;
    }
  }
  .arrowIcon {
    transition: all 0.3s;
    font-size: 10px;
    color: #666;
  }
  .rot {
    transform: rotate(90deg);
  }
</style>
