<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 16:38:47
 * @LastEditTime: 2023-02-22 17:15:41
-->
<template>
  <div class="fileCon">
    <template v-for="item in fileConfigs" :key="item.value">
      <div class="node">
        <div class="name">{{ item.label }}</div>
        <a-radio-group class="radios" v-model:value="item.mode" @change="changeRadio">
          <a-radio :value="E_File_Protect.None">{{ t('reinforce.bjk') }}</a-radio>
          <a-radio :value="E_File_Protect.Report">{{ t('reinforce.jsb') }}</a-radio>
          <a-radio :value="E_File_Protect.Inject">{{ t('reinforce.lj') }}</a-radio>
        </a-radio-group>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref, unref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getFileConfigs } from '.';
  import { E_File_Action, E_File_Protect } from '../form/type';
  const props = defineProps({
    value: {
      type: Array as PropType<{ type: E_File_Action; value: E_File_Protect }[]>,
      required: true,
    },
  });

  const { t } = useI18n();
  const emit = defineEmits(['update:value']);
  const fileConfigs = ref(getFileConfigs(t));

  watchEffect(() => {
    props.value.forEach((ele) => {
      unref(fileConfigs).forEach((item) => {
        if (ele.type === item.value) {
          item.mode = ele.value;
        }
      });
    });
  });

  //改变模式
  const changeRadio = () => {
    const result: { type: E_File_Action; value: E_File_Protect }[] = [];
    fileConfigs.value.forEach((ele) => {
      if (ele.mode !== E_File_Protect.None) {
        result.push({
          type: ele.value,
          value: ele.mode,
        });
      }
    });
    emit('update:value', result);
  };
</script>

<style scoped lang="less">
  .fileCon {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    .node {
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      .name {
        font-size: @fz14;
        font-weight: 600;
        color: #000000;
      }
      .radios {
        display: flex;
        align-items: center;
      }

      &:last-child {
        border: none;
      }
    }
  }
</style>
