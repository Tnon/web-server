<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-24 17:38:19
 * @LastEditTime: 2023-02-15 09:48:14
-->
<template>
  <template v-if="menuInfo.children && menuInfo.path !== 'overview'">
    <a-sub-menu :key="menuInfo.name">
      <template #title>
        <span class="iconParent iconParentO">
          <!-- <customIcon type="#ax-Mnav-property" class="btnIcons" /> -->
          <customIcon :type="menuInfo.meta.icon" class="btnIcons" />
        </span>
        {{ t(menuInfo.meta.title) }}
      </template>
      <template v-if="menuInfo.children">
        <template v-for="item in menuInfo.children" :key="item.name">
          <!-- 权限判断，三权分立 start -->
          <Item
            :name="item.name"
            :staticsCount="staticsCount"
            :keyName="item.name"
            :title="item.meta.title"
          />
          <!-- 权限判断，三权分立 end -->
        </template>
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="menuInfo.name">
      <span class="iconParent">
        <customIcon :type="menuInfo.meta.icon" class="btnIcons" />
      </span>
      <span class="overview"> {{ t(menuInfo.meta.title) }}</span>
    </a-menu-item>
    <span class="line"></span>
  </template>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import Item from './item.vue';
  defineProps({
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
    staticsCount: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
</script>

<style lang="less" scoped>
  .titleIcon {
    margin-right: 4px;
  }
  .iconParent {
    padding: 4px;
    border-radius: 6px;
    margin-right: 4px;
  }
  .iconParentO {
    margin-right: 0px;
  }
  .btnIcons {
    font-size: 16px !important;
    color: rgba(0, 0, 0, 0.8);
  }
  .line {
    width: 1px;
    height: 16px;
    opacity: 1;
    display: inline-block;
    background: #d8d8d8;
    margin: 0 16px;
    position: relative;
    top: 8px;
  }
  .overview {
    font-size: 16px;
  }
</style>
