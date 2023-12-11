<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 文件路径 start -->
      <div class="cols">
        <div class="label">{{ t('ngav.filepat') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.filepapalc')"
          v-model:value.trim="agus.file_path"
        />
      </div>
      <!-- 文件路径 end -->

      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('operation.hostg') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.host_group" :multiple="true" />
      </div>
      <!-- 分组 end -->

      <!-- 影响主机 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.impactHost') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value="agus.ip_list"
        />
      </div>
      <!-- 影响主机 end -->

      <!-- 监控模式 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.jkms') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.jkmsPlac')"
          optionFilterProp="label"
          allowClear
          mode="multiple"
          :autoClearSearchValue="false"
          v-model:value="monitor_modeCmp"
          :options="monitor_modeOptions"
        />
      </div>
      <!-- 监控模式 end -->

      <!--监控状态 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.jkzt') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.jkztPalc')"
          optionFilterProp="label"
          allowClear
          v-model:value="agus.monitor_state"
          :options="monitor_stateOptions"
        />
      </div>
      <!-- 监控状态 end -->

      <!-- 确定和重置 start -->
      <div class="footer">
        <a-button class="confirm" @click="confirm" type="primary">
          {{ t('common.confirm') }}
        </a-button>
        <a-button class="reset" @click="cancle">
          {{ t('common.reset') }}
        </a-button>
      </div>
      <!-- 确定和重置 end -->
    </template>
    <a-button class="filter" type="text">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      {{ t('common.filter') }}
      <span class="flag" v-if="effectFlag"></span>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import hostGroupSelect from '@/components/host-group-select';
  import { getStatusData } from './datasource';
  import { useI18n } from 'vue-i18n';
  import { I_Rule_Monitor_Filter } from '../../type';
  //属性

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);

  const { monitor_modeOptions, monitor_stateOptions } = getStatusData(t);

  //监控模式计算属性
  const monitor_modeCmp = computed({
    get: () => {
      if (agus.monitor_mode) {
        return agus.monitor_mode.split(',').map((ele) => ~~ele);
      }
      return [];
    },
    set: (v) => {
      agus.monitor_mode = v.join(',');
    },
  });
  //数据仓
  const agus = reactive<I_Rule_Monitor_Filter>({
    //文件路径 输入 精确匹配
    file_path: '',
    //主机组 多选
    host_group: '',
    //主机 逗号隔开的ip
    ip_list: '',
    //监控模式，多选 1，2，3
    monitor_mode: '',
    //监控状态 单选 1/2
    monitor_state: undefined,
  });

  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus, {
      ip_list: agus.ip_list!.replace(/\//g, ','),
    });
    for (let k in sendStateObj) {
      if (k === 'monitor_state') {
        if (sendStateObj[k]) {
          flag += sendStateObj[k] + '';
        }
      } else {
        flag += sendStateObj[k] ?? '';
      }
    }
    effectFlag.value = !!flag;
    emit('confirm', sendStateObj);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      if (k === 'monitor_state') {
        agus[k] = undefined;
      } else {
        agus[k] = '';
      }
    }
    effectFlag.value = false;
    emit('confirm', agus);
  };
</script>
<style lang="less" scoped>
  .cols {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .ant-calendar-picker {
      flex: 1;
    }
    .label {
      width: 100px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
    .selecTree {
      flex: 1;
      position: relative;
      border-radius: 8px;
    }
  }
  .filter {
    position: relative;
    margin: 0 8px;
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 2px;
      top: 5px;
      background: #18ba79;
    }
  }
  .footer {
    display: flex;
    margin-top: 24px;
    .confirm {
      flex: 1;
    }
    .reset {
      margin-left: 16px;
    }
  }

  .node {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .loadingContainer {
    padding: 30px 0;
    font-size: @fz20;
    text-align: center;
  }
</style>
