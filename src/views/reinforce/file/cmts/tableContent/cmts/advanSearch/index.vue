<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 影响主机 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.impactHost') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value.trim="agus.ip_list"
        />
      </div>
      <!-- 影响主机 end -->

      <!-- 执行进程 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.zxjc') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.prcPlace')"
          v-model:value.trim="agus.process_list"
        />
      </div>
      <!-- 执行进程 end -->

      <!-- 主机组 start -->
      <div class="cols">
        <div class="label">{{ t('operation.hostg') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.group_list" :multiple="true" />
      </div>
      <!-- 主机组 end -->

      <!-- 服务端上报时间 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.repoTime') }}</div>
        <a-range-picker
          style="width: 100%; flex: 1"
          v-model:value="daterange"
          show-time
          @change="ok"
          :format="dateFormat"
        />
      </div>
      <!-- 服务端上报时间 end -->

      <!-- 文件操作 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.wjcaz') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.wjcazPlac')"
          allowClear
          optionFilterProp="label"
          show-search
          mode="multiple"
          :autoClearSearchValue="false"
          v-model:value="file_operationCmp"
          :options="file_operationOptions"
        />
      </div>
      <!-- 处理状态 end -->

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
  import { computed, PropType, reactive, ref } from 'vue';
  import hostGroupSelect from '@/components/host-group-select';
  import { Dayjs } from 'dayjs';
  import { useI18n } from 'vue-i18n';
  import { I_File_Filter } from '../../type';
  import { getFileConfigs } from '@/views/reinforce/file/views/ruleForm/cmts/fileActions';
  //属性
  defineProps({
    params: {
      type: Object as PropType<I_File_Filter>,
      required: true,
    },
  });

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);

  //时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  //文件操作 计算属性
  const file_operationCmp = computed({
    get: () => (agus.op_list ? agus.op_list.split(',').map((ele) => ~~ele) : []),
    set: (val) => {
      agus.op_list = val.join(',');
    },
  });

  //树数据
  const file_operationOptions = getFileConfigs(t);

  //数据仓
  const agus = reactive<Partial<I_File_Filter>>({
    // 影响主机
    ip_list: '',
    //执行进程
    process_list: '',
    //主机分组
    group_list: '',
    //时间范围
    date_range: '',
    //文件操作
    op_list: '',
  });
  //时间范围
  const daterange = ref<Dayjs[]>([]);
  //时间确定按钮
  const ok = (v) => {
    if (v && v.length) {
      const [start, end] = v;
      agus.date_range = start.format(dateFormat) + ',' + end.format(dateFormat);
    } else {
      agus.date_range = '';
    }
  };
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus, {
      ip_list: agus.ip_list!.replace(/\//g, ','),
    });
    for (let k in sendStateObj) {
      flag += sendStateObj[k] ?? '';
    }
    effectFlag.value = !!flag;
    emit('confirm', sendStateObj);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      agus[k] = '';
    }
    daterange.value = [];
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
