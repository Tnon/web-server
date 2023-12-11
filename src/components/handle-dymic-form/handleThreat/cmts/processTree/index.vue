<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 10:20:11
 * @LastEditTime: 2023-02-15 19:25:41
-->
<template>
  <div class="treecontainer">
    <a-tree-select
      :multiple="true"
      treeNodeFilterProp="name"
      tree-checkable
      allow-clear
      show-arrow
      :field-names="{ children: 'items', label: 'name', key: 'id', value: 'id' }"
      :tree-data="treeData"
      v-model:value="pidsCmp"
      @dropdownVisibleChange="dropdownVisibleChange"
      :placeholder="t('arcomn.selectpid')"
    >
      <template #suffixIcon>
        <a-popover placement="top">
          <template #content>
            <div class="title">{{ t('arcomn.pidgettime') }}</div>
            <div class="time"> {{ responseTime }}</div>
          </template>
          <redo-outlined
            class="refreshIcon"
            :class="{ notallow: getProgressStatus === 1 }"
            @click="refreshProgress"
          />
        </a-popover>
      </template>
      <!-- 数据为空显示内容 start -->
      <template #notFoundContent>
        <div>
          <template v-if="getProgressStatus === 1">
            <div class="notContent">
              <div class="getcon">
                <img class="sicon smicon" :src="loadingPng" />
                <div class="text">{{ t('arcomn.jchqz') }}...</div>
              </div>
            </div>
          </template>
          <template v-else-if="getProgressStatus === 3">
            <div class="notContent">
              <div class="getcon">
                <CloseCircleFilled class="colorIcona" />
                <div class="text">{{ t('arcomn.jchqsb') }}</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="notContent">
              <div class="getcon">
                <DeleteOutlined class="zanwu" />
                <div class="text">{{ t('arcomn.zanwu') }}</div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <!-- 数据为空显示内容 end -->
    </a-tree-select>
  </div>
</template>

<script setup lang="ts">
  import { getPidProgress } from '@/api/attack_risk';
  import { ref, computed, PropType, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import loadingPng from '@/assets/images/loading.svg';
  import { RedoOutlined, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons-vue';
  import { formatData, formatPids, formatTreePids } from '.';
  import { ProgressIDState } from '../../type';
  const props = defineProps({
    pids: Array as PropType<ProgressIDState[]>,
    record: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  let timer: any = 0;
  //树的数据（分组）
  const treeData = ref<any>();
  //当前进程获取的时间
  const responseTime = ref('');
  //当前进程获取的状态
  const getProgressStatus = ref(1); //1获取中 2获取成功 3获取失败
  const emit = defineEmits(['update:pids']);
  //获取进程的方法
  const getProcessPids = async (is_refresh) => {
    const { process_path_pid_list, code } = await getPidProgress({
      id: props.record.id,
      detail_id: props.record.detail_id,
      dispose_method_list: props.record.dispose_kind_list ?? [1],
      process_path: props.record.process_path ?? '',
      is_refresh,
    });
    if (code) {
      getProgressStatus.value = 3;
      clearInterval(timer);
    } else {
      const { status, list, response_time } = process_path_pid_list;
      treeData.value = formatData(list ?? []);
      getProgressStatus.value = status ?? 1;
      responseTime.value = response_time;
      if (status == 2) {
        clearInterval(timer);
      }
    }
  };
  //刷新进程的安宁
  const refreshProgress = () => {
    if (getProgressStatus.value !== 1) {
      getProcessPids(true);
      timer = setInterval(() => {
        getProcessPids(false);
      }, 1000);
    }
  };
  //下拉框展开
  const dropdownVisibleChange = async (b) => {
    if (b) {
      treeData.value = [];
      getProcessPids(false);
      timer = setInterval(() => {
        getProcessPids(false);
      }, 1000);
    } else {
      clearInterval(timer);
    }
  };
  //选中的pid
  const pidsCmp = computed({
    get: () => {
      return formatPids(props.pids);
    },
    set: (v) => {
      const emitPids = formatTreePids(v);
      emit('update:pids', emitPids);
    },
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>
<style lang="less" scoped>
  .treecontainer {
    display: flex;
    align-items: center;
    .refreshIcon {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.8);
    }
    .notallow {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.3);
    }
  }
  :deep(.getcon) {
    text-align: center;
  }
  :deep(.notContent) {
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    .getcon {
      text-align: center;
      img {
        animation: rotate 5s linear infinite;
        width: 22px;
      }
      .colorIcona {
        color: @danger-color;
        font-size: 22px;
      }
      .zanwu {
        font-size: 24px;
      }
      .text {
        margin-top: 8px;
      }
    }
  }
</style>
