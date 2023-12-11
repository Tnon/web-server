<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-18 17:21:41
 * @LastEditTime: 2023-07-19 11:44:56
-->
<template>
  <a-menu-item v-if="showMenuItem" :key="keyName">
    <div class="formItem">
      <span class="title"> {{ t(title) }}</span>
      <template v-if="staticsCount[title.split('.')[1]] !== undefined">
        <countTo :endVal="staticsCount[title.split('.')[1]]" />
      </template>
      <template v-else>
        <loading-outlined />
      </template>
    </div>
  </a-menu-item>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { hasPerimission } from '@/utils/permission';
  import { computed } from 'vue';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    keyName: {
      type: String,
      required: true,
    },
    staticsCount: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
  //计算属性避免重复计算
  const showMenuItem = computed(() => hasPerimission(props.name));
</script>

<style scoped lang="less">
  .formItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
