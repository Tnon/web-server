<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-07 15:25:10
 * @LastEditTime: 2023-02-15 19:32:56
-->
<template>
  <div>
    <div v-if="hasHeader" class="header">{{ hasHeader }}</div>
    <a-popover
      v-if="proc_fail_reason && Object.keys(proc_fail_reason).length"
      placement="right"
      destroyTooltipOnHide
    >
      <template #content>
        <div class="container">
          <div class="header">{{ t('arcomn.errs') }}</div>
          <template v-for="(item, key) in proc_fail_reason" :key="key">
            <div class="item" v-for="pid in item" :key="pid">
              <div class="labes">PID {{ pid }}:</div>
              <div class="text">{{ key }}</div>
            </div>
          </template>
        </div>
      </template>
      <div class="content" :class="state.class">
        <component :is="state.icon" />
        <span class="title">{{ state.title }}</span>
      </div>
    </a-popover>
    <div class="content" :class="state.class" v-else>
      <component :is="state.icon" />
      <span class="title">{{ state.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect } from 'vue';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    LoadingOutlined,
    WarningOutlined,
    ClockCircleOutlined,
  } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { E_PeopleHandleResult } from '.';
  const props = defineProps({
    result: Number as PropType<E_PeopleHandleResult>,
    proc_fail_reason: {
      type: Object,
    },
    hasHeader: String,
  });
  //文本信息
  const state = reactive<any>({
    title: '',
    icon: undefined,
    class: '',
  });
  const { t } = useI18n();
  watchEffect(() => {
    if (props.result === E_PeopleHandleResult.Injecting) {
      state.title = t('arcomn.jcljz'); //进程拦截中
      state.icon = LoadingOutlined;
      state.class = 'success';
    } else if (props.result === E_PeopleHandleResult.Injected) {
      state.title = t('arcomn.jcylj'); //进程已拦截
      state.icon = CheckCircleFilled;
      state.class = 'success';
    } else if (props.result === E_PeopleHandleResult.InjectError) {
      state.title = t('arcomn.jcljsb'); //进程拦截失败
      state.icon = WarningOutlined;
      state.class = 'error';
    } else if (props.result === E_PeopleHandleResult.InjectPartError) {
      state.title = t('arcomn.jcparer'); //进程部分拦截失败
      state.icon = ExclamationCircleFilled;
      state.class = 'warning';
    } else if (props.result === E_PeopleHandleResult.InjectTimeOut) {
      state.title = t('arcomn.jcljcs'); //进程拦截超时
      state.icon = ClockCircleOutlined;
      state.class = 'error';
    } else {
      state.title = '-'; //进程拦截失败
      state.icon = undefined;
      state.class = '';
    }
  });
</script>

<style scoped lang="less">
  .header {
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    line-height: 16px;
    margin-bottom: 8px;
  }
  .content {
    display: inline-flex;
    align-items: center;
    .title {
      margin-left: 2px;
    }
  }
  .success {
    color: @primary-color;
  }
  .warning {
    color: @warn-color;
  }
  .error {
    color: @danger-color;
  }
  .container {
    .header {
      font-size: @fz12;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
      font-weight: 600;
    }
    .item {
      display: flex;
      align-items: center;
      margin: 8px 0;
      .text {
        margin-left: 16px;
      }
    }
  }
</style>
