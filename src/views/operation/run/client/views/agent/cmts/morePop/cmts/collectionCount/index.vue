<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 15:36:50
 * @LastEditTime: 2023-07-13 20:21:33
-->
<template>
  <div class="bar">
    <div class="left">
      <div class="labelicon">
        <InfoCircleFilled class="cicon" />
        <div class="label">{{ t('operation.cdjsf') }}</div>
        <template v-for="(item, key) in staticCount" :key="key">
          <div class="node">
            <div class="coll">{{ t('operation.' + key) }}</div>
            <count-to class="count" :endVal="item.count" />
          </div>
        </template>
      </div>
    </div>
    <div class="right">
      <a-button @click="refreshTable(true)" class="init">{{ t('common.reset') }}</a-button>
      <a-button type="primary" :loading="loading" @click="saveConfig">
        {{ t('common.save') }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { setCollection } from '@/api/operation/run';
  import { E_Select_Mode, I_Check_State, T_Collection } from '../collection/type';
  import { InfoCircleFilled } from '@ant-design/icons-vue';
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps<{
    refreshTable: Function;
    collectionSelection: Record<T_Collection, I_Check_State>;
    params: Object;
    staticCount: Record<T_Collection, { count: number; online_count: number }>;
    totalNum: number;
  }>();

  const { t } = useI18n();

  //缓存数据
  const staticCountState = computed(() => {
    return {
      process:
        props.staticCount.process.online_count +
        (props.collectionSelection.process.include.length -
          props.collectionSelection.process.exclude.length),
      memory:
        props.staticCount.memory.online_count +
        (props.collectionSelection.memory.include.length -
          props.collectionSelection.memory.exclude.length),
      file:
        props.staticCount.file.online_count +
        (props.collectionSelection.file.include.length -
          props.collectionSelection.file.exclude.length),
      network:
        props.staticCount.network.online_count +
        (props.collectionSelection.network.include.length -
          props.collectionSelection.network.exclude.length),
      other:
        props.staticCount.other.online_count +
        (props.collectionSelection.other.include.length -
          props.collectionSelection.other.exclude.length),
    };
  });
  const loading = ref(false);
  const saveConfig = async () => {
    loading.value = true;
    await setCollection({
      filter: props.params,
      collection: props.collectionSelection,
    });
    loading.value = false;
    props.refreshTable(true);
  };

  watch(
    () => props.collectionSelection,
    () => {
      for (let k in props.collectionSelection) {
        if (props.collectionSelection[k].mode === E_Select_Mode.Init) {
          if (staticCountState.value[k] && staticCountState.value[k] === props.totalNum) {
            props.collectionSelection[k].mode = E_Select_Mode.All;
            props.collectionSelection[k].include = [];
            props.collectionSelection[k].exclude = [];
          } else if (staticCountState.value[k] === 0) {
            props.collectionSelection[k].mode = E_Select_Mode.None;
            props.collectionSelection[k].include = [];
            props.collectionSelection[k].exclude = [];
          }
        } else if (props.collectionSelection[k].mode === E_Select_Mode.All) {
          if (props.totalNum && props.collectionSelection[k].exclude.length === props.totalNum) {
            props.collectionSelection[k].mode = E_Select_Mode.None;
            props.collectionSelection[k].include = [];
            props.collectionSelection[k].exclude = [];
          }
        } else {
          if (props.totalNum && props.collectionSelection[k].include.length === props.totalNum) {
            props.collectionSelection[k].mode = E_Select_Mode.All;
            props.collectionSelection[k].include = [];
            props.collectionSelection[k].exclude = [];
          }
        }
      }
    },
    {
      deep: true,
    },
  );
</script>

<style scoped lang="less">
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 16px;
    background: #f6f6f6;
    border-radius: 28px;
    margin: 0 16px 8px;
    color: rgba(0, 0, 0, 0.8);
    font-size: @fz13;
    .labelicon {
      display: flex;
      align-items: center;
      .cicon {
        font-size: 18px;
        color: @primary-color;
        margin-right: 8px;
      }
      .node {
        display: flex;
        align-items: center;
        margin-right: 16px;
        .count {
          color: @primary-color;
          margin-left: 8px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .init {
        margin-right: 16px;
      }
    }
  }
</style>
