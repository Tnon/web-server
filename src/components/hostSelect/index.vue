<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 17:53:44
 * @LastEditTime: 2023-03-24 10:18:11
-->
<template>
  <a-select
    v-model:value="selectedMacsCmp"
    mode="multiple"
    :autoClearSearchValue="false"
    labelInValue
    :placeholder="t('reinforce.hstplac')"
    style="width: 100%"
    :filter-option="false"
    :not-found-content="loading ? undefined : null"
    :options="macList"
    @search="getMacList"
    allowClear
    @change="changeValue"
  >
    <template v-if="loading" #notFoundContent>
      <a-spin size="small" />
    </template>
  </a-select>
</template>
<script setup lang="ts">
  import { debounce } from 'lodash';
  import { watch, PropType, ref, computed } from 'vue';
  import { getSearchMacList } from '@/api/reinforce';
  import { useI18n } from 'vue-i18n';
  import { I_Host_Map } from '@/views/reinforce/baseline/cmts/tableContent/type';
  const props = defineProps({
    selectedMacs: {
      type: Array as PropType<I_Host_Map[]>,
      required: true,
    },
  });
  const emit = defineEmits(['update:selectedMacs', 'change']);
  const { t } = useI18n();
  const loading = ref(false);
  //选择的mac
  const selectedMacsCmp = computed({
    get: () => props.selectedMacs.map((ele) => ({ label: ele.ip, value: ele.mac })),
    set: (v) => {
      emit(
        'update:selectedMacs',
        v.map((ele) => ({ ip: ele.label, mac: ele.value })),
      );
    },
  });
  //所有的mac列表
  const macList = ref<{ mac: string; ip: string }[]>([]);

  let lastFetchId = 0;

  const getMacList = debounce(async (value) => {
    if (value) {
      lastFetchId += 1;
      const fetchId = lastFetchId;
      macList.value = [];
      loading.value = true;
      const { items } = await getSearchMacList({
        filter: {
          search_prefix: value,
        },
      });
      if (fetchId !== lastFetchId) {
        return;
      }
      macList.value = items.map((ele) => ({ label: ele.ip, value: ele.host_id }));
      loading.value = false;
    } else {
      loading.value = false;
      macList.value = [];
    }
  }, 500);

  watch(selectedMacsCmp.value, () => {
    macList.value = [];
    loading.value = false;
  });

  const changeValue = (v) => {
    emit('change', v);
  };
</script>
