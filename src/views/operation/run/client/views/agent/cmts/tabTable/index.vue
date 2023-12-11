<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 11:23:02
 * @LastEditTime: 2023-07-13 20:08:19
-->
<template>
  <div>
    <!-- tab start -->
    <div class="tab">
      <template v-for="(item, key) in dymicTabs" :key="key">
        <div class="node" :class="{ actived: activedType === key }" @click="switchType(key)">
          <span class="title">{{ item.title }}</span>
          <a-badge
            v-if="item.count"
            :count="item.count"
            :number-style="{ backgroundColor: '#F8A556' }"
          />
        </div>
      </template>
    </div>
    <!-- tab end -->
    <!-- table start -->
    <a-table
      class="tabcont"
      :showHeader="false"
      bordered
      :pagination="false"
      :columns="columns"
      :dataSource="dataSource"
    />
    <!-- table end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { TableColumn } from '@/types/tableColumn';
  import { T_Self_Status } from '../selfDete/type';
  const props = defineProps<{
    self_verify?: T_Self_Status;
  }>();
  const { t } = useI18n();
  const activedType = ref('agent');
  const dymicTabs = reactive({
    agent: {
      title: t('operation.driStu'),
      count: 0,
    },
    collection: {
      title: t('operation.collectionPointStatus'),
      count: 0,
    },
    plugin: {
      title: t('operation.plgsta'),
      count: 0,
    },
  });
  const dataSource = ref<any>([{}]);
  const columns = ref<any[]>([]);
  watchEffect(() => {
    for (let k in props.self_verify) {
      dymicTabs[k].count = props.self_verify[k].count;
    }
    dataSource.value = props.self_verify?.['agent']?.detail ?? [];
  });
  columns.value = useColumns('agent') as TableColumn[];
  //切换类型
  const switchType = (type) => {
    activedType.value = type;
    dataSource.value = props.self_verify?.[type]?.detail;
    columns.value = useColumns(type);
  };
</script>

<style scoped lang="less">
  .tab {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    .node {
      padding: 4px 16px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .title {
        font-size: @fz14;
        color: rgba(0, 0, 0, 0.8);
        margin-right: 6px;
      }
    }
    .actived {
      background: rgba(0, 0, 0, 0.08);
      border-radius: 8px;
    }
  }
  .tabcont {
    padding-bottom: 32px;
  }
</style>
