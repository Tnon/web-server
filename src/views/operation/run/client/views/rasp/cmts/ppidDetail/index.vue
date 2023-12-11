<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2023-06-26 16:24:58
-->
<template>
  <div class="container">
    <template v-for="item in ppidArr" :key="item">
      <div class="node">{{ item }}</div>
    </template>
    <right-outlined v-if="record!.pids_num > 2" @click="viewMoreInfo" class="moreIcon" />
  </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { PropType } from 'vue';
  import osInfoAndPPID from './cmts/osInfoAndPPID';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    ppidArr: {
      type: Array as PropType<number[]>,
      required: true,
    },
    record: Object,
  });
  const { t } = useI18n();
  const viewMoreInfo = () => {
    useModal(
      {
        title: `${t('operation.ppid')}（${props.record!.pids_num}）`,
        contentProps: {
          record: props.record,
        },
        footer: false,
      },
      osInfoAndPPID,
    );
  };
</script>

<style scoped lang="less">
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    .node {
      font-size: @fz14;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      padding: 0 8px;
      margin: 4px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 4px;
    }
    .moreIcon {
      cursor: pointer;
      color: @primary-color;
      transition: all 0.3s;
      position: absolute;
      padding: 4px;
      right: 10px;
      // &:hover {
      //   padding-left: 8px;
      // }
    }
  }
</style>
