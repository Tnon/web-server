<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-12-26 21:49:18
 * @LastEditTime: 2022-12-27 20:49:05
-->
<template>
  <div class="container">
    <div class="taskModule" v-for="(task, key) in moduleData" :key="key">
      <div class="taskName">{{ t(`operation.${key}`) }}</div>
      <a-spin :spinning="spinning">
        <div class="taskContent">
          <div class="taskItem" v-for="(item, itemLabel) in task" :key="item">
            <div>
              <div class="label">{{ t(`operation.${itemLabel}`) }}</div>
              <div class="value" :class="{ primaryValue: itemLabel === 'finishedFile' }">
                <countTo :endVal="pageData[item]" />
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { getDetectionTaskApi } from '@/api/operation/storage';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const spinning = ref<boolean>(false);
  // 页面数据
  const pageData = ref<{ [k: string]: number }>({});
  // 页面结构
  const moduleData = {
    webshellDetectionTask: {
      finishedFile: 'ws_finish_count',
      scanningFile: 'ws_doing_count',
    },
    antivirusTask: {
      finishedFile: 'virus_finish_count',
      scanningFile: 'virus_doing_count',
    },
  };

  // 获取资源控制
  const getMonitor = async () => {
    spinning.value = true;
    const res = await getDetectionTaskApi();
    pageData.value = res;
    spinning.value = false;
  };
  getMonitor();
</script>
<style lang="less" scoped>
  .container {
    margin: 16px 16px 0 0;
    display: flex;

    .taskModule {
      flex: 0 0 50%;
      &:nth-child(1) {
        margin-right: 16px;
      }
      .taskName {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        margin-bottom: 8px;
      }
      .taskContent {
        height: 136px;
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        display: flex;
        padding: 0 40px;
        .taskItem {
          flex: 0 0 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          // align-items: center;
          .label {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            margin-bottom: 16px;
          }
          .value {
            font-size: 18px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.8);
          }
          .primaryValue {
            color: @primary-color;
          }
        }
      }
    }
  }

  .monitor {
    background: #fafafa;
  }
</style>
