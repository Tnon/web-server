<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2023-10-17 20:03:38
-->
<template>
  <template v-if="showMenuItem">
    <template v-if="menuInfo.meta!.single">
      <a-menu-item :key="menuInfo.name">
        <template #icon v-if="menuInfo.meta!.icon">
          <custom-icon :type="menuInfo.meta!.icon" size="16" />
        </template>
        <span :title="t(menuInfo.meta!.title as string)">
          {{t(menuInfo.meta!.title as string)}}
        </span>
      </a-menu-item>
    </template>
    <template v-else>
      <template v-if="menuInfo.children">
        <a-menu-item-group :key="menuInfo.name" v-if="showParentItem">
          <template #title>{{t(menuInfo.meta!.title as string)}}</template>
          <template v-for="item in menuInfo.children" :key="item.name">
            <Item
              :keyName="(item.name as string)"
              :icon="(item.meta!.icon as string)"
              :title="(item.meta!.title as string)"
            />
            <!-- 权限判断，三权分立 end -->
          </template>
        </a-menu-item-group>
      </template>
      <template v-else>
        <a-menu-item :key="menuInfo.name">
          <template #icon v-if="menuInfo.meta!.icon">
            <custom-icon :type="menuInfo.meta!.icon" size="16" />
          </template>
          <span :title="t(menuInfo.meta!.title as string)">
            {{t(menuInfo.meta!.title as string)}}
          </span>
        </a-menu-item>
      </template>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import type { RouteRecordRaw } from 'vue-router';
  import { computed, PropType } from 'vue';
  import { hasPerimission } from '@/utils/permission';
  import Item from './item.vue';
  import { customSome } from '@/utils/tools';
  const props = defineProps({
    menuInfo: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
  });
  const { t } = useI18n();
  //计算属性避免重复计算
  const showMenuItem = computed(() => hasPerimission(props.menuInfo.name));

  //子节点都无 父也无
  const showParentItem = computed(() => {
    let flag = true;
    if (props.menuInfo.children) {
      flag = customSome(props.menuInfo.children, (ele) => hasPerimission(ele.name));
    }
    return flag;
  });
</script>
