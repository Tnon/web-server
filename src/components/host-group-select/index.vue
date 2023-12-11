<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-10 10:54:36
 * @LastEditTime: 2023-03-06 10:20:50
-->
<template>
  <div class="hcontainer">
    <a-select
      class="selectSelf"
      :placeholder="placeholder || t('common.allPlace')"
      :height="300"
      :maxTagCount="maxTagCount ?? 5"
      show-search
      :mode="multiple ? 'multiple' : undefined"
      allowClear
      :fieldNames="{ label: 'name', value: 'id' }"
      optionFilterProp="name"
      :options="hostGroupOptions"
      @dropdownVisibleChange="dropdownVisibleChange"
      v-model:value="selectedGroupIdsCmp"
      @change="changeValue"
    />
  </div>
</template>

<script setup lang="ts">
  import { getHostGroups } from '@/api/asset/hostInfo/host';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    placeholder: String,
    maxTagCount: Number,
    selectedGroupIds: {
      type: [String, Number],
    },
    multiple: {
      type: Boolean,
      required: true,
      default: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:selectedGroupIds', 'change']);
  const selectedGroupIdsCmp = computed({
    get: () => {
      if (props.multiple) {
        if (props.selectedGroupIds) {
          return (props.selectedGroupIds as string).split(',').map((ele) => ~~ele); //数组的id是整形的话
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
  const hostGroupOptions = ref<{ id: number; name: string }[]>([]);

  //懒加载
  const dropdownVisibleChange = async (v) => {
    if (v) {
      const { groups } = await getHostGroups();
      hostGroupOptions.value = groups;
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
  const changeValue = (v) => {
    emit('change', v);
  };
</script>

<style scoped lang="less">
  .hcontainer {
    flex: 1;
    .selectSelf {
      width: 100%;
    }
  }
</style>
