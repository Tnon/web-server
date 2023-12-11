<template>
  <a-popover
    v-if="online === ONLINESTATUS.ONLINE"
    placement="leftTop"
    trigger="click"
    overlayClassName="popNoPad"
    destroyTooltipOnHide
    @openChange="popVisibleChange"
    :open="popVisible"
  >
    <template #content>
      <div class="recontainer" v-for="item in logActionData" :key="item.model">
        <div class="shadow" v-if="item.disabled"></div>
        <a-popconfirm placement="leftTop" @confirm="pop_Confirm(item.model, item.url)">
          <template #title> {{ t('operation.cfmColD') }} </template>
          <a-button
            :disabled="item.disabled"
            :class="{
              error: item.status === 'failed',
              disC: item.status === 'applying',
            }"
            class="noradiuBtn"
            type="text"
          >
            <span>
              {{
                item.status === 'apply'
                  ? t('operation.colct')
                  : item.status === 'applying'
                  ? t('operation.colting')
                  : item.status === 'down'
                  ? t('common.download')
                  : t('operation.reCol')
              }}
            </span>
            <span v-if="item.status === 'applying'">{{ item.progress }}</span>
            <span>{{ item.label }}</span>
          </a-button>
        </a-popconfirm>
      </div>
    </template>
    <a-button type="text" class="btn" :disabled="online !== ONLINESTATUS.ONLINE">
      {{ t('operation.sjrz') }}
    </a-button>
  </a-popover>

  <a-tooltip v-else placement="left" destroyTooltipOnHide>
    <template #title>
      <span>
        {{ t('operation.logmsg') }}
      </span>
    </template>
    <a-button type="text" class="btn" disabled>
      {{ t('operation.sjrz') }}
    </a-button>
  </a-tooltip>
</template>

<script lang="ts" setup>
  import { PropType, ref, unref } from 'vue';
  import { collectLogApi, collectLogProcessApi } from '@/api/operation/run';
  import { useI18n } from 'vue-i18n';
  import { ONLINESTATUS } from '@/enums/assetsType';

  const props = defineProps({
    online: {
      type: Number as PropType<ONLINESTATUS>,
    },
    host_id: {
      type: String,
    },
  });
  const { t } = useI18n();

  //pop open
  const popVisible = ref<boolean>(false);
  //初始状态
  const logActionData = ref([
    {
      label: t('operation.sysDumpLog'),
      model: 'sysdump',
      disabled: true,
      progress: '',
      status: 'apply',
      url: '',
    },
    {
      label: t('operation.agtDumpLog'),
      model: 'appdump',
      disabled: false,
      progress: '',
      status: 'apply',
      url: '',
    },
    {
      label: t('operation.sysEveLog'),
      model: 'syslog',
      disabled: false,
      progress: '',
      status: 'apply',
      url: '',
    },
    {
      label: t('operation.agtRunLog'),
      model: 'applog',
      disabled: false,
      progress: '',
      status: 'apply',
      url: '',
    },
  ]);
  //初始化状态
  const initState = () => {
    unref(logActionData).forEach((ele) => {
      ele.disabled = false;
      ele.progress = '0%';
      ele.status = 'apply';
      ele.url = '';
    });
  };
  // 收集/下载/重新收集
  const pop_Confirm = async (model, url) => {
    popVisible.value = false;
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.click();
    } else {
      await collectLogApi({
        host_id: props.host_id!,
        model,
      });
    }
  };
  //获取收集的状态
  const popVisibleChange = async (v) => {
    if (v) {
      //初始化state
      initState();
      //获取状态
      const { progress, status, model, url } = await collectLogProcessApi({
        host_id: props.host_id!,
      });
      // 赋值
      unref(logActionData).forEach((ele) => {
        ele.disabled = status === 'applying';
        if (ele.model === model) {
          ele.status = status;
          ele.progress = status === 'applying' ? progress : '';
          ele.url = status === 'down' ? url : '';
        }
      });
    }
    popVisible.value = v;
  };
</script>

<style lang="less" scoped>
  ::v-deep(.collect) {
    .ant-btn {
      color: '#ff0000';
    }
  }
  .error {
    color: red;
  }
  .disC {
    color: #000;
    &:hover {
      color: #000;
    }
  }
  .noradiuBtn {
    width: 100%;
    text-align: center;
  }
  .recontainer {
    position: relative;
    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      cursor: pointer;
      z-index: 1;
    }
  }
  .btn {
    min-width: 150px;
    justify-content: left;
    height: 40px;
    width: 100%;
  }
</style>
