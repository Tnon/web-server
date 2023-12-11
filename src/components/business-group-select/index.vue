<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-22 18:45:05
 * @LastEditTime: 2023-01-12 21:22:13
-->
<template>
  <div class="btreeContainer">
    <a-tree-select
      :height="300"
      :maxTagCount="maxTagCount ?? 5"
      show-search
      treeNodeFilterProp="name"
      :fieldNames="{
        children: 'items',
        label: 'name',
        key: 'id',
        value: 'id',
      }"
      class="treeselect"
      v-model:value="modelValue"
      :tree-data="businessGroupOptions"
      allow-clear
      :multiple="multiple"
      :placeholder="placeholder || t('common.allPlace')"
      @dropdownVisibleChange="dropdownVisibleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getBusinessGroups } from '@/api/operation/asset';
  import { GROUPENUM } from '@/enums/moveGroup';
  const props = defineProps({
    placeholder: String,
    maxTagCount: Number,
    multiple: {
      type: Boolean,
      required: true,
    },
    selectedGroupIds: [String, Number],
  });
  const emit = defineEmits(['update:selectedGroupIds']);
  const { t } = useI18n();
  const modelValue = computed({
    get: () => {
      //多选时候 (string,string)
      if (props.multiple) {
        if (props.selectedGroupIds) {
          return (props.selectedGroupIds as string).split(',').map((ele) => ~~ele);
        } else {
          return [];
        }
      } else {
        return props.selectedGroupIds;
      }
    },
    set: (v) => {
      if (props.multiple) {
        emit('update:selectedGroupIds', (v as Array<string | number>).join(','));
      } else {
        emit('update:selectedGroupIds', v);
      }
    },
  });
  //主机组
  const businessGroupOptions = ref<{ id: number; name: string }[]>([]);

  //懒加载
  const dropdownVisibleChange = async (v) => {
    if (v) {
      const { items } = await getBusinessGroups({
        filter: {
          id: GROUPENUM.ALL,
        },
        page: {
          page_index: -1,
          page_size: 20,
        },
      } as any);
      businessGroupOptions.value = items;
    }
  };
  //如果是编辑
  if (props.multiple) {
    if (props.selectedGroupIds) {
      dropdownVisibleChange(true);
    }
  } else {
    if (props.selectedGroupIds !== undefined) {
      dropdownVisibleChange(true);
    }
  }
</script>
<style lang="less" scoped>
  .suffixIcon {
    position: absolute;
    top: 5px;
    right: 10px;
    color: #666;
  }
  .btreeContainer {
    flex: 1;
    .treeselect {
      width: 100%;
    }
  }
</style>
