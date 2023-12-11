<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 17:12:34
 * @LastEditTime: 2023-01-12 11:07:27
-->
<template>
  <div class="groupC">
    <template v-if="groups.length">
      <template v-if="groups.length > 1">
        <div class="primary" @click="openAttrValues">
          {{ groups.length }}
        </div>
      </template>
      <template v-else>
        <span :title="groups[0].name">
          {{ groups[0].name }}
        </span>
      </template>
    </template>
    <template v-else>-</template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { PropType } from 'vue';
  import { useModal } from '@/hooks';
  import multipleGroup from './cmts/multipleGroup';
  const { t } = useI18n();
  const props = defineProps({
    groups: {
      type: Array as PropType<{ name: string }[]>,
      required: true,
    },
  });
  //打分组弹框
  const openAttrValues = () => {
    useModal(
      {
        title: t('strategy.polAppGroup'),
        footer: false,
        contentProps: {
          groups: props.groups,
        },
      },
      multipleGroup,
    );
  };
</script>

<style scoped lang="less">
  .primary {
    color: @primary-color;
    cursor: pointer;
  }
  .groupC {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
