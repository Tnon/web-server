<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-30 20:19:58
 * @LastEditTime: 2023-10-27 10:25:49
-->
<template>
  <a-popover trigger="click" v-model:open="open" placement="rightBottom">
    <template #content>
      <vuedragable
        v-model:list="columnsCmp"
        itemKey="dataIndex"
        handle=".handle"
        animation="200"
        fallback-class="moving"
        :forceFallback="true"
      >
        <template #item="{ element }">
          <div class="node" v-if="!element.hidden">
            <HolderOutlined
              :class="[element.is_last_columns || !!element.fixed ? 'static' : 'handle']"
            />
            <a-checkbox
              @click="hidethis(element)"
              :disabled="element.is_last_columns || !!element.fixed"
              :checked="!element.unChecked"
            >
              {{ element.title }}
              <!-- :disabled="canCheck.length === 1 && canCheck[0].dataIndex === element.dataIndex" -->
            </a-checkbox>
          </div>
        </template>
      </vuedragable>
    </template>
    <setting-outlined class="sicon" @click.stop="showPop" />
  </a-popover>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import vuedragable from 'vuedraggable';
  import { SettingOutlined, HolderOutlined } from '@ant-design/icons-vue';
  // import { filter } from '@/utils/tools';
  const props = defineProps({
    columns: {
      type: Array,
      required: true,
    },
  });
  const emit = defineEmits(['update:columns']);
  const hidethis = (ele) => {
    ele.unChecked = !ele.unChecked;
  };
  const columnsCmp = computed({
    get: () => props.columns,
    set: (v) => emit('update:columns', v),
  });
  const open = ref(false);
  const showPop = () => {
    open.value = !open.value;
  };
  // const canCheck: any = computed(() =>
  //   filter(props.columns, (ele: any) => !ele.unChecked && !ele.hidden),
  // );
</script>

<style scoped lang="less">
  .sicon {
    font-size: @fz16;
  }
  .node {
    padding: 8px 0;
  }
  .handle {
    cursor: move;
    font-size: @fz14;
    margin-right: 10px;
  }
  .static {
    cursor: no-drop;
    font-size: @fz14;
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.4);
  }
  .moving {
    background-color: @primary-color;
    * {
      color: #fff !important;
    }
  }
</style>
