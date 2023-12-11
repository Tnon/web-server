<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-21 10:17:07
 * @LastEditTime: 2023-10-30 14:34:33
-->
<template>
  <a-form class="taskForm" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <!-- 使用模板 start -->
    <a-form-item :label="t('report.useingTemplate')" v-bind="validateInfos.report_template_id">
      <a-select
        allowClear
        :field-names="{ label: 'title', value: 'id', options: 'options' }"
        :placeholder="t('report.templatePlhder')"
        :options="templateOptions"
        v-model:value="formState.report_template_id"
        @change="changeTemplate"
      />
    </a-form-item>
    <!-- 使用模板 end -->
    <!-- 任务名 start -->
    <a-form-item :label="t('report.taskName')" v-bind="validateInfos.title">
      <a-input
        allowClear
        :placeholder="t('report.taskNamePlhder')"
        v-model:value="formState.title"
      />
    </a-form-item>
    <!-- 任务名 end -->
    <!-- 任务描述 start -->
    <a-form-item :label="t('report.taskDescription')" v-bind="validateInfos.desc_info">
      <a-input
        allowClear
        type="text"
        :placeholder="t('report.taskDescriptionPlhder')"
        v-model:value.trim="formState.desc_info"
      />
    </a-form-item>
    <!-- 任务描述 end -->

    <!-- 统计范围 start -->
    <a-form-item :label="t('report.statisticRange')" v-bind="validateInfos.all_group">
      <a-radio-group v-model:value="formState.all_group" :disabled="isEmailReport">
        <a-radio :value="GROUPTYPE.ALL">{{ t('report.allHost') }}</a-radio>
        <a-radio :value="GROUPTYPE.CUSTOM">{{ t('report.selehog') }}</a-radio>
        <!-- 自定义主机分组 start -->
        <div class="groupCon">
          <hostGroupSelect
            v-show="formState.all_group === GROUPTYPE.CUSTOM"
            v-model:selectedGroupIds="formState.entity_group_list"
            :placeholder="t('common.allPlace')"
            :multiple="true"
          />
        </div>
        <!-- 自定义主机分组 end -->
      </a-radio-group>
    </a-form-item>
    <!-- 统计范围 end -->
    <!-- 统计时间/类型 start -->
    <a-form-item :label="t('report.statisticTime')" v-bind="validateInfos.type">
      <a-radio-group v-model:value="formState.type" :disabled="isEmailReport">
        <a-radio v-for="item in reportTypeOptions" :key="item.label" :value="item.value">
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <!-- 统计时间/类型 end -->
    <!-- 固定时段 统计时间 start -->
    <a-form-item
      v-if="formState.type === REPORTKIND.FIXD"
      v-bind="validateInfos.timeRange"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20, offset: 4 }"
    >
      <a-range-picker
        class="timeSelect"
        show-time
        v-model:value="timeRange"
        :presets="ranges"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </a-form-item>
    <!-- 固定时段 统计时间 end -->
    <!-- 发送邮件开关 start -->
    <a-form-item :label="t('report.yjfs')">
      <a-switch v-model:checked="formState.send_email" @change="changeEmail" />
    </a-form-item>
    <!-- 发送邮件开关 end -->
    <!-- 接收邮件 start -->
    <a-form-item :label="t('report.acceml')" v-bind="validateInfos.accept_email">
      <a-textarea
        :rows="4"
        :placeholder="t('report.accemlplac') + '\na@anxinsec.com\nb@anxinsec.com'"
        v-model:value="accept_email"
      />
    </a-form-item>
    <!-- 接收邮件 end -->
    <!-- 次日发送时间 start -->
    <a-form-item :label="t('report.tmr')" v-bind="validateInfos.send_time">
      <a-time-picker class="tiemPik" v-model:value="formState.send_time" value-format="HH:mm:ss" />
      {{ t('report.sendem') }}
    </a-form-item>
    <!-- 接收邮件 end -->
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch, computed, PropType } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { getTemplateListApi } from '@/api/report';
  import { TaskFormState } from '@/api/report/model';
  import { REPORTKIND, ReportType } from '@/enums/reportType';
  import { getRadioOptions } from './index';
  import { GROUPENUM, GROUPTYPE } from '@/enums/moveGroup';
  import hostGroupSelect from '@/components/host-group-select';
  import { ValidateModuleName, ValidateEmalAll } from '@/utils/reg';
  import { getHostGroups } from '@/api/asset/hostInfo/host';
  // import { timestampToTime } from '@/utils/tools';
  import dayjs from 'dayjs';
  const props = defineProps({
    editFormState: {
      type: Object as PropType<TaskFormState>,
    },
  });
  const { t } = useI18n();
  //报告类型
  const { reportTypeOptions } = getRadioOptions(t);
  // 固定时间范围
  const ranges = ref([
    {
      label: t('report.latestDay'),
      value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
    },
    {
      label: t('report.latestWeek'),
      value: [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')],
    },
    {
      label: t('report.latestMonth'),
      value: [dayjs().subtract(1, 'month'), dayjs().subtract(1, 'day')],
    },
  ]);
  //报告类型是否是email
  // const isEmailReport = ref(false);
  //表单结构体
  const formState = reactive<TaskFormState>({
    title: '', // 任务名称
    desc_info: '', // 描述信息
    report_template_id: undefined, // 模板id
    all_group: GROUPTYPE.ALL, //是否全部分组
    entity_group_list: '', // 业务组id列表
    type: undefined, // 报告类型
    start_time: undefined, // 开始时间
    end_time: undefined, // 结束时间
    send_email: false, //发送邮件
    accept_email: '', //接收邮箱
    send_time: '08:00:00', //发送邮件时间
  });
  const timeRange = computed({
    get: () => {
      return [formState.start_time, formState.end_time];
    },
    set: (v: any) => {
      if (v && v.length) {
        const [start, end] = v;
        formState.start_time = start;
        formState.end_time = end;
      } else {
        formState.start_time = undefined;
        formState.end_time = undefined;
      }
    },
  });

  //编辑时候合并一下
  if (props.editFormState) {
    Object.assign(formState, props.editFormState, {
      entity_group_list: (props.editFormState?.entity_group_list as any).join(','),
    });
  }

  //接收邮件需要计算
  const accept_email = computed({
    get: () => formState.accept_email.split(',').join('\n'),
    set: (v) => {
      formState.accept_email = v.split('\n').join(',');
    },
  });

  //form hook
  const useForm = Form.useForm;

  //表单验证
  const Rules = reactive({
    title: [
      {
        required: true,
        message: t('report.taskNamePlhder'),
      },
      {
        validator: ValidateModuleName,
        message: t('report.templateValida'),
      },
    ],
    desc_info: [
      {
        validator: ValidateModuleName,
        message: t('report.templateValida'),
      },
    ],
    report_template_id: [
      {
        required: true,
        message: t('report.templatePlhder'),
      },
    ],
    type: [
      {
        required: true,
        message: t('report.statisticTimePlhder'),
      },
    ],
    timeRange: [
      { required: formState.type === REPORTKIND.FIXD, message: t('report.startEndTimePlhder') },
    ],
    accept_email: [
      {
        required: formState.send_email,
        message: t('report.pinacemil'),
      },
      {
        validator: ValidateEmalAll,
        message: t('report.inoutcreml'),
      },
    ],
    send_time: [
      {
        required: formState.send_email,
        message: t('report.pinacemitime'),
      },
    ],
  });

  //form hook
  const { validate, validateInfos } = useForm(formState, Rules);
  // 监听统计范围（type）的变化,校验起止时间是否必填
  watch(
    () => formState.type,
    () => {
      formState.start_time = undefined;
      formState.end_time = undefined;
      // 统计范围（type）变化，起止时间是否必填改变
      Rules.timeRange = [
        { required: formState.type === REPORTKIND.FIXD, message: t('report.startEndTimePlhder') },
      ];
      validate('timeRange');
    },
  );
  //模板变化
  const changeTemplate = (v, option) => {
    if (option.category === ReportType.Email) {
      formState.type = REPORTKIND.DAILY;
      formState.all_group = GROUPTYPE.ALL;
      formState.send_email = true;
      changeEmail(true);
    }
  };
  const isEmailReport = computed(() => {
    if (templateOptions.value.length) {
      if (templateOptions.value[0].options) {
        const flag = templateOptions.value[0].options.some(
          (ele) => ele.id === formState.report_template_id,
        );
        return flag;
      } else {
        return false;
      }
    }
    return false;
  });

  // 获取模板列表
  const templateOptions = ref<any>([]);
  const getTemplateList = async () => {
    const { email, word } = await getTemplateListApi({ filter: { title: '' } });
    if (email) {
      templateOptions.value = [
        {
          //邮件格式
          title: t('report.emafmt'),
          options: email,
        },
        {
          //word格式
          title: t('report.word'),
          options: word ?? [],
        },
      ];
    } else {
      templateOptions.value = word ?? [];
    }
  };
  getTemplateList();
  //树的数据（分组）
  const treeData = ref<any>();
  const getTreeData = async () => {
    const { groups } = await getHostGroups(GROUPENUM.ALL);
    treeData.value = groups;
  };
  getTreeData();
  const changeEmail = (v) => {
    Rules.accept_email[0].required = v;
    Rules.send_time[0].required = v;
  };
  defineExpose({
    formState,
    validate,
  });
</script>
<style lang="less" scoped>
  .taskForm {
    :deep(.ant-input-affix-wrapper) {
      border-radius: 8px;
    }
    :deep(textarea.ant-input) {
      border-radius: 8px;
    }
    .tiemPik {
      margin: 0 8px;
      border-radius: 8px;
    }
  }
  .selecTree {
    display: inline-block;
    width: 240px;
  }
  .groupCon {
    display: inline-block;
    width: 300px;
  }
</style>
