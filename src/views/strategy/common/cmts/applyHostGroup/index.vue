<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 19:38:58
 * @LastEditTime: 2023-08-02 15:53:36
-->
<template>
  <a-spin :spinning="loading">
    <div class="groups">
      <!-- 分组树 start -->
      <a-tree
        v-if="treeData.length"
        :disabled="!isEditing"
        :checkStrictly="true"
        blockNode
        checkable
        :defaultExpandAll="true"
        :selectable="false"
        :fieldNames="fieldNames"
        :treeData="treeData"
        v-model:checkedKeys="applyGrpupsCmp"
      >
        <!-- 组信息 start -->
        <template #title="{ name, policy_name, inherit }">
          <div class="node">
            <span class="title" :title="name">{{ name }}</span>
            <span class="value" :title="policy_name">
              <span class="inherit" v-if="inherit">{{ t('strategy.inherit') }}</span>
              {{ policy_name }}
            </span>
          </div>
        </template>
        <!-- 组信息 end -->
      </a-tree>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
  import { PropType, ref, computed, watchEffect } from 'vue';
  import { getStategyApplyList } from '@/api/strategy/safe';
  import { StrategyType } from '@/views/strategy/common/types';
  import { getCheckedGroups } from '.';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    isEditing: {
      type: Boolean,
      required: true,
    },
    applyedGroups: {
      type: Array as PropType<number[]>,
      required: true,
    },
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  //树加载中
  const loading = ref<boolean>(false);
  //转换字段
  const fieldNames = {
    children: 'items',
    label: 'name',
    key: 'id',
    value: 'policy_id',
  };
  //绑定选中的分组
  const emit = defineEmits(['update:applyedGroups']);
  //应用的分组
  const applyGrpupsCmp = computed({
    get: () => props.applyedGroups,
    set: (v: any) => emit('update:applyedGroups', v.checked),
  });
  //树的数据
  const treeData = ref<any>([]);
  //树的数据备份
  const initTreeData = ref<any>([]);
  //获取数的数据
  const getTreeData = async (selectedId) => {
    loading.value = true;
    const { items } = await getStategyApplyList({
      page: { page_index: -1, page_size: -1 },
      filter: { policy_type: props.strategyType },
    } as any);
    treeData.value = items;
    initTreeData.value = items;
    const applyGroups = [];
    getCheckedGroups(applyGroups, items, selectedId);
    applyGrpupsCmp.value = { checked: applyGroups };
    loading.value = false;
  };
  watchEffect(() => {
    getTreeData(props.selectedId);
  });
  const refreshTreeData = () => {
    getTreeData(props.selectedId);
  };
  //恢复数据
  const backTreeData = () => {
    const applyGroups = [];
    getCheckedGroups(applyGroups, initTreeData.value, props.selectedId);
    applyGrpupsCmp.value = { checked: applyGroups };
  };
  defineExpose({ refreshTreeData, backTreeData });
</script>

<style scoped lang="less">
  .node {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    padding: 0 16px 0 0;
    .title {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
    }
    .value {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      .inherit {
        color: #fff;
        background: @primary-color;
        padding: 2px 4px;
        margin-right: 5px;
        border-radius: 4px;
      }
    }
  }
  .groups {
    height: calc(100vh - 216px);
    overflow: auto;
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: #ddd;
      }
    }
  }
</style>
