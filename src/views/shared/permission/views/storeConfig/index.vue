<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-12 17:30:28
 * @LastEditTime: 2022-10-25 10:11:34
-->
<template>
  <div>
    <a-button @click="saveAllRoutersYW">当前管理员权限保存</a-button>
    <div class="container">
      <a-tree
        blockNode
        :fieldNames="fieldNames"
        checkable
        :selectable="false"
        :treeData="routerTreeData.permissionMap"
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
  import { useUserToken } from '@/store/modules/user';
  import { computed, ref, unref } from 'vue';
  import { setCheckedKeys } from '../..';
  import { cloneDeep } from 'lodash';
  import { saveYWRoutersApi } from '@/api/user';
  //用户信息仓
  const userTokenStore = useUserToken();
  //转换字段
  const fieldNames: TreeProps['fieldNames'] = {
    key: 'routerName',
  };
  //路由存储对象
  const storeUserPermissions = computed(() => userTokenStore.userPermissions);
  //路由数据
  const routerTreeData = ref(cloneDeep(unref(storeUserPermissions)));
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
  //保存运维管理员
  const saveAllRoutersYW = async () => {
    saveYWRoutersApi({
      u_permission: routerTreeData.value,
      u_type: userTokenStore.user_info.u_type,
    });
  };
</script>

<style scoped lang="less">
  .container {
    height: calc(100vh);
    overflow: auto;
  }
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
