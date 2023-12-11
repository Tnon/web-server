<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-16 17:17:24
 * @LastEditTime: 2022-11-16 17:51:41
-->
<template>
  <div>
    <template v-if="all_group === GROUPTYPE.ALL">
      {{ t('report.allHost') }}
    </template>
    <template v-else>
      <div class="allGroup" :title="entity_group_list && entity_group_list.join(',')">
        <template v-for="item in entity_group_list" :key="item">
          <span class="groupName">{{ item }}</span>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { GROUPTYPE } from '@/enums/moveGroup';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  defineProps({
    all_group: {
      type: Number as PropType<GROUPTYPE>,
      required: true,
    },
    entity_group_list: Array,
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .groupName {
    display: inline-block;
    padding: 0 8px;
    margin: 8px;
    background-color: #eee;
  }
  .allGroup {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
