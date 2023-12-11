<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 任务名称 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.rwmc') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.rwmcplac')"
          v-model:value.trim="agus.task_name"
        />
      </div>
      <!-- 任务名称 end -->

      <!-- 任务创建人 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.rwcjs') }}</div>
        <a-select
          class="select"
          style="flex: 1"
          show-search
          optionFilterProp="name"
          allowClear
          v-model:value="agus.create_user"
          :placeholder="t('reinforce.rwcjsplac')"
          :options="czrOptions"
          :fieldNames="{ label: 'name', value: 'id' }"
          @dropdownVisibleChange="getCzrOptions"
        />
      </div>
      <!-- 任务创建人 end -->

      <!-- 任务状态 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.rwzt') }}</div>
        <a-select
          class="select"
          style="flex: 1"
          show-search
          allowClear
          v-model:value="agus.status"
          :placeholder="t('reinforce.rwztplac')"
          :options="task_stateOptions"
        />
      </div>
      <!-- 任务状态 end -->

      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('operation.hostg') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.host_group" :multiple="true" />
      </div>
      <!-- 分组 end -->

      <!-- 主机 start -->
      <div class="cols">
        <div class="label">{{ t('asset.host') }}</div>
        <hostSelect style="flex: 1" v-model:selectedMacs="agus.host_list" />
      </div>
      <!-- 主机 end -->

      <!-- 基线规则 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.rule_count') }}</div>
        <a-select
          class="select"
          style="flex: 1"
          show-search
          allowClear
          optionFilterProp="label"
          mode="multiple"
          :autoClearSearchValue="false"
          v-model:value="rule_codesCmp"
          :placeholder="t('reinforce.rule_countPlac')"
          :options="rule_codesOptions"
          @dropdownVisibleChange="dropdownVisibleChange"
        />
      </div>
      <!-- 基线规则 end -->

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
  import { useI18n } from 'vue-i18n';
  import { I_Task_Filter } from '../../type';
  import { useStaticOptions } from './datasource';
  import hostSelect from '@/components/hostSelect';
  import { useRoute } from 'vue-router';
  import { getRulesList } from '@/api/reinforce';
  import { getCreateUser } from '@/api/strategy/white';
  //属性
  defineProps({
    params: {
      type: Object as PropType<I_Task_Filter>,
      required: true,
    },
  });
  // 跳转携带参数
  const {
    query: { taskName },
  } = useRoute() as any;
  const { t } = useI18n();
  //任务创建人
  const czrOptions = ref([]);
  const getCzrOptions = async (v) => {
    if (v) {
      const { items } = await getCreateUser({});
      czrOptions.value = items;
    }
  };
  // getCzrOptions();

  //静态选项
  const { task_stateOptions } = useStaticOptions(t);
  //树数据
  const rule_codesOptions = ref<any>();

  const dropdownVisibleChange = async (v) => {
    if (v) {
      const { code, items } = await getRulesList({
        filter: {},
        page: {
          page_size: 10,
          page_index: -1,
        },
      });
      if (!code) {
        rule_codesOptions.value = items.map((ele) => ({
          label: ele.name,
          value: ele.rule_code,
        }));
      }
    }
  };
  //派发事件
  const emit = defineEmits(['confirm']);

  //数据仓
  const agus = reactive<Omit<I_Task_Filter, 'task_id'>>({
    //任务名称
    task_name: taskName ?? '',
    //任务创建人
    create_user: undefined,
    //任务状态
    status: undefined,
    //基线规则
    rule_codes: undefined,
    //主机组
    host_group: '',
    //主机
    host_list: [],
  });
  //处理状态 计算属性
  const rule_codesCmp = computed({
    get: () => (agus.rule_codes ? agus.rule_codes.split(',') : []),
    set: (val) => {
      agus.rule_codes = val.join(',');
    },
  });
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(taskName ? true : false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus);
    for (let k in sendStateObj) {
      if (k === 'host_list') {
        flag += sendStateObj[k].length ? sendStateObj[k].length : '';
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
      if (k === 'host_list') {
        agus[k] = [];
      } else if (k === 'create_user' || k === 'status') {
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
