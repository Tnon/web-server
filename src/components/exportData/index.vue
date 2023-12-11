<template>
  <div class="containNotice">
    <a-tooltip placement="left" v-if="status" destroyTooltipOnHide>
      <template #title>
        <span>{{ t('common.export') }}</span>
      </template>
      <span @click="debounceFun" v-if="$slots['default']">
        <slot name="default" :loading="status"></slot>
      </span>
      <!-- <download-outlined v-else class="RIcon" @click="debounceFun" /> -->
      <custom-icon type="#ax-Download" v-else class="RIcon" @click="debounceFun" />
    </a-tooltip>
    <a-tooltip placement="left" v-else destroyTooltipOnHide>
      <template #title>
        <span>{{ t('report.reportGeneration') }}</span>
      </template>

      <span v-if="$slots['default']">
        <slot name="default" :loading="status"></slot>
        <LoadingOutlined v-if="showLoading" class="loadingIcon" />
      </span>
      <LoadingOutlined v-else />
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
  import { createVNode, onUnmounted, ref } from 'vue';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { notification } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { exportMessage } from '@/api/exportApi';
  import { debounce } from 'lodash';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    api: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => {},
      required: true,
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
  });
  const { t } = useI18n();
  // 导出按钮
  const status = ref<boolean>(true);

  // 当前路由
  const router = useRouter();

  let timer: any;

  // 导出函数
  const exportFile = async () => {
    // 点击之后变成生成中的图标
    status.value = false;

    // 3秒之后切换到导出图标
    timer = setTimeout(() => {
      status.value = true;
    }, 3000);

    // 接收传来的函数，自定义一个方法
    const { code } = await exportMessage(props.api, { filter: props.params });
    // notification 弹窗提示
    !code &&
      notification.open({
        message: `${t('report.reportGeneration')}`,
        description: () =>
          createVNode(
            'span',
            {
              onclick: clickToReport,
              style: {
                cursor: 'pointer',
              },
            },
            `${t('report.reportGotoViewDownload')}`,
          ),
        duration: 0,
        style: {
          width: '300px',
          color: '#18BA79',
        },
        top: '50px',
        class: 'reportNotice',
      });
  };

  // 防抖当多次点击导出按钮后，在设定周期结束之后生效
  const debounceFun = debounce(exportFile, 200);

  // 跳转到报告页面
  const clickToReport = () => {
    router.push({ name: 'report-layout-export' });
  };

  // 当前页面销毁的时候清除定时器同时清除notice弹窗
  onUnmounted(() => {
    clearTimeout(timer);
    notification.destroy();
  });
</script>

<style lang="less" scoped>
  .containNotice {
    .RIcon {
      font-size: @fz15;
      color: #000;
      cursor: pointer;
    }
    .loadingIcon {
      margin-left: 8px;
    }
  }
</style>
