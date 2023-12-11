<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-12 17:30:28
 * @LastEditTime: 2022-11-02 13:44:53
-->
<template>
  <div>
    <a-button @click="saveAllRouters">保存所有</a-button>
    <div>
      <a-tree
        blockNode
        :fieldNames="fieldNames"
        checkable
        :selectable="false"
        :treeData="routersSingleMap.permissionMap"
        :checkedKeys="checkedKeysCmp"
        @check="checkNode"
      >
        <!-- 自定义图标 start -->
        <template #switcherIcon="{ expanded }">
          <RightOutlined :class="{ rot: expanded }" class="arrowIcon" />
        </template>
        <!-- 自定义图标 end -->
        <!-- 组信息 start -->
        <template #title="{ title, routerName }">
          <div class="node"> {{ title }}{{ routerName }}</div>
        </template>
        <!-- 组信息 end -->
      </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TreeProps } from 'ant-design-vue';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { routersSingleMap } from '@/router/permission';
  import { computed, ref, unref } from 'vue';
  import { cloneDeep } from 'lodash';
  import { saveAllRoutersApi, getAllRoutersApi } from '@/api/user';
  import { setCheckedKeys } from '../..';
  //用户信息仓
  //转换字段
  const fieldNames: TreeProps['fieldNames'] = {
    key: 'routerName',
  };
  //路由数据
  const routerTreeData = ref(cloneDeep(routersSingleMap));
  //主动check处罚
  const checkNode = (checkedKeys, e) => {
    //给checkkey赋值
    checkedKeysCmp.value = checkedKeys;
    //给平铺赋值
    unref(routerTreeData).checkedKeys = checkedKeys;
    unref(routerTreeData).halfCheckedKeys = e.halfCheckedKeys;
    //改造路由信息
    setCheckedKeys(checkedKeys, unref(routerTreeData).permissionMap, e.halfCheckedKeys);
    //存储
    // userTokenStore.SetPermission(unref(routerTreeData));
  };
  //选择的节点
  const checkedKeysCmp = computed({
    get: () => unref(routerTreeData).checkedKeys,
    set: (v) => v,
  });
  //保存全量路由
  const saveAllRouters = async () => {
    saveAllRoutersApi({ u_permission: routerTreeData.value });
  };
  //获取
  const getAllPer = async () => {
    const { checkedKeys, halfCheckedKeys } = await getAllRoutersApi();
    routerTreeData.value.checkedKeys = checkedKeys ?? [];
    routerTreeData.value.halfCheckedKeys = halfCheckedKeys ?? [];
  };
  getAllPer();
</script>

<style scoped lang="less">
  .arrowIcon {
    transition: all 0.3s;
    font-size: 10px;
    color: #666;
  }
  .rot {
    transform: rotate(90deg);
  }
  .last {
    color: red;
  }
</style>
