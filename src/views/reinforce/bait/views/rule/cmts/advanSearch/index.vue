<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 启用状态 start -->
      <div class="cols">
        <div class="label">{{ t('user.enaStu') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.enaStuplac')"
          optionFilterProp="label"
          allowClear
          v-model:value="agus.enabled"
          :options="enabledOptions"
        />
      </div>
      <!-- 启用状态 end -->

      <!-- 规则名称 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.rulena') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.rulenaPlac')"
          v-model:value.trim="agus.rule_name"
        />
      </div>
      <!-- 规则名称 end -->

      <!-- 规则类型 start -->
      <div class="cols">
        <div class="label">{{ t('strategy.ruletp') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('arcomn.sleogtut')"
          optionFilterProp="label"
          allowClear
          v-model:value="agus.rule_type"
          :options="rule_typeOptions"
        />
      </div>
      <!-- 规则类型 end -->

      <!-- 文件目录 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.file_dir') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.filepapalcaa')"
          v-model:value.trim="agus.file_path"
        />
      </div>
      <!-- 文件目录 end -->

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
      <!-- 文件操作 end -->

      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('operation.hostg') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.host_group" :multiple="true" />
      </div>
      <!-- 分组 end -->

      <!-- 主机 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.impactHost') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value.trim="agus.ip_list"
        />
      </div>
      <!-- 主机 end -->

      <!-- 告警等级 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.gjdj') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.gjdjplac')"
          optionFilterProp="label"
          allowClear
          v-model:value="agus.alarm_level"
          :options="alarm_levelOptions"
        />
      </div>
      <!-- 告警等级 end -->

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
  import { PropType, computed, reactive, ref } from 'vue';
  import hostGroupSelect from '@/components/host-group-select';
  import { useI18n } from 'vue-i18n';
  import { I_Rule_Filter } from '../../type';
  import { useStaticOptions } from './datasource';
  import { useRoute } from 'vue-router';
  import { getFileConfigs } from '@/views/reinforce/bait/views/ruleForm/cmts/fileActions';
  //属性
  defineProps({
    params: {
      type: Object as PropType<I_Rule_Filter>,
      required: true,
    },
  });

  const { t } = useI18n();
  // 跳转携带参数
  const {
    query: { rule_type },
  } = useRoute() as any;
  //静态选项
  const { enabledOptions, alarm_levelOptions, rule_typeOptions } = useStaticOptions(t);

  //派发事件
  const emit = defineEmits(['confirm']);

  //数据仓
  const agus = reactive<I_Rule_Filter>({
    rule_name: '', // "规则1"
    file_path: '', // "/bin/bash"
    host_group: '', // "2,3,5,7"
    op_list: '',
    ip_list: '', // "ip1,ip2,ip3"
    enabled: undefined, // 1: 启用; 2: 禁用
    alarm_level: undefined, // 1: 低危; 2: 中危; 3: 高危
    rule_type: rule_type ? ~~rule_type : undefined, // 1: 预置; 2: 自定义
  });
  //文件操作 计算属性
  const file_operationCmp = computed({
    get: () => (agus.op_list ? agus.op_list.split(',').map((ele) => ~~ele) : []),
    set: (val) => {
      agus.op_list = val.join(',');
    },
  });

  //树数据
  const file_operationOptions = getFileConfigs(t);
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(rule_type ? true : false);
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
      if (k === 'enabled' || k === 'alarm_level' || k === 'rule_type') {
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
