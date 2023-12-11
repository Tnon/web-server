<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 17:14:45
 * @LastEditTime: 2023-03-24 16:26:06
-->
<template>
  <div class="processDetail">
    <!-- 拦截状态 start -->
    <div class="item">
      <div class="label">{{ t('ngav.detstau') }}</div>
      <div class="value" :class="[fileStatus === FileStatus.Exist ? 'primary' : 'danger']">
        {{
          fileStatus === FileStatus.Exist
            ? t('ngav.ylpfi')
            : fileStatus === FileStatus.NotExist
            ? t('ngav.yccfil')
            : t('ngav.wjhqsb')
        }}
      </div>
    </div>
    <!-- 拦截状态 end -->
    <div class="item">
      <div class="label">{{ t('ngav.filname') }}</div>
      <div class="value">{{ fileName }}</div>
    </div>
    <div class="item">
      <div class="label">{{ t('ngav.filepat') }}</div>
      <div class="value">{{ filePath }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FileStatus } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  defineProps({
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileStatus: {
      type: Number as PropType<FileStatus>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .processDetail {
    padding: 16px;
    border-bottom: 1px solid #eee;
    .item {
      display: flex;
      align-items: center;
      margin: 16px 0;
      .label {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        flex: 130px 0 0;
      }
      .value {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
      .primary {
        color: #18ba79;
      }
      .danger {
        color: #f75555;
      }
    }
  }
</style>
