<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-07-20 10:42:29
-->
<template>
  <div class="box">
    <div class="header">{{ t('operation.dingqi') }}</div>
    <swt-card
      v-bind="options"
      v-model:isOpen="isOpenPwd"
      @confirm="confirm"
      @switchChange="switchChange"
      class="card"
    >
      <a-input-number
        class="iptNum"
        v-model:value="valueCount"
        :placeholder="t('common.range', ['6-36'])"
        :min="6"
        :max="36"
      />
    </swt-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { swtCard } from '@/views/operation/components/swt-card';
  import { message } from 'ant-design-vue';
  import {
    updateLogStorageApi,
    getLogStorageApi,
    controlLogStorageApi,
  } from '@/api/operation/storage';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  //选项
  const options = {
    title: 'setting.logPerd',
    subtitle: t('setting.logSubt'),
    label: t('setting.stoMon'),
  };
  //是否开启控制
  const isOpenPwd = ref<boolean>(false);
  //默认12个月
  const valueCount = ref<number>(12);
  //确定按钮
  const confirm = async () => {
    // 更新日志存储限制
    if (unref(valueCount)) {
      await updateLogStorageApi({
        expire: unref(valueCount),
      });
    } else {
      message.error(t('setting.pSetLog'));
    }
  };

  // 获取日志存储限制
  const getLogStorage = async () => {
    const { expire } = await getLogStorageApi();
    valueCount.value = expire;
    isOpenPwd.value = !!unref(valueCount);
  };
  getLogStorage();

  // 控制日志存储限制
  const switchChange = async () => {
    valueCount.value = 12;
    await controlLogStorageApi({
      expire: unref(isOpenPwd) ? 12 : 0,
    });
    unref(isOpenPwd) ? message.success(t('setting.enaSuc')) : message.success(t('setting.delSuc'));
  };
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
  .card {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  .iptNum {
    border-radius: 8px;
    margin-left: 8px;
    width: 120px;
    :deep(.ant-input-number-handler-wrap) {
      border-radius: 8px;
    }
  }
</style>
